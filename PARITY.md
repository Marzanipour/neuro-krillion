# Puffer Party reconstruction audit

Reference: https://krillion.io/party. Audited 2026-10-31. Tool: [morluto/rea](https://github.com/morluto/rea), official `rea-agents@6.8.0`, repository revision `d54a4661da20382ad8456564a08569fdd24131c5`.

## Method

1. Use REA's declarative browser scenarios in isolated, owned Chrome profiles. Capture the original and local build at identical desktop/mobile viewport sizes, including DOM, accessibility, URL, and screenshots. Wait for the lobby and artwork before capturing.
2. Explore a private reference room with two independently controlled browsers. Observe lobby settings, disabled guest controls, countdown, live category, accepted answer, turn change, pop, winner, and opt-in rematch behavior. Avoid unrelated public games.
3. Inspect the browser-delivered presentation CSS and renderer to reconstruct authored reef camera anchors, seat spacing, sprite sizing, perches, layers, and responsive breakpoints. Preserve attribution separately from original educational/service code.
4. Implement server-authoritative room state and test the transitions with a real SQL adapter. Validate concurrent joins, credentials, repeated requests, hidden deadlines, and spectator seats, not merely happy-path clicks.
5. Repeat the real hosted service flow between the in-app browser and independent Chrome. Check refresh recovery and host transfer, then repeat on the public GitHub Pages build.
6. Run `node rea-audit.mjs` after future UI changes. Keep raw evidence local; inspect image and semantic differences alongside the matrix below. Dynamic content must not be silently treated as matching.

## Observed behavior matrix

| Feature | Reference observation | Adaptation |
|---|---|---|
| Lobby | 3-column desktop; stacked mobile; large animated-brand reef | Original styles/art, matched structure and authored reef camera |
| Buddy choice | Krill; 5/14/30/45-day unlock sequence | Same sequence using local daily-dive streak |
| Play modes | Rated, casual Quick Play, table capacity presets | Separate real-human matchmaking; explicit practice mode |
| Rooms | Public/listed or private/code; four letters | Hosted directory, join code and invite link |
| Host rules | Lives, min. turn, seats, advanced hearts and visibility | Synchronized host-only settings and bounded validation |
| Start | Get Ready, 3→2→1, disabled input | Server-timed countdown, shared across browsers |
| Live round | Category card, moving puffer, perches, hearts, holder input | Reconstructed geometry and synchronized state |
| Typing/answers | Holder typing, canonical accepted answer, rarity feedback | Debounced shared typing and accepted-answer bubbles |
| Scoring | Rarer answers approach an extra heart | Original editorial neuroscience tiers and configurable heart threshold |
| Repeats | Used answers unavailable in current category | Canonical alias-aware rejection |
| Pop/elimination | Holder loses a heart; remaining player wins | Server deadline, intermission, new category, last survivor |
| End screen | You Win / named winner; round rating; Play Again | Same flow; rating saved locally; educational round log |
| Rematch | Requester ready, others watching unless auto-join | Ready/watcher/auto-join state preserved |
| Chat | Messages, player list, host controls | Shared chat, on/off and removal |
| Continuity | Reference behavior not exhaustively established | Seat recovery, retries, and host transfer tested explicitly |

## Deliberate differences and unverified behavior

This is a close reconstruction of observed Puffer Party, **not proof of identical private server behavior**. No browser tool can guarantee equivalence for every hidden rule or future version of a live site.

Neuroscience questions, aliases, explanations, and scores replace the general-knowledge content. Exact original answer frequencies, matchmaking criteria, rating mathematics, random fuse distribution, category-selection policy, anti-abuse controls, and account persistence cannot be established from the captured UI. The adaptation uses documented local implementations and a new HTTPS room service. Rated changes are simple local-device changes; there is no claim of reproducing Krillion's competitive ladder. The first holder is the first seated player in this implementation; a reference game started with the guest. Third-party ads, account sign-in, analytics, and payment flows are omitted. Practice, one-screen party, study bank, and Daily Neural Dive are educational additions. Audio feedback is synthesized rather than a verified copy of the original sound design. Animation phase and changing public-room data naturally differ between captures.

A zero pixel difference would still not establish behavioral parity. The repeatable capture scenarios, explicit unknowns, state-transition tests, and independent-browser verification provide reviewable evidence without making that claim.

## Daily Dive, clocks and correction update

The original Daily Dive was inspected directly on 2026-10-31, including its surface introduction, 25-second sonar clock, two-step correction preview, reveal screen, explicit descent, and ten-metres-per-point depth. The adaptation now follows that sequence with neuroscience content, deterministic daily questions, refresh recovery, daily result history, separate practice replay, and New York midnight resets. Its pixel ocean is newly drawn, so it is not claimed to be a pixel-identical copy of the original canvas renderer.

The party renderer keeps the same puffer element across state updates and eases its orientation toward the holder while it floats at the centre, matching the observed original movement. Card animations no longer affect measured seat geometry. A visible elapsed-turn clock and minimum-turn progress bar use a server holder timestamp; the random fuse deadline stays private.

Loose near matches produce a correction or a small set of alternatives. Previewing a correction never awards points or pauses a clock. Canonical resubmission is required. Unconfirmed daily corrections cannot receive points automatically at timeout.

Puffer clearance also adapts its rotating footprint to the occupied seat bounds. Shrimp, perches and nameplates render above the puffer as a second safeguard against occlusion, including on narrow screens.

## Larger keys and visible scored descents

New Party and Daily games use ten deliberately broader neuroscience prompts, with 241–1,903 canonical answer names per prompt. The 113 narrower study sets remain available and older in-progress dives still resolve their saved question IDs. All aliases are checked for collisions after pooling; counts do not count aliases as separate answers. Anatomy labels and exact synonyms include an attributed, reproducibly selected Uberon subset. Scores are editorial and every playable key retains an introductory-course 100-point anchor.

Daily answers now enter a persisted `diving` phase before the reveal. The shrimp moves and turns downward, leaves bubbles, and the depth counter and camera interpolate to exactly ten metres per point. The visible excursion and duration scale with points; zero-point answers do not fabricate a descent. The new motion curve is an adaptation, not a claim of identical original animation timing. Enter starts, submits, descends and surfaces; focus in other controls and open dialogs prevents the global shortcut from taking over. `rea-daily-audit.mjs` uses the official pinned REA CLI from morluto/rea to capture these transitions.

Recorded REA keyboard/descent evidence: `ev_303d4b5ff8bb500b74356afe0b34837d6f91a16d10fa5190e71c5841436ff3d4`. The declared intro, Enter, answer, moving-shrimp, reveal and next-prompt steps completed; the owned browser was terminated. Browser captures also confirm the depth counter interpolated to 1,000m. Reduced-motion mode is respected; the motion audit explicitly requests `no-preference`.
