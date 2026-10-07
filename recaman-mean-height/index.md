---
layout: default
title: "Mean-Height Coordinates, Divergence, and Collision Locality in Recamán's Sequence"
---

# Mean-Height Coordinates, Divergence, and Collision Locality in Recamán's Sequence

**Brandon Mikowski** — Independent researcher  
**September 4, 2026**  
**Updated October 7, 2026**  
**Preprint — not peer reviewed**

## Abstract

Recamán's sequence remains one of the best-known examples of a simple deterministic recurrence whose global behavior is poorly understood. In 2026 Benjamin Chaffin extended the computation beyond \(10^{612}\) terms, with 852655 still the smallest missing value. This preprint introduces a coordinate system based on the signed step height \(H_n\) and its running mean \(M_n\). It proves that both \(H_n\) and the Recamán values \(a_n\) tend to infinity; expresses the quotient and remainder in \(a_n=nq_n+r_n\) directly in terms of \(H_n\) and \(M_n\); identifies the classical remainder segments with integer crossings of \(M_n\); derives a collision-locality theorem; proves that every same-segment blocker at the critical quotient level \(q=2\) is an index-independent algebraic blocker; and proves that whenever the current least missing value is first attained, its height is never attained again. It further introduces a free-fall landing coordinate \(L_n=r_n-\binom{q_n+1}{2}\), proves its exact transition law, and derives interval-creation and blocker-renewal formulas for the alternating “ping-pong” regimes used in large computations. The results sharply constrain a hypothetical future hit of 852655 but do not resolve the coverage problem.

**Keywords:** Recamán sequence; integer sequences; greedy recurrences; quotient-remainder dynamics; computational number theory.

## Scope, prior work, and verification status

The references below place this note within the existing study of Recamán's sequence, related recurrences, computational behavior, and height-type statistics. This paper does **not** claim to resolve the central coverage problem. Its contribution is a reformulation built from the running mean of the signed step height and the exact quotient-remainder coordinates that follow from it.

To the author's knowledge, after review of the sources cited here, the mean-height coordinate representation, the collision-locality theorem, the same-segment \(q=2\) universality theorem, the terminal-height theorem, and the free-fall/local-renewal formulation have not previously appeared in this form. This is a provisional novelty claim, not a claim of exhaustive literature priority; corrections and prior references are welcome.

**Proof status.** The statements in Sections 2–6 and 9 are presented as deductive results with proofs in the text. Their validity is intended to rest on those proofs, not on finite computation.

**Computational status.** Section 8 reports an exact-integer audit of the first \(10^6\) terms. It is used to check indexing, implementation consistency, and the occurrence of finite patterns. It is not substituted for proof of any theorem.

**Open status.** Section 7 gives conditional restrictions on a hypothetical future hit of 852655. Those restrictions do not prove that 852655 occurs, that it is permanently missing, or that Recamán's sequence is a permutation.

No theorem in this preprint has yet been independently peer reviewed or formally verified in a proof assistant.

## 1. Definition

Let \(a_0=0\). For \(n\ge1\),

\[
a_n=\begin{cases}
a_{n-1}-n,&\text{if }a_{n-1}-n\ge0\text{ and has not appeared before},\\
a_{n-1}+n,&\text{otherwise}.
\end{cases}
\]

Write

\[
a_n-a_{n-1}=n\varepsilon_n,\qquad \varepsilon_n\in\{-1,+1\},
\]

and define

\[
H_0=0,\qquad H_n=\sum_{k=1}^n\varepsilon_k,
\qquad
M_n=\frac1{n+1}\sum_{j=0}^nH_j.
\]

## 2. Height identity and divergence

### Proposition 2.1 — Height identity

For every \(n\ge1\),

\[
\boxed{a_n=nH_n-\sum_{j=0}^{n-1}H_j=n(H_n-M_{n-1}).}
\]

Consequently,

\[
\boxed{M_n-M_{n-1}=\frac{a_n}{n(n+1)}.}
\]

**Proof.** Since \(\varepsilon_k=H_k-H_{k-1}\), summation by parts gives

\[
a_n=\sum_{k=1}^n k\varepsilon_k
=\sum_{k=1}^n k(H_k-H_{k-1})
=nH_n-\sum_{j=0}^{n-1}H_j.
\]

The mean-increment formula follows immediately. ∎

For \(n\ge1\), \(a_n>0\): zero is already occupied, so it cannot be a legal subtraction endpoint, while additions are positive.

### Theorem 2.2 — Mean height and height diverge

\[
\boxed{M_n\to\infty\qquad\text{and}\qquad H_n\to\infty.}
\]

In particular, every fixed height occurs only finitely many times.

**Proof.** The preceding formula makes \(M_n\) strictly increasing. Suppose it were bounded, hence \(M_n\to L\). Since

\[
H_n-M_{n-1}=a_n/n>0,
\]

we have \(H_n>M_{n-1}\). If \(L\notin\mathbb Z\), eventually the integer \(H_n\ge\lceil L\rceil>L\), contradicting convergence of the Cesàro mean to \(L\). If \(L=h\in\mathbb Z\), eventually \(H_n\ge h\); because adjacent heights differ by exactly one, two consecutive heights cannot both equal \(h\). Thus every sufficiently late adjacent pair has average at least \(h+1/2\), again contradicting \(M_n\to h\). Therefore \(M_n\to\infty\), and \(H_n>M_{n-1}\) gives \(H_n\to\infty\). ∎

### Theorem 2.3 — Escape from bounded intervals

\[
\boxed{a_n\to\infty.}
\]

**Proof.** Fix \(B\). If \(n>B\) and \(a_n\le B\), step \(n\) cannot have been an addition because an addition gives \(a_n\ge n>B\). It was therefore a subtraction. Every legal subtraction endpoint is previously unseen, so all terms with \(n>B\) and \(a_n\le B\) are distinct members of the finite set \(\{0,1,\ldots,B\}\). Hence there are only finitely many. ∎

A useful corollary is that if \(a_n=x<n\), then \(x\) is appearing for the first time at index \(n\).

## 3. Mean-height quotient/remainder coordinates

Write the Euclidean division

\[
a_n=nq_n+r_n,\qquad q_n\ge0,\quad0\le r_n<n,
\]

