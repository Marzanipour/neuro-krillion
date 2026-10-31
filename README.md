# Neuro Krillion

A neuroscience adaptation inspired by [Krillion's Puffer Party](https://krillion.io/party). Original questions, editorial scoring, interface implementation and pixel artwork. Independent project; not affiliated with Krillion.

**Play:** https://marzanipour.github.io/neuro-krillion/

## Play modes

- **Quick Play:** jump directly into a party against clearly labeled practice bots.
- **Local Party:** 2–10 friends share one screen and keyboard. Add names, adjust rules, and wake the puffer.
- **Online rooms:** host a private table and share the six-letter code or invite URL. The host's browser runs the game and must remain open. Guests connect directly over WebRTC using PeerJS Cloud for signaling.
- **Daily neural dive:** seven date-seeded categories, 25 seconds per question, maximum 700 points. The shared date changes at midnight in America/New_York. Replays and hints are allowed.
- **Answer bank:** searchable, scored questions with explanations for learning between games.

## Party rules

Submit an unused answer in the current category to pass the puffer. Its random 12–30-second fuse is hidden and does not restart on every pass; passing late extends it enough to guarantee the recipient their minimum turn. Wrong or repeated answers leave the puffer with you. A pop costs one heart and starts a new category after a short pause. Players without hearts are eliminated. The last survivor wins.

Default settings: two starting hearts, eight-second minimum turns, five-heart cap, 600 rarity points per bonus heart. Hosts can adjust settings before play. Answers earn their points both toward the total score and toward the next bonus heart. At the cap, completed meters are consumed. If all answers in a category have been used, the game changes category immediately and keeps the fuse running. Categories cycle through the entire bank before repeating.

## Content and scores

33 original neuroscience categories contain 421 scored answers, covering cellular neuroscience, neuroanatomy, sensation, learning, sleep, methods and clinical concepts. Each category has a 100-point gem taught in an introductory neuroscience course. Specialized answers generally score 85, so deeper knowledge is rewarded without making the maximum score inaccessible to introductory students.

| Tier | Points |
| --- | ---: |
| Plankton | 10 |
| Too clever | 15 |
| Schooler | 30 |
| Rare | 60 |
| Deep cut | 85 |
| Neurokrillion | 100 |

These are **editorial difficulty scores, not measured answer frequencies**. “Too clever” denotes an especially predictable attempt at a niche answer. Answer banks are bounded curated sets, not exhaustive taxonomies. Clinical entries are educational definitions. Canonical spellings, aliases and standard abbreviations are accepted. An unambiguous one-character typo is accepted for words at least five characters long, or two characters for words at least ten characters long. Ambiguous corrections and short abbreviation near-misses are rejected.

The principal background reference is [Purves et al., *Neuroscience*, 2nd edition](https://www.ncbi.nlm.nih.gov/books/NBK10799/toc/), supplemented by [BrainFacts](https://www.brainfacts.org/) and the [NINDS disorder index](https://www.ninds.nih.gov/health-information/disorders). Explanations and questions are newly written, not excerpts of those sources.

## Run locally

No build step or package installation is required. Serve the repository with any static HTTP server:

```sh
python3 -m http.server 4173
```

Visit http://localhost:4173. Use Node.js 20+ for checks:

```sh
npm test
npm run check
```

GitHub Pages deployment: select **Deploy from a branch**, `main`, `/ (root)` in repository Settings → Pages. All asset links are relative, so project subpaths work without a build.

## Online infrastructure and limits

PeerJS 1.5.5 is vendored locally with its MIT license. Google STUN servers are used for WebRTC negotiation. No account, database, API secret or paid service is required. Rooms are invite-only; there is no global public-room directory, public matchmaking, ranked ladder, permanent room storage or host migration. Internet access to the signaling service is needed for online mode. Some school, workplace, mobile and symmetric-NAT networks require a TURN relay; this project does not provision one. Local and bot modes work without the signaling service.

The host validates turn ownership, answers, duplicate answers, scoring and deadlines. A guest is identified by its data connection, not an ID supplied in an answer message. Room codes are invitation conveniences, not sensitive-data access controls. Disconnecting guests are eliminated or removed from the lobby. Refreshing or closing the host tab ends the room. This peer-hosted architecture is intended for friendly games; it is not cheat-proof competitive infrastructure, and the answer bank is public source.

Names, buddy selection and local scores are stored in localStorage. Online mode shares player nicknames, answers and game state with room participants. No analytics, ads, microphone or camera access.

## Files

- `app.js`: UI, accessibility, local play, bots, daily play and online transport.
- `engine.js`: deterministic, separately tested game rules and answer matching.
- `bank.js`: question bank, aliases, explanations and editorial scores.
- `engine.test.js`: meaningful scoring, deadline, elimination, alias and bank-integrity tests.
- `style.css` and the SVG assets: responsive underwater pixel-art interface, with reduced-motion support.

## Attribution

Game inspiration: [Krillion](https://krillion.io/party). No Krillion source code, sprites or question sets are included. VT323 by Peter Hull is distributed under the SIL Open Font License; see `OFL.txt`. PeerJS is MIT licensed; see `PEERJS-LICENSE`. Original code and original educational content are MIT licensed.
