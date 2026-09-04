#!/usr/bin/env python3
"""Exact-integer verification for the structural identities in the Recaman preprint.

Usage:
    python verify_recaman_structural.py 1000000

This is a computational audit only; the manuscript's theorems are proved algebraically.
"""
from __future__ import annotations
import sys
from collections import Counter


def verify(N: int) -> None:
    vals = [0] * (N + 1)
    heights = [0] * (N + 1)
    ceilings = [0] * (N + 1)
    quotients = [0] * (N + 1)
    remainders = [0] * (N + 1)
    signs = [0] * (N + 1)

    seen = {0}
    a = 0
    H = 0
    sum_previous_heights = 0

    for n in range(1, N + 1):
        candidate = a - n
        if candidate >= 0 and candidate not in seen:
            a = candidate
            eps = -1
        else:
            a += n
            eps = +1

        H += eps
        c = (sum_previous_heights + n - 1) // n
        q = H - c
        r = n * c - sum_previous_heights

        assert a == n * q + r
        assert 0 <= r < n
        assert a > 0

        vals[n] = a
        heights[n] = H
        ceilings[n] = c
        quotients[n] = q
        remainders[n] = r
        signs[n] = eps

        if n >= 2:
            delta = c - ceilings[n - 1]
            assert delta in (0, 1)
            assert q == quotients[n - 1] + eps - delta
            assert r == remainders[n - 1] - quotients[n - 1] + delta * n
            assert delta == (1 if quotients[n - 1] > remainders[n - 1] else 0)

        seen.add(a)
        sum_previous_heights += H

    for k in range(4, N + 1):
        assert signs[k - 3 : k + 1] != [-1, +1, +1, -1]

    seen = {0}
    last = {0: 0}
    segment_start = 1
    same_segment_q2 = 0
    cross_segment_q2 = Counter()
    first_nonuniversal_q2 = None

    for n in range(1, N):
        if n >= 2 and ceilings[n] != ceilings[n - 1]:
            segment_start = n

        seen.add(vals[n])
        last[vals[n]] = n

        target = vals[n] - (n + 1)
        if target < 0 or target not in seen:
            continue

        j = last[target]
        lag = n - j
        height_change = heights[n] - heights[j]

        if height_change != 1:
            assert lag * (lag - 1) // 2 + 1 >= n

        if quotients[n] == 2:
            if j >= segment_start:
                same_segment_q2 += 1
                assert quotients[j] == 1
                assert height_change == 1
            else:
                cross_segment_q2[height_change] += 1
                if height_change != 1 and first_nonuniversal_q2 is None:
                    first_nonuniversal_q2 = (
                        n,
                        j,
                        target,
                        lag,
                        heights[n],
                        heights[j],
                        ceilings[n],
                        ceilings[j],
                    )

    print(f"verified through n={N:,}")
    print(f"final a_n={vals[N]:,}, H_n={heights[N]}, c_n={ceilings[N]}, q_n={quotients[N]}, r_n={remainders[N]:,}")
    print(f"same-segment blocked q=2 events: {same_segment_q2:,} (all universal)")
    print("cross-segment blocked q=2 events by height change:", dict(sorted(cross_segment_q2.items())))
    print("first non-universal cross-segment q=2 blocker:", first_nonuniversal_q2)


if __name__ == "__main__":
    N = int(sys.argv[1]) if len(sys.argv) > 1 else 1_000_000
    verify(N)