and define

\[
c_n=\lceil M_{n-1}\rceil.
\]

### Theorem 3.1 — Exact coordinate representation

For every \(n\ge1\),

\[
\boxed{q_n=H_n-c_n,}
\]

\[
\boxed{r_n=n(c_n-M_{n-1}),}
\]

and

\[
\boxed{M_n=c_n+\frac{q_n-r_n}{n+1}.}
\]

If \(\delta_n=c_{n+1}-c_n\), then \(\delta_n\in\{0,1\}\) and

\[
\boxed{\delta_n=1\iff q_n>r_n.}
\]

Moreover,

\[
\boxed{q_{n+1}=q_n+\varepsilon_{n+1}-\delta_n,}
\]

\[
\boxed{r_{n+1}=r_n-q_n+(n+1)\delta_n.}
\]

**Proof.** Divide the height identity by \(n\): \(a_n/n=H_n-M_{n-1}\). Taking the integer and fractional parts gives the formulas for \(q_n\) and \(r_n\). Substituting into the definition of \(M_n\) yields the displayed formula for \(M_n\). Since \(a_n\le n(n+1)/2\), \(q_n\le(n+1)/2\), so \(M_n\) lies less than one integer above \(c_n\); hence \(c_n\) can only stay fixed or increase by one. The increase occurs exactly when \(M_n>c_n\), equivalently \(q_n>r_n\). The transition formulas follow directly. ∎

### Corollary 3.2 — Segment dynamics

On every maximal interval where \(c_n\) is constant,

\[
\boxed{q_{n+1}=q_n+\varepsilon_{n+1},\qquad r_{n+1}=r_n-q_n.}
\]

Thus \(q_n\) is a nonnegative nearest-neighbor walk and \(r_n\) is an exact discrete area counter. In particular, the remainder is nonincreasing inside a segment. The wraparounds observed computationally are exactly the integer crossings of the strictly increasing mean \(M_n\).

### Lemma 3.3 — Coarse segment-length bound

If \(s\) is the first index of a mean-height segment and \(N\) is in the same segment, then

\[
\boxed{N\le3s-1.}
\]

**Proof.** Within the segment,

\[
r_N=r_s-\sum_{k=s}^{N-1}q_k\ge0,
\]

while \(r_s<s\). The nonnegative nearest-neighbor walk \(q_k\) cannot have two consecutive zeros, hence

\[
\sum_{k=s}^{N-1}q_k\ge\left\lfloor\frac{N-s}{2}\right\rfloor.
\]

Therefore \(\lfloor(N-s)/2\rfloor<s\), giving the result. ∎

At a wrap, the next remainder also satisfies

\[
\boxed{r_{n+1}\ge\left\lceil\frac{n+1}{2}\right\rceil.}
\]

Indeed, when \(\delta_n=1\),

\[
r_{n+1}=r_n-q_n+n+1\ge n+1-q_n
\ge\left\lceil\frac{n+1}{2}\right\rceil,
\]

using \(r_n\ge0\) and \(q_n\le(n+1)/2\).

## 4. Collision locality

At state \(a_N\), suppose the proposed subtraction \(a_N-(N+1)\) is blocked because it equals an earlier term \(a_j\). Put \(L=N-j\) and \(S=H_N-H_j\).

### Theorem 4.1 — Collision identity and locality

The collision satisfies

\[
\boxed{N(S-1)=1+\sum_{t=0}^{L-1}t\,\varepsilon_{N-t}.}
\]

Consequently, either \(S=1\), or

\[
\boxed{\frac{L(L-1)}2+1\ge N.}
\]

Hence any blocker that is not an index-independent algebraic suffix identity has lag \(L=\Omega(\sqrt N)\).

**Proof.** The collision condition is \(a_N-a_j=N+1\). Reversing the \(L\) intervening steps gives

\[
\sum_{t=0}^{L-1}(N-t)\varepsilon_{N-t}=N+1,
\]

which is the first identity. If \(S\ne1\), then \(|S-1|\ge1\), while the absolute value of the weighted suffix is at most \(L(L-1)/2\), giving the bound. ∎

When \(S=1\), in chronological suffix coordinates \(\sigma_i=\varepsilon_{j+i}\), the collision is independent of the absolute index and is characterized by

\[
\sum_{i=1}^L\sigma_i=1,
\qquad
\sum_{i=1}^Li\sigma_i=L+1.
\]

Call such a sign word a **universal blocker**.

### Corollary 4.2 — Shortest universal blocker

The unique universal blocker of length three is

\[
\boxed{DUU.}
\]

**Proof.** Since \(\sum_i\sigma_i=1\) with each \(\sigma_i\in\{-1,+1\}\), the length \(L\) must be odd. Length one is impossible because the weighted condition would require \(\sigma_1=2\). At length three, the first condition forces exactly two up-steps and one down-step; the weighted condition \(\sum i\sigma_i=4\) places the down-step uniquely in the first position, giving \(DUU\). ∎

Therefore \(DUUD\) cannot occur in Recamán's sign word: after \(DUU\), the next proposed subtraction returns exactly to the value three steps earlier and is blocked.

### Corollary 4.3 — Congruence restriction on universal blocker lengths

Every universal blocker has length

\[
\boxed{L\equiv3\pmod4.}
\]

**Proof.** Let \(D\subseteq\{1,\ldots,L\}\) be the set of down-step positions. From \(\sum_i\sigma_i=1\), the length \(L\) is odd. Also,

\[
L+1
=\sum_{i=1}^L i\sigma_i
=\frac{L(L+1)}2-2\sum_{i\in D}i,
\]

so

\[
\sum_{i\in D}i
=\frac{(L+1)(L-2)}4.
\]

The left side is an integer. For odd \(L\), the right side is integral only when \(L\equiv3\pmod4\). ∎

Thus possible universal-blocker lengths are restricted to \(3,7,11,15,\ldots\). The congruence condition is necessary, not sufficient.

## 5. Same-segment universality at the critical level q=2

At \(q_N=1\), the next subtraction candidate is simply

\[
a_N-(N+1)=r_N-1,
\]

so this is the level at which low holes are tested. At \(q_N=2\), the candidate is

\[
a_N-(N+1)=N+r_N-1,
\]

