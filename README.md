# Neuro Krillion · Puffer Party

**[Play publicly](https://marzanipour.github.io/neuro-krillion/)** · [Original Puffer Party](https://krillion.io/party) · [Reconstruction audit](PARITY.md)

A neuroscience adaptation of Krillion's Puffer Party. Name an unused answer, pass the puffer, and stay afloat. New games use ten approachable prompts with hundreds of accepted answers each. The interface uses the observed original presentation and reef artwork; educational content and the HTTPS room service are newly implemented. This is an independent adaptation, not an official Krillion product.

## Play

- **Host a room:** choose Public (listed) or Private (code only), then share its four-letter code or invite link. The host adjusts lives, minimum turn, seat count, heart cap, and points per heart.
- **Quick Play / Rated:** joins another human table with the selected capacity, or opens one and waits for another person. Bots appear only in the explicitly labeled practice mode. Ratings are a simple local-device system, not Krillion's rating algorithm or a global account ladder.
- **Puffer Party:** three-second countdown, shared category, turn ownership, live typing, no repeated answers, rarity points, extra hearts, hidden fuse, elimination, and last-survivor victory. A visible turn clock counts elapsed seconds and a progress bar shows the guaranteed minimum; PUFFER LIVE marks overtime without revealing the random pop deadline. The puffer floats near the ring centre, smoothly turns toward the holder, and keeps its animation across state updates. Its size fits the clear space between players, and shrimp, perches and labels always draw in front of it. A wrong answer keeps the puffer with you. Every recipient gets at least the minimum turn. Pops change the category. Rematches seat the requester and people who opted into auto-join; other participants can choose Join Next Game.
- **Online continuity:** refresh recovers the same seat. HTTPS polling retries temporary failures. Leaving or a timed-out host transfers control to another connected player. Joining during a match creates a spectator seat. Chat and removal are host controlled.
- **Practice / one-screen party:** use bots or share one screen with friends. These modes run locally.
- **Daily Neural Dive:** a surface introduction, descent previews, seven date-seeded questions, a visible 25-second sonar timer, a score-driven descent before answer reveals, and explicit Descend/Surface actions. Each scored answer visibly turns and sends the shrimp downward with a bubble trail while the camera and depth counter follow. Every point sinks it 10 metres; a perfect 700 reaches 7,000m. The first completed result, in-progress timer, answer sheets, streak and logbook persist on this browser. Practice replays preserve the official result. Enter starts a dive, submits an answer, descends to the next prompt, or surfaces after the last reveal; holding Enter cannot advance multiple rounds. Focused buttons, search fields and dialogs retain their normal keyboard behavior. Daily resets follow New York midnight, including daylight-saving changes. Completing consecutive daily dives unlocks buddies at 5, 14, 30, and 45 days.
- **Study the bank:** search categories, answers, aliases, explanations, and linked references.

## Neuroscience library

**10 broad playable prompts · 241–1,903 answers per prompt · 3,105 distinct accepted answer names.** The 113 focused study sets remain in the library, including the earlier specialist questions. There are 6,291 scored entries across play and study sets; this count includes names appearing in multiple relevant categories. Coverage includes cellular physiology, anatomy, circuits, senses, development, plasticity, cognition, sleep, research methods, and clinical definitions. The anatomy supplement derives from 1,636 selected human-subset neural structures in the open Uberon ontology, with exact synonyms and term-level reference links. Side duplicates, obsolete terms and abstract grouping labels are filtered. No live API is required to play.

Every category has a designated **100-point introductory-course anchor**. More specialized answers generally earn 60 or 85 points. This deliberately makes the maximum attainable with introductory knowledge while rewarding deeper knowledge. Scores are editorial tiers, not measured survey frequencies.

| Tier | Points |
|---|---:|
| Plankton | 10 |
| Too clever | 15 |
| Schooler | 30 |
| Rare | 60 |
| Deep cut | 85 |
| Neurokrillion | 100 |

Banks are curated, not exhaustive. A scientifically valid answer can be absent. Aliases and standard abbreviations are accepted. Loose spelling and sound-alike matches offer corrections. A clear match fills the canonical answer into the field; ambiguous matches offer choices. The player must press SEND or DIVE again to earn points. Corrections preserve the running clock and cannot reuse an already-used party answer. Exact names and registered aliases submit immediately. Very short near-misses and unrelated guesses remain invalid. Long answer keys offer search, score filters and incremental loading in both the study bank and Daily Dive results. Each category links its background source. Newly written explanations draw on Purves, Allen Institute, Janelia, Jackson Laboratory, NINDS, and relevant primary research.

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

This uses the official `rea-agents@6.8.0` CLI from [morluto/rea](https://github.com/morluto/rea), with separate owned browser profiles. It captures DOM, accessibility, URL, and screenshots at 1280×900 and 390×844 for the reference and rebuild, then uses REA's screenshot comparator. Raw captures remain in ignored `.artifacts/rea-audit/`. Run `node rea-daily-audit.mjs` to use the same pinned REA CLI for Enter-to-start, Enter-to-submit, a moving-shrimp capture, reveal, and Enter-to-descend. Changing live public room lists and animation frames prevents a zero-difference screenshot result; inspect the evidence and behavior checklist rather than interpreting a percentage as proof of equivalence.

## Room service

The deployed service is https://neuro-krillion-rooms.amsa-nyu2026.chatgpt.site. `/api/health` reports its transport and exact library counts. `server.js` is a Worker-compatible default `fetch` export using a D1-compatible database bound as `DB`; `rooms-schema.sql` creates its table. Bundle the module and its imports as ESM when deploying to another Worker host, apply the schema, and update `room-config.js` and the permitted frontend origins.

Game state, answer validation, deadlines, and scores are authoritative on the server. Random seat credentials are kept in sessionStorage; the service stores their SHA-256 hashes. Optimistic database updates preserve simultaneous room actions. Browser refresh does not duplicate a player. A 90-second disconnect grace period supports temporary interruptions; inactive rooms expire after 30 minutes. Exact fuse deadlines and seat credentials are excluded from participant snapshots. Private rooms are unlisted, not password protected. These are friendly educational games, and their answer bank is public source.

Nicknames, buddy selection, daily streaks, ratings, and personal results are stored on this browser. Online rooms share nicknames, typed answers, chat, and game state with participants. No microphone, camera, analytics, ad scripts, or Krillion account connection is used. The older vendored PeerJS file remains in repository history but is no longer loaded or used.

## Attribution and license

See [THIRD-PARTY.md](THIRD-PARTY.md). **The `krillion-*` artwork files and `original-krillion.css` are Krillion presentation material and are excluded from this project's MIT license.** This repository does not claim ownership or grant a license to those assets. The original game remains credited. The original neuroscience questions, room service, and adaptation code are MIT licensed; the font has its own SIL Open Font License.

To rebuild the attributed anatomy supplement, download `https://purl.obolibrary.org/obo/uberon/nervous-minimal.obo` and run `python3 import-neural-ontology.py /path/to/nervous-minimal.obo`. The generated module records the source SHA-256 and selection count. Uberon-derived labels and synonyms retain CC BY 3.0 attribution; see `UBERON-LICENSE.txt`.
