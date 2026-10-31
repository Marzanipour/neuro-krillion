# Neuro Krillion · Puffer Party

**[Play publicly](https://marzanipour.github.io/neuro-krillion/)** · [Original Puffer Party](https://krillion.io/party) · [Reconstruction audit](PARITY.md)

A neuroscience adaptation of Krillion's Puffer Party. Name an unused answer, pass the puffer, and stay afloat. The interface uses the observed original presentation and reef artwork; educational content and the HTTPS room service are newly implemented. This is an independent adaptation, not an official Krillion product.

## Play

- **Host a room:** choose Public (listed) or Private (code only), then share its four-letter code or invite link. The host adjusts lives, minimum turn, seat count, heart cap, and points per heart.
- **Quick Play / Rated:** joins another human table with the selected capacity, or opens one and waits for another person. Bots appear only in the explicitly labeled practice mode. Ratings are a simple local-device system, not Krillion's rating algorithm or a global account ladder.
- **Puffer Party:** three-second countdown, shared category, turn ownership, live typing, no repeated answers, rarity points, extra hearts, hidden fuse, elimination, and last-survivor victory. A wrong answer keeps the puffer with you. Every recipient gets at least the minimum turn. Pops change the category. Rematches seat the requester and people who opted into auto-join; other participants can choose Join Next Game.
- **Online continuity:** refresh recovers the same seat. HTTPS polling retries temporary failures. Leaving or a timed-out host transfers control to another connected player. Joining during a match creates a spectator seat. Chat and removal are host controlled.
- **Practice / one-screen party:** use bots or share one screen with friends. These modes run locally.
- **Daily Neural Dive:** seven date-seeded questions, 25 seconds each, 700 points maximum, resetting at midnight in New York. Completing consecutive daily dives unlocks the original buddy sequence at 5, 14, 30, and 45 days on this browser.
- **Study the bank:** search categories, answers, aliases, explanations, and linked references.

## Neuroscience library

**111 categories · 1,669 scored category answers.** The count includes an answer appearing in more than one relevant category. Coverage includes cellular physiology, anatomy, circuits, senses, development, plasticity, cognition, sleep, research methods, and clinical definitions.

Every category has a designated **100-point introductory-course anchor**. More specialized answers generally earn 60 or 85 points. This deliberately makes the maximum attainable with introductory knowledge while rewarding deeper knowledge. Scores are editorial tiers, not measured survey frequencies.

| Tier | Points |
|---|---:|
| Plankton | 10 |
| Too clever | 15 |
| Schooler | 30 |
| Rare | 60 |
| Deep cut | 85 |
| Neurokrillion | 100 |

Banks are curated, not exhaustive. A scientifically valid answer can be absent. Aliases and standard abbreviations are accepted. Unambiguous minor spelling errors are accepted for longer answers; short abbreviations must match. Each category links its background source. Newly written explanations draw on Purves, Allen Institute, Janelia, Jackson Laboratory, NINDS, and relevant primary research.

## Run and verify

The frontend requires no build or dependency installation:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/. Online play uses the public room service configured in `room-config.js`; practice and one-screen play run in the browser. Serve over HTTP rather than opening index.html directly.

Use Node 24.22.1+ for checks (`node:sqlite` is used by the service tests):

```sh
npm test
npm run check
```

The meaningful engine/service tests cover alias collisions, point awards, hearts, replay protection, timer boundaries, simultaneous joins, authenticated seats, countdowns, spectator continuity, rematches, live typing, chat controls, host transfer, matchmaking, and HTTP origin handling.

To repeat the browser reconstruction audit, install pnpm and use an installed Chrome-family browser, then run the following while the local server is running:

```sh
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node rea-audit.mjs
```

This uses the official `rea-agents@6.8.0` CLI from [morluto/rea](https://github.com/morluto/rea), with separate owned browser profiles. It captures DOM, accessibility, URL, and screenshots at 1280×900 and 390×844 for the reference and rebuild, then uses REA's screenshot comparator. Raw captures remain in ignored `.artifacts/rea-audit/`. Changing live public room lists and animation frames prevents a zero-difference screenshot result; inspect the evidence and behavior checklist rather than interpreting a percentage as proof of equivalence.

## Room service

The deployed service is https://neuro-krillion-rooms.amsa-nyu2026.chatgpt.site. `/api/health` reports its transport and exact library counts. `server.js` is a Worker-compatible default `fetch` export using a D1-compatible database bound as `DB`; `rooms-schema.sql` creates its table. Bundle the module and its imports as ESM when deploying to another Worker host, apply the schema, and update `room-config.js` and the permitted frontend origins.

Game state, answer validation, deadlines, and scores are authoritative on the server. Random seat credentials are kept in sessionStorage; the service stores their SHA-256 hashes. Optimistic database updates preserve simultaneous room actions. Browser refresh does not duplicate a player. A 90-second disconnect grace period supports temporary interruptions; inactive rooms expire after 30 minutes. Exact fuse deadlines and seat credentials are excluded from participant snapshots. Private rooms are unlisted, not password protected. These are friendly educational games, and their answer bank is public source.

Nicknames, buddy selection, daily streaks, ratings, and personal results are stored on this browser. Online rooms share nicknames, typed answers, chat, and game state with participants. No microphone, camera, analytics, ad scripts, or Krillion account connection is used. The older vendored PeerJS file remains in repository history but is no longer loaded or used.

## Attribution and license

See [THIRD-PARTY.md](THIRD-PARTY.md). **The `krillion-*.png` files and `original-krillion.css` are Krillion presentation material and are excluded from this project's MIT license.** This repository does not claim ownership or grant a license to those assets. The original game remains credited. The original neuroscience questions, room service, and adaptation code are MIT licensed; the font has its own SIL Open Font License.