a high-value collision capable of interrupting an alternating descent.

### Theorem 5.1 — Same-segment q=2 blockers are universal

Let \(s\) be the first index of the current mean-height segment. Suppose \(N\) is in this segment, \(q_N=2\), and

\[
a_N-(N+1)=a_j
\]

for some \(s\le j<N\) in the same segment. Then

\[
\boxed{q_j=1\qquad\text{and}\qquad H_N-H_j=1.}
\]

Thus the intervening suffix is a universal blocker. Any genuinely non-universal blocker of a \(q=2\) subtraction must originate in an earlier mean-height segment.

**Proof.** Inside one segment,

\[
r_N=r_j-\sum_{k=j}^{N-1}q_k.
\]

Let \(Q=\sum_{k=j}^{N-1}q_k\). Since \(q_N=2\), the collision equation gives

\[
Q=N-1-jq_j.
\]

The case \(q_j=0\) is impossible because then \(a_j=r_j<j\), while the target is at least \(N-1\ge j\). If \(q_j\ge2\), nonnegativity and nearest-neighbor motion imply

\[
Q\ge\left\lfloor\frac{N-j}{2}\right\rfloor,
\]

which together with the preceding equation yields \(3j\le N-1\). But the segment-length bound gives \(N\le3s-1\), while \(j\ge s\), so \(3j\ge N+1\), a contradiction. Hence \(q_j=1\). Since \(c_j=c_N\), we get \(H_N-H_j=(c+2)-(c+1)=1\), and the collision-locality identity is the universal case. ∎

The theorem does not remove all global history. Exact computation gives genuine cross-segment blockers. In the million-term audit accompanying this preprint, the first non-universal cross-segment \(q=2\) blocker occurs at \(N=16279\), \(j=4159\):

\[
a_{16279}=34154,\qquad a_{4159}=17874,
\]

and \(34154-16280=17874\). Here \(H_{16279}=H_{4159}=17\), so the height change is zero.

## 6. Least missing values and terminal heights

Let \(V_n=\{a_0,\ldots,a_n\}\) and let \(\operatorname{mex}(V_n)\) denote the least nonnegative integer not in \(V_n\).

### Theorem 6.1 — Terminal-height theorem

Suppose

\[
m=\operatorname{mex}(V_{K-1}),\qquad a_K=m,
\]

and let \(h=H_K\). Then

\[
\boxed{H_n\ne h\quad\text{for every }n>K.}
\]

So the first hit of the current least missing value occurs at the final occurrence of its height.

**Proof.** Before index \(K\), all values \(0,\ldots,m-1\) have occurred, so \(K\ge m\). Thus step \(K+1\) is an addition and \(H_{K+1}=h+1\). Suppose \(T>K\) is the first return to height \(h\). Then \(H_j>h\) for \(K<j<T\). Let \(p_r=H_{K+r}-h\). Summation by parts over this positive excursion gives

\[
a_T-a_K=-\sum_{r=1}^{T-K-1}p_r<0.
\]

Hence \(a_T<m\). The return step is a subtraction, but every nonnegative integer below \(m\) had already appeared before \(K\); a negative destination is also forbidden. Contradiction. ∎

It follows that every value whose first-occurrence index sets a new record is attained at a terminal height. Together with \(H_n\to\infty\), this also proves abstractly that every fixed height has a final occurrence.

## 7. The unresolved value 852655

Benjamin Chaffin's 2026 computation extends beyond \(10^{612}\) terms with

\[
\boxed{852655}
\]

still the smallest missing value. His published low-hole list begins

\[
852655,\quad930058,\quad930557,\quad964420,\ldots
\]

so every integer from 852656 through 930057 had appeared by that cutoff.

Assume hypothetically that \(a_K=852655\) for some \(K>10^{612}\). Since \(K>852655\),

\[
(q_K,r_K)=(0,852655).
\]

The terminal-height theorem implies that, until the next mean crossing, the quotient can never return to zero. In fact the first three steps after a hypothetical hit are forced. Writing only the quotient-remainder state,

\[
\boxed{
(0,m)\longrightarrow(1,m)\longrightarrow(2,m-1)\longrightarrow(3,m-3),
}
\]

where \(m=852655\). The first addition is forced because subtraction from \(m\) at index \(K+1\) would be negative. The second is forced because the next subtraction candidate is \(m-1\), already occupied. The third is forced because the proposed subtraction from the \(q=2\) state returns to \(a_{K-1}\); equivalently, the local sign suffix is the universal blocker \(DUU\).

Starting from \(q=3\), any positive nearest-neighbor quotient path that avoids zero has, over \(s\) further source states, total quotient at least

\[
\left\lfloor\frac{3s}{2}\right\rfloor+2,
\]

attained by the slow descent \(3,2,1,2,1,2,\ldots\). If \(s=568434\) transitions occurred without a mean crossing, the remainder would therefore have fallen by at least

\[
\left\lfloor\frac{3(568434)}2\right\rfloor+2=852653,
\]

which is larger than the available remainder \(m-3=852652\). Hence the next mean-height segment must begin no later than

\[
\boxed{K+568437.}
\]

So a future hit would occur in a substantially narrower terminal window than the coarse one-step remainder bound gives.

There is also a corridor extending **77,403 units above the hole**. If \(q=1\) and

\[
852657\le r\le930058,
\]

then the attempted subtraction target \(r-1\) lies in the already occupied interval \([852656,930057]\), so the walk is reflected upward. The exceptional state

\[
\boxed{(q,r)=(1,852656)}
\]

would subtract directly to 852655.

If a trajectory inside this corridor is eventually to reach \((0,852655)\) without a mean crossing, even a monotone descent from quotient \(q\) consumes at least the triangular area \(q(q+1)/2\). Therefore

\[
\frac{q(q+1)}2\le930058-852655=77403,
\]

and hence

\[
\boxed{q\le392.}
\]

Thus the final low corridor is finite-width in both coordinates. The same-segment \(q=2\) obstruction is algebraically classified by Theorem 5.1; the unresolved mechanism is the family of genuinely cross-segment blockers.

These restrictions **do not prove** that 852655 occurs or that it is permanently missing.

## 8. Computational audit

