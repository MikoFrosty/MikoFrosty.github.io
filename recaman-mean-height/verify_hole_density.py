#!/usr/bin/env python3
"""Verify the same-segment q=2 gateway hole-density obstruction.

Downloads Benjamin Chaffin's published list of values below 2^32 that
remain missing after the >10^612 computation and checks the necessary
condition derived in Corollary 9.12 of the accompanying preprint.

For a universal blocker of length ell = 4m - 1, at least m distinct
internal q=0 first occurrences must lie in (g, g+4m].  If the blocker
starts after the computation horizon, all of those values must therefore
belong to the published hole set.
"""
from bisect import bisect_right
from urllib.request import urlopen

G = 852_655
LIMIT = 2**32
URL = "https://benchaffin.com/recaman/rec-holes-2_32.txt"


def parse_ranges(text):
    ranges = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if " - " in line:
            a, b = map(int, line.split(" - "))
        else:
            a = b = int(line)
        ranges.append((a, b))
    return ranges


def expanded_count(ranges):
    return sum(b - a + 1 for a, b in ranges)


def build_counter(ranges):
    starts = [a for a, _ in ranges]
    prefix = [0]
    for a, b in ranges:
        prefix.append(prefix[-1] + b - a + 1)

    def count_le(hi):
        i = bisect_right(starts, hi) - 1
        if i < 0:
            return 0
        a, b = ranges[i]
        before = prefix[i]
        return before + max(0, min(b, hi) - a + 1)

    return count_le


def main():
    text = urlopen(URL).read().decode("utf-8")
    ranges = parse_ranges(text)
    total = expanded_count(ranges)
    count_le = build_counter(ranges)

    assert ranges[0][0] == G

    # It is enough to check m up to the total number of holes other than g.
    # For larger m the required m distinct holes cannot exist anywhere below
    # 2^32, let alone inside (g, g+4m].
    max_explicit_m = total - 1
    worst_margin = None
    worst_m = None

    for m in range(1, max_explicit_m + 1):
        hi = G + 4 * m
        if hi >= LIMIT:
            break
        holes = count_le(hi) - 1  # exclude g itself
        margin = holes - m
        if worst_margin is None or margin > worst_margin:
            worst_margin = margin
            worst_m = m
        if holes >= m:
            raise SystemExit(
                f"Necessary condition survives at m={m}: "
                f"{holes} holes in ({G}, {hi}]"
            )

    max_m_below_limit = (LIMIT - 1 - G) // 4
    if max_m_below_limit > max_explicit_m:
        assert total - 1 < max_explicit_m + 1
        # For every remaining m, even the total number of available holes
        # below 2^32 is < m.
        assert total - 1 < max_explicit_m + 1 <= max_m_below_limit

    first_crossing_m = (LIMIT - G + 3) // 4

    # Even after the interval extends above 2^32, be maximally generous and
    # pretend every integer at or above 2^32 is still missing.  There are only
    # (total - 1) published holes below the limit besides g itself, so a
    # necessary capacity condition is
    #
    #   m <= (total - 1) + max(0, G + 4m - LIMIT + 1).
    #
    # Solving the positive-tail branch gives the stronger global lower bound.
    available_below = total - 1
    numerator = LIMIT - G - 1 - available_below
    capacity_m = (numerator + 2) // 3
    first_possible_m = max(first_crossing_m, capacity_m)
    first_possible_lag = 4 * first_possible_m - 1

    assert available_below + max(0, G + 4 * (first_possible_m - 1) - LIMIT + 1) < first_possible_m - 1
    assert available_below + max(0, G + 4 * first_possible_m - LIMIT + 1) >= first_possible_m

    print(f"Expanded holes below 2^32: {total:,}")
    print(f"Largest margin holes-m in checked range: {worst_margin} at m={worst_m}")
    print("No m with g+4m < 2^32 satisfies holes(g, g+4m] >= m.")
    print("Even treating every integer >= 2^32 as potentially missing,")
    print(f"the capacity inequality forces m >= {first_possible_m:,}.")
    print(f"Therefore ell = 4m-1 >= {first_possible_lag:,}.")


if __name__ == "__main__":
    main()
