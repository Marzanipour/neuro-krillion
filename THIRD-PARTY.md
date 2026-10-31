# Third-party material

Neuro Krillion is an independent educational adaptation. It is not affiliated with or endorsed by Krillion.

## Krillion

Source: https://krillion.io/party, observed on 2026-10-31 using the user-requested [REA toolkit](https://github.com/morluto/rea).

The files `krillion-*.png` and `krillion-water-bg.webp` reproduce visible reef, perch, mascot (including gold and the date-limited Halloween variants), and puffer artwork from the original website. `original-krillion.css` preserves its browser-delivered presentation styles. These materials remain the property of their respective owners; no ownership or MIT licensing of them is claimed. Scene geometry in `layout.js` was reconstructed from the original browser renderer. Attribution does not independently grant redistribution rights.

No original Krillion answer bank, private server implementation, account data, or advertising scripts are included. The neuroscience bank is original educational content with editorial scores. Its references are linked in the bank.

## Other dependencies

- VT323, Peter Hull: `vt323.ttf`, SIL Open Font License 1.1; see `OFL.txt`.
- REA 6.8.0, https://github.com/morluto/rea: MIT. Used as a pinned development/audit CLI; not shipped as a runtime dependency.
- PeerJS 1.5.5: MIT; `PEERJS-LICENSE`. Legacy vendored file; the application no longer loads it.

The repository's MIT license applies only to original contributions for which the contributors hold the necessary rights.

## Uberon anatomy supplement

`bank-anatomy.js` contains a selected, transformed subset of the [Uberon multi-species anatomy ontology](https://github.com/obophenotype/uberon), developed by the Uberon contributors, under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). The full applicable license is in `UBERON-LICENSE.txt`; this derived data is excluded from this repository’s MIT license. Labels and exact synonyms come from the nervous-minimal release; explanatory parent descriptions and scores are generated for this educational adaptation. Selection is restricted to non-obsolete human-subset neural structures with anatomical labels, excluding side duplicates and abstract grouping terms. `import-neural-ontology.py` reproduces the transformation; `ANATOMY_SOURCE` records the download URL and SHA-256. No endorsement by the ontology contributors is implied.