The theorems in Sections 2–6 do not use this computation as a premise. An exact-integer implementation was used only to stress-test indexing, verify that the coordinate formulas agree with the generated recurrence on a large finite range, and investigate conjectural strengthenings. An exhaustive audit through the first \(10^6\) terms found:

| Audit item | Result |
|---|---:|
| Coordinate/transition identity violations | 0 |
| Occurrences of forbidden DUUD | 0 |
| Same-segment blocked q=2 events | 87,469 |
| Same-segment q=2 events failing universality | 0 |
| Cross-segment blocked q=2 events with height change 1 | 7,604 |
| Cross-segment blocked q=2 events with height change 0 | 129 |
| First non-universal cross-segment q=2 event | N=16279, j=4159 |

The audit is a finite reproducibility and implementation check, not evidence substituted for proof. In particular, a zero count in a finite audit does not establish a universal statement; universal claims above rely on their deductive arguments.

## 9. Free-fall landing coordinate and local renewal

The quotient-remainder coordinates admit a second quantity that is useful for studying low-value landings. Define

\[
\boxed{
L_n=r_n-\binom{q_n+1}{2}.
}
\]

If, starting from \(a_n=nq_n+r_n\), the next \(q_n\) steps were all subtractions, then their total size would be

\[
(n+1)+(n+2)+\cdots+(n+q_n)
=q_n n+\binom{q_n+1}{2},
\]

so the resulting value would be exactly \(L_n\). For this reason call \(L_n\) the **free-fall landing coordinate**.

### Theorem 9.1 — Exact transition law for the free-fall coordinate

If there is no mean-height crossing at step \(n\), then

\[
\boxed{
L_{n+1}=
\begin{cases}
L_n,&\varepsilon_{n+1}=-1,\\
L_n-(2q_n+1),&\varepsilon_{n+1}=+1.
\end{cases}}
\]

Thus within a mean-height segment, \(L_n\) is nonincreasing: legal subtractions leave it unchanged and additions decrease it by an explicit odd amount.

At a mean-height crossing \((\delta_n=1)\), the exact jump is

\[
\boxed{
L_{n+1}=
\begin{cases}
L_n+n+q_n,&\varepsilon_{n+1}=-1,\\
L_n+n+1-q_n,&\varepsilon_{n+1}=+1.
\end{cases}}
\]

**Proof.** Substitute the transition formulas of Theorem 3.1 into
\(L_{n+1}=r_{n+1}-\binom{q_{n+1}+1}{2}\). If \(\delta_n=0\), then a subtraction has \(q_{n+1}=q_n-1\) and \(r_{n+1}=r_n-q_n\), while an addition has \(q_{n+1}=q_n+1\) and the same remainder update. The two displayed formulas follow by cancellation of consecutive triangular numbers. If \(\delta_n=1\), use
\(r_{n+1}=r_n-q_n+n+1\) and
\(q_{n+1}=q_n+\varepsilon_{n+1}-1\), giving the two crossing formulas. ∎

For a fixed target \(g\), put \(\lambda_n=L_n-g\). At a \(q=0\) state, \(a_n=L_n\); at a \(q=1\) state, the proposed subtraction endpoint is also \(L_n\). In particular, once \(L_n<g\) inside a mean-height segment, no later term in that segment can equal \(g\), because any later occurrence of the fixed value \(g<n\) would require \(q=0\), while \(L\) cannot increase before the next mean crossing.

### Theorem 9.2 — Ping-pong interval creation and blocker-spine renewal

Fix one mean-height segment. Suppose that at index \(n_0\),

\[
q_{n_0}=p,\qquad a_{n_0}=A,
\]

and that the next \(2t\) steps form \(t\) complete alternating cycles

\[
UDUD\cdots UD,
\]

so the quotient alternates \(p,p+1,p,p+1,\ldots,p\) without a mean crossing. Then for \(0\le k\le t\),

\[
\boxed{a_{n_0+2k}=A-k,}
\]

and for \(0\le k<t\),

\[
\boxed{a_{n_0+2k+1}=A+n_0+k+1.}
\]

Hence the block visits the two contiguous intervals

\[
\boxed{[A-t,A]}
\qquad\text{and}\qquad
\boxed{[A+n_0+1,A+n_0+t]}.
\]

Moreover, the proposed subtraction endpoints at the lower \(q=p\) states are

\[
\boxed{
B_k=A-n_0-1-3k
\qquad(0\le k<t),
}
\]

so the blocker probes move with universal stride \(-3\), independently of \(p\). Because each of the first \(t\) lower steps is an addition, every \(B_k\) in this range is already occupied (or, if negative, subtraction is forbidden).

At the next lower state, let

\[
B_t=A-n_0-1-3t.
\]

If \(B_t\ge0\) is unoccupied, the next step is a legal subtraction and lands exactly on \(B_t\), extending the stride-three blocker spine by one newly visited point.

If instead \(B_t\) is occupied, the next step is an addition. If the following downward candidate \(A-t-1\) is also occupied, a second addition is forced; provided no mean crossing intervenes, the next subtraction candidate is then exactly \(A+n_0+t\), the top of the upper interval already created by the block, so a third addition is forced. Thus the alternative exit carries the quotient upward by three levels.

**Proof.** One \(UD\) cycle starting from index \(n\) and value \(x\) gives

\[
x\xrightarrow{U}x+n+1
\xrightarrow{D}x-1.
\]

Iteration yields the two value formulas. At lower state \(n_0+2k\), subtraction would land at

\[
(A-k)-(n_0+2k+1)
=A-n_0-1-3k,
\]

giving the blocker spine. The two exit claims follow by applying the recurrence to the next candidate. In the carry-up case, after the first two additions the next downward candidate simplifies to \(A+n_0+t\), which was visited at the last upper state of the completed ping-pong block. ∎

### Corollary 9.3 — Exact landing-potential loss in a ping-pong block

Under the hypotheses of Theorem 9.2,

\[
\boxed{L_{n_0+2t}=L_{n_0}-t(2p+1).}
\]

Consequently, for any fixed interval \(G=[g,g+w]\), if

\[
L_{n_0}-t(2p+1)<g,
\]

then after the completed block no later term in the same mean-height segment can enter \(G\).

**Proof.** Each cycle contains one addition from quotient \(p\), which lowers \(L\) by \(2p+1\), and one subtraction, which leaves \(L\) unchanged. The clearance statement follows from Theorem 9.1. ∎

Theorems 9.1–9.2 give an exact local mechanism by which long alternating runs both consume landing potential and manufacture new occupied intervals and blocker spines.

### Theorem 9.4 — Fixed-height transport potential

For any fixed integer \(h\), define

\[
x_n^{(h)}=H_n-h
\]

and

\[
\boxed{
\Phi_h(n)
=
a_n-nx_n^{(h)}
-\frac{x_n^{(h)}(x_n^{(h)}+1)}2.
}
\]

Then this potential is valid across the entire sequence, without resetting at a mean-height crossing, and obeys

\[
\boxed{
\Phi_h(n+1)=
\begin{cases}
\Phi_h(n),&\varepsilon_{n+1}=-1,\\
\Phi_h(n)-\bigl(2x_n^{(h)}+1\bigr),&\varepsilon_{n+1}=+1.
\end{cases}}
\]

For adjacent baselines,

\[
\boxed{
\Phi_{h+1}(n)=\Phi_h(n)+n+x_n^{(h)}.
}
\]

When \(c_n=h\), one has \(x_n^{(h)}=q_n\) and

\[
\boxed{\Phi_h(n)=L_n.}
\]

Thus the large jump in \(L_n\) at a mean-height crossing is not a discontinuity of the underlying fixed-height dynamics; it is the exact change of coordinates obtained by replacing baseline \(h\) with \(h+1\).

**Proof.** Put \(x=x_n^{(h)}\). Since

\[
a_{n+1}=a_n+(n+1)\varepsilon_{n+1},
\qquad
x_{n+1}^{(h)}=x+\varepsilon_{n+1},
\]

the quantity \(a_{n+1}-(n+1)x_{n+1}^{(h)}\) equals
\(a_n-(n+1)x\), independently of the sign. If the step is down, the triangular correction changes from \(x(x+1)/2\) to \(x(x-1)/2\), exactly cancelling the additional \(-x\). If the step is up, the same calculation leaves the decrement \(2x+1\). The baseline-shift identity follows by replacing \(x\) with \(x-1\). Finally, when \(c_n=h\), \(x=H_n-c_n=q_n\) and \(a_n-nq_n=r_n\), so \(\Phi_h(n)=r_n-q_n(q_n+1)/2=L_n\). ∎

### Theorem 9.5 — One-shot threshold reduction inside a mean-height segment

Fix a target integer \(g\ge0\) and a mean-height segment on which \(c_n=h\). Assume the indices under consideration exceed \(g\). Because \(L_n\) is nonincreasing inside the segment, there is at most one first index \(t\) at which

\[
L_t\le g.
\]

Before that index, the segment cannot contain \(g\). If

\[
L_t<g,
\]

then the remainder of the segment cannot contain \(g\) either.

If instead

\[
L_t=g
\]

and \(q_t=Q\), then exactly one of the following occurs:

1. the next \(Q\) steps are all legal subtractions, in which case
   \[
   a_{t+Q}=g;
   \]
2. one of those proposed subtractions is blocked, forcing an addition; that addition lowers \(L\) strictly below \(g\), after which \(g\) is impossible for the remainder of the segment.

Thus one entire mean-height segment has at most one genuine opportunity to hit a fixed late target \(g\), and that opportunity is a finite downward staircase.

**Proof.** For \(n>g\), an occurrence \(a_n=g\) must have \(q_n=0\), hence \(a_n=L_n\). Therefore no state with \(L_n>g\) can equal \(g\), and Theorem 9.1 shows that once \(L_n<g\), it cannot return to \(g\) before the segment ends.

Now suppose \(L_t=g\). A subtraction preserves \(L\), while an addition from quotient \(q\) lowers it by \(2q+1>0\). Hence as long as \(L\) remains equal to \(g\), every step must be a subtraction and \(q\) falls by one each time. Also, while \(L=g\),

\[
r=g+\frac{q(q+1)}2\ge q,
\]

so the mean-crossing condition \(q>r\) cannot occur. Therefore \(Q\) uninterrupted subtractions reach \(q=0\) and value \(g\). Any earlier blocked subtraction forces an addition and hence moves \(L\) below \(g\), permanently clearing the target for that segment. ∎

### Theorem 9.6 — Exact dangerous staircase and finite entrance certificate

Under the dangerous case of Theorem 9.5, suppose \(L_t=g\) and \(q_t=Q\). If the free fall succeeds, write

\[
K=t+Q.
\]

Then the complete terminal staircase is

\[
\boxed{
a_{K-j}
=
jK+g-\binom j2
\qquad(0\le j\le Q).
}
\]

In particular, every value with \(0\le j<Q\) must be previously unvisited at the moment it is reached.

Define, at the entrance time \(t\), the moving history profile

\[
\boxed{
P_\ell(t)
=
\{a_i-\ell t-g:0\le i\le t\}.
}
\]

For \(2\le j\le Q\), define the fixed certificate coordinate

\[
\boxed{
\gamma_{Q,j}
=
\frac{(j-1)(2Q-j+2)}2.
}
\]

Then, assuming \(g\) itself is still unvisited at time \(t\),

\[
\boxed{
\text{the staircase hits }g
\iff
\gamma_{Q,j}\notin P_{j-1}(t)
\text{ for every }2\le j\le Q.
}
\]

Equivalently, occupation of **any one** of these finitely many coordinates certifies protection at that entrance.

The profile has the exact global update law

\[
\boxed{
P_\ell(n+1)
=
\bigl(P_\ell(n)-\ell\bigr)
\cup
\{a_{n+1}-\ell(n+1)-g\}.
}
\]

Therefore every previously occupied interval in level \(\ell\) drifts rigidly left by \(\ell\) per time step, while newly visited values are inserted explicitly. This transport law is valid through mean-height crossings.

**Proof.** If \(q=j\), \(L=g\), and the eventual hit occurs at \(K\), then the state lies at index \(K-j\), with

\[
r=g+\frac{j(j+1)}2.
\]

Hence

\[
a_{K-j}
=
(K-j)j+g+\frac{j(j+1)}2
=
jK+g-\binom j2.
\]

At the state with quotient \(j\), the proposed subtraction endpoint is the next staircase value with quotient \(j-1\). Transporting an old occupied value from entrance time \(t=K-Q\) forward by \(Q-j\) steps at profile level \(j-1\) shifts its coordinate by \(-(j-1)(Q-j)\). The coordinate that would block the descent is therefore

\[
\frac{(j-1)(j+2)}2+(j-1)(Q-j)
=
\frac{(j-1)(2Q-j+2)}2
=
\gamma_{Q,j}.
\]

The staircase values are strictly ordered because

\[
a_{K-j}-a_{K-(j-1)}=K-j+1>0,
\]

so values newly inserted earlier in the same descent cannot equal a later subtraction target. Thus the listed entrance coordinates are necessary and sufficient for an old-history collision before the final step to \(g\). The profile update formula is immediate from its definition: every old value is re-centered from \(\ell n\) to \(\ell(n+1)\), and the new term is then inserted. ∎

### Corollary 9.7 — Triangular certificate ladder

Let

\[
T_s=\frac{s(s+1)}2.
\]

The entrance certificate coordinates of Theorem 9.6 satisfy

\[
\boxed{
\gamma_{Q,j}=T_Q-T_{Q-j+1}.
}
\]

Equivalently, writing \(s=Q-j+1\), the required certificate at profile level \(Q-s\) is the triangular deficit

\[
\boxed{
T_Q-T_s,
\qquad 1\le s\le Q-1.
}
\]

Thus the full protection test at an exact threshold is a finite **triangular ladder** of history sites below the common anchor \(T_Q\).

The ladder is exactly self-similar under a legal subtraction:

\[
\boxed{
\gamma_{Q,j}-(j-1)=\gamma_{Q-1,j}.
}
\]

Hence, after one legal downward step from quotient \(Q\) to quotient \(Q-1\), the remaining certificate problem is literally the same ladder problem with \(Q\) replaced by \(Q-1\).

**Proof.** Substituting \(s=Q-j+1\) into the formula of Theorem 9.6 gives

\[
T_Q-T_s
=
\frac{Q(Q+1)-(Q-j+1)(Q-j+2)}2
=
\frac{(j-1)(2Q-j+2)}2.
\]

The transport identity follows immediately:

\[
\gamma_{Q,j}-(j-1)
=
\frac{(j-1)(2Q-j)}2
=
\gamma_{Q-1,j}.
\]

∎

### Corollary 9.8 — The local threshold deficit

Suppose an exact threshold \((Q,L=g)\) is created by an addition from quotient \(Q-1\) during a \((Q-1)/Q\) ping-pong block, and suppose that addition is forced by an occupied subtraction candidate.

Immediately before the threshold addition,

\[
L-g=2Q-1.
\]

Writing \(d=r-g\), this gives

\[
d=T_{Q-1}+2Q-1.
\]

After the addition, the fresh interval manufactured at profile level \(Q-1\) begins at

\[
\boxed{
T_Q=\gamma_{Q,Q}+1.
}
\]

Meanwhile the occupied blocker that forced the threshold addition appears at profile level \(Q-2\) at the same coordinate

\[
\boxed{
T_Q=\gamma_{Q,Q-1}+3
}
\]

when \(Q\ge3\).

Therefore the ping-pong block that creates the exact threshold does **not** automatically certify safety. Its newly created structures sit immediately above the first required ladder sites: one unit above the top certificate and one stride-three step above the next certificate. Any protection at the threshold must therefore come from older history, from an interval that extends the fresh structure downward, or from a deeper ladder level.

**Proof.** At the lower \(q=Q-1\) state before the threshold addition,

\[
L-g=d-T_{Q-1}=2Q-1,
\]

hence \(d=T_{Q-1}+2Q-1\). The lower interval in \(P_{Q-1}\) produced by the completed ping-pong cycles has lower endpoint \(d\) at that time. Advancing one step to the threshold shifts level \(Q-1\) left by \(Q-1\), so its lower endpoint becomes

\[
d-(Q-1)
=
T_{Q-1}+Q
=
T_Q.
\]

Since \(\gamma_{Q,Q}=T_Q-T_1=T_Q-1\), the first identity follows.

The subtraction candidate that forces the threshold addition has coordinate \(d-1\) in level \(Q-2\) before the addition. After the one-step shift it has coordinate

\[
d-1-(Q-2)
=
T_Q.
\]

Since \(\gamma_{Q,Q-1}=T_Q-T_2=T_Q-3\), the second identity follows. ∎

### Theorem 9.9 — The \(q=2\) gateway for a previously flanked hole

Fix \(g\), and suppose both that \(g\) is still missing and that \(g+1\) has already occurred. For sufficiently late indices (in particular, for any prospective hit index \(K>g+4\)), a future hit of \(g\) is equivalent to the existence of a state \(n\) with

\[
\boxed{q_n=2,\qquad L_n=g}
\]

whose next subtraction is legal.

Indeed, every such unblocked gateway hits \(g\) exactly two steps later.

**Proof.** First suppose \(q_n=2\), \(L_n=g\), and the subtraction at step \(n+1\) is legal. Then \(r_n=g+3\), so

\[
a_n=2n+g+3.
\]

After subtraction,

\[
a_{n+1}=n+g+2=(n+1)+(g+1),
\]

hence \(q_{n+1}=1\), \(r_{n+1}=g+1\), and \(L_{n+1}=g\). Since \(g\) is still missing, the next subtraction is legal and gives \(a_{n+2}=g\).

Conversely, suppose \(a_K=g\) is a future first hit after \(g+1\) has already occurred. Since \(K>g\), the hit is by subtraction, so

\[
a_{K-1}=K+g=(K-1)+(g+1),
\]

and therefore \(q_{K-1}=1\), \(L_{K-1}=g\). The step into this state cannot have been an addition: that would force \(a_{K-2}=g+1\), but any term less than its index can only arise as a legal subtraction endpoint and hence must be new, contradicting the earlier occurrence of \(g+1\). Thus step \(K-1\) was a subtraction. Reversing it gives

\[
a_{K-2}=2K+g-1=2(K-2)+(g+3),
\]

so \(q_{K-2}=2\), \(r_{K-2}=g+3\), and \(L_{K-2}=g\). That subtraction was legal, giving the required unblocked gateway. ∎

For \(g=852655\), the value \(g+1=852656\) is already among the values certified occupied by Chaffin's computation. Thus every hypothetical future hit of 852655 must pass through this single \(q=2\) gate.

### Theorem 9.10 — How old a \(q=2\) gateway blocker must be

Assume \(g\) is missing and that the full interval

\[
[g+1,g+W]
\]

was already occupied before a \(q=2\), \(L=g\) gateway state at index \(N\). Suppose the proposed subtraction is blocked by an earlier term \(a_j\), and put \(\ell=N-j\).

If \(j\) lies in the same mean-height segment as \(N\), then the blocker is universal by Theorem 5.1, and

\[
\boxed{\ell\ge W.}
\]

Combined with Corollary 4.3, its lag must in fact be the least integer at least \(W\) that is congruent to \(3\pmod4\).

If \(j\) lies in an earlier mean-height segment, then either

\[
\boxed{
\frac{\ell(\ell-1)}2+1\ge N,
}
\]

or

\[
\boxed{
\ell\ge\frac{N-g-2}{2}.
}
\]

**Proof.** At the gateway,

\[
a_N=2N+g+3,
\]

so the blocked subtraction target is

\[
a_j=N+g+2.
\]

In the same-segment case, Theorem 5.1 gives \(q_j=1\). Hence

\[
r_j=a_j-j=g+\ell+2
\]

and therefore

\[
L_j=r_j-1=g+\ell+1.
\]

The universal blocker runs from quotient one at \(j\) to quotient two at \(N\). Let \(\sigma_1,\ldots,\sigma_\ell\) be its sign word and let

\[
q_k=1+\sum_{i=1}^k\sigma_i
\qquad(0\le k\le\ell).
\]

The universal-blocker identities imply

\[
\sum_{k=1}^{\ell-1}q_k=\ell-2.
\]

Since the quotient is nonnegative inside one segment, some internal \(q_k\) must equal zero; otherwise the sum would be at least \(\ell-1\). At that internal \(q=0\) state, the actual Recamán value equals its landing coordinate. The landing coordinate is nonincreasing from \(g+\ell+1\) to \(g\), and it cannot equal \(g\) because \(g\) is still missing. Thus this internal \(q=0\) state visits some integer in

\[
[g+1,g+\ell+1].
\]

Such a late \(q=0\) value must be a first occurrence. If \(\ell<W\), the entire displayed interval is contained in the already occupied corridor \([g+1,g+W]\), a contradiction. Hence \(\ell\ge W\). Corollary 4.3 supplies the congruence restriction.

Now suppose the blocker is cross-segment and put \(S=H_N-H_j\). If \(S\ne1\), Theorem 4.1 gives the first displayed lower bound. If \(S=1\), then because \(j\) is in an earlier segment, \(c_j<c_N\). Since \(q_N=2\),

\[
1=S=(c_N+2)-(c_j+q_j),
\]

so \(q_j=c_N-c_j+1\ge2\). Therefore

\[
N+g+2=a_j\ge2j=2(N-\ell),
\]

which rearranges to the second lower bound. ∎

For the known corridor above 852655,

\[
W=930057-852655=77402.
\]

Hence the elementary corridor argument already forces any same-segment future blocker of the \(q=2\) gateway to have universal-blocker lag at least

\[
\boxed{77403}.
\]

The following count strengthens this substantially when the whole blocker lies after a computation horizon whose remaining holes are known.

### Theorem 9.11 — A same-segment universal blocker forces many new landings

Suppose a same-segment \(q=2\) gateway blocker has lag

\[
\ell=4m-1.
\]

Then its sign word contains at least \(m\) internal up-steps whose source quotient is \(q=0\). The corresponding \(q=0\) states are distinct first occurrences, and their values all lie in

\[
\boxed{(g,\,g+4m].}
\]

**Proof.** By Corollary 4.3, \(\ell=4m-1\). A universal blocker has sign sum one, hence it contains

\[
U=\frac{\ell+1}{2}=2m
\]

up-steps. At the earlier blocker state, Theorem 5.1 gives \(q=1\), and from Theorem 9.10 the landing coordinate is

\[
L_{\rm start}=g+\ell+1=g+4m.
\]

At the gateway, \(L_{\rm end}=g\). Inside one mean-height segment, only up-steps change \(L\), and an up-step from source quotient \(q\) lowers it by \(2q+1\). Therefore

\[
4m
=
\sum_{U\text{-steps}}(2q+1)
=
2\sum_{U\text{-steps}}q+2m,
\]

so

\[
\boxed{\sum_{U\text{-steps}}q=m.}
\]

Let \(z\) be the number of these \(2m\) up-steps whose source quotient is zero. Every other source quotient is at least one, so

\[
m
=
\sum q
\ge
2m-z,
\]

and therefore

\[
\boxed{z\ge m.}
\]

At a \(q=0\) state one has \(a=L<n\), so the value is necessarily appearing for the first time. The landing coordinate is nonincreasing from \(g+4m\) to \(g\), while \(g\) itself is still missing, hence all these distinct first occurrences lie in \((g,g+4m]\). ∎

### Corollary 9.12 — Hole-density obstruction after Chaffin's horizon

Let \(H\) denote the horizon of Chaffin's computation beyond \(10^{612}\), and suppose a same-segment gateway blocker begins after \(H\). If its lag is \(4m-1\), then at least \(m\) of the values still missing at horizon \(H\) must lie in

\[
(g,g+4m].
\]

For \(g=852655\), an exhaustive check of Chaffin's published list of all holes below \(2^{32}\) finds **no** positive integer \(m\) with

\[
g+4m<2^{32}
\]

for which the interval \((g,g+4m]\) contains at least \(m\) published holes. Consequently any such post-horizon same-segment blocker must satisfy

\[
g+4m\ge2^{32},
\]

hence

\[
\boxed{m\ge1,073,528,661}
\]

and

\[
\boxed{\ell=4m-1\ge4,294,114,643.}
\]

The data check is finite rather than deductive; a short verifier is included at [verify_hole_density.py](verify_hole_density.py). It downloads Chaffin's published hole file, expands the listed ranges logically, and checks the necessary inequality above.

A genuinely cross-segment blocker remains the main unresolved alternative. The next theorem sharpens its shorter-lag branch.

### Theorem 9.13 — Fixed-height lower bound for a cross-segment gateway blocker

Let a \(q=2,L=g\) gateway at index \(N\) be blocked by \(a_j=N+g+2\) from an earlier mean-height segment, and put \(\ell=N-j\). If

\[
\ell<\frac{N-g-2}{2},
\]

then \(q_j=1\). Put

\[
d=c_N-c_j\ge1.
\]

Then

\[
\boxed{
\ell
\ge
\sqrt{,4Nd+2d^2+6d+2,}-d-1.
}
\]

In particular,

\[
\boxed{
\ell\ge\sqrt{4N+10}-2.
}
\]

**Proof.** If \(q_j\ge2\), then

\[
N+g+2=a_j\ge2j=2(N-\ell),
\]

which is exactly the excluded half-index inequality. Hence \(q_j=1\).

Use the fixed-height potential of Theorem 9.4 with baseline \(h=c_j\). At \(j\), its height coordinate is \(x_j=1\), and

\[
\Phi_h(j)
=
a_j-j-T_1
=
g+\ell+1.
\]

At the gateway, \(x_N=d+2\), so

\[
\Phi_h(N)
=
2N+g+3-N(d+2)-T_{d+2}
=
g+3-Nd-T_{d+2}.
\]

Thus the required potential drop is

\[
D
=
Nd+\ell-2+T_{d+2}.
\]

The fixed-height coordinate changes by \(\pm1\) at every step. Since it rises from \(1\) to \(d+2\) in \(\ell\) steps, the number of up-steps is

\[
U=\frac{\ell+d+1}{2}.
\]

The \(k\)-th up-step can start at height at most \(k\): before it there have been only \(k-1\) earlier up-steps. Therefore Theorem 9.4 gives the upper bound

\[
D
\le
\sum_{k=1}^{U}(2k+1)
=
U(U+2).
\]

Substitution and simplification yield

\[
(\ell+d+1)^2
\ge
4Nd+2d^2+6d+2,
\]

which proves the first bound.

For fixed \(N\), the right-hand expression after solving for \(\ell\),

\[
f(d)=\sqrt{4Nd+2d^2+6d+2}-d-1,
\]

is increasing for \(d>0\), because

\[
(2N+2d+3)^2-(4Nd+2d^2+6d+2)>0.
\]

Hence its minimum for integer \(d\ge1\) occurs at \(d=1\), giving \(\ell\ge\sqrt{4N+10}-2\). ∎

For every prospective gateway far beyond Chaffin's \(10^{612}\) horizon, the half-index alternative of Theorem 9.10 is much larger than this bound. Thus every cross-segment blocker there must reach back at least approximately

\[
\boxed{2\times10^{306}}
\]

indices.

### Consequence for the renewal problem

The global obstruction can now be stated in two equivalent ways.

At an arbitrary exact threshold \((Q,L=g)\), protection is a finite triangular-ladder certificate. But once \(g+1\) is known to have occurred, every actual future hit must ultimately pass through the single \(q=2\) gateway of Theorem 9.9. Thus permanent omission of a specific mature hole \(g\) is equivalent to perpetual blocking of all later \(q=2,L=g\) states.

For 852655, Theorem 9.10 shows that any such perpetual blocker must be structurally extreme: either a very long same-segment universal blocker or an extraordinarily old cross-segment collision. This does not yet prove that the gateway is always blocked—or that an exact gateway ever occurs—but it sharply isolates the remaining mechanism.

## 10. Open problems

1. **Global renewal across mean crossings.** Extend Theorem 9.2 from one mean-height segment to an entrance-to-entrance invariant: prove, or disprove, that the intervals and stride-three blocker spines manufactured by one dangerous excursion necessarily regenerate a sufficient blocking configuration before the next one.
2. **Effective escape.** Theorem 2.3 proves that for each fixed \(B\), there is a finite last index \(F(B)\) for which \(a_n\le B\). An explicit bound with \(F(852655)<10^{612}\) would combine with Chaffin's computation to prove that 852655 never appears.
3. **Cross-segment collision classification.** Classify the non-universal blockers at \(q=2\), especially the observed height-change-zero family.
4. **Terminal-height values.** Study \(a_{\tau_h}\), where \(\tau_h\) is the final occurrence of height \(h\).
5. **Coverage.** Determine whether every nonnegative integer occurs.

## References

1. N. J. A. Sloane, *My Favorite Integer Sequences*, in *Sequences and Their Applications (SETA '98)*, Springer, 1999, 103–130.
2. E. W. Weisstein, *Recamán's Sequence*, MathWorld. <https://mathworld.wolfram.com/RecamansSequence.html>
3. M. A. Alekseyev, J. S. Myers, R. Schroeppel, S. R. Shannon, N. J. A. Sloane, P. Zimmermann, *Three Cousins of Recamán's Sequence*, Fibonacci Quarterly 60(3) (2022), 201–219. <https://arxiv.org/abs/2004.14000>
4. D. G. Korssjoen, B. Li, S. Steinerberger, R. Tripathi, R. Zhang, *Finding Structure in Sequences of Real Numbers via Graph Theory: a Problem List*, Involve 15 (2022), 251–270. <https://arxiv.org/abs/2012.04625>
5. B. Chaffin, *The Recamán Sequence*, computational project page, 2026. <https://benchaffin.com/recaman/recaman.html>
6. B. Chaffin, *Holes less than 2^32 after 10^612 terms*, data file, 2026. <https://benchaffin.com/recaman/rec-holes-2_32.txt>
7. OEIS A005132, A064228, A064289, A064293, A064294, A064492, A065051, A065052, A393814, A393815. <https://oeis.org/A005132>

## Disclosure

An OpenAI language model was used extensively during exploration, derivation attempts, algebraic checking, code generation, computational auditing, and drafting. Provisional claims were repeatedly checked against the recurrence and re-derived before inclusion where possible. The author takes responsibility for the claims and any errors in this manuscript. This document remains a preprint: it has not undergone independent peer review, and its theorems have not yet been formally verified in a proof assistant.