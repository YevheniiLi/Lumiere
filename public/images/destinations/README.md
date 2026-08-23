# Missing photography

This folder needs one real, local photo per destination. **None exist yet** —
every card currently falls back to illustrated art (`components/destination-art.tsx`)
because `photo` is unset on every entry in `data/destinations.ts`.

The code is already wired end-to-end for local files: drop a `.jpg`/`.webp` into
this folder, then set the matching destination's `photo` field to
`{ src: "/images/destinations/<filename>", alt: "..." }`. No other change is
needed — `next/image` picks it up immediately, hover zoom and overlays already
apply to it.

## Exact files needed (17)

| Destination             | Suggested filename           | What it should show                              |
| ----------------------- | ---------------------------- | ------------------------------------------------ |
| Kyoto, Japan            | `kyoto-japan.jpg`            | Temples, traditional streets, or torii gates     |
| Santorini, Greece       | `santorini-greece.jpg`       | Oia's white buildings + the Aegean caldera       |
| Reykjavík, Iceland      | `reykjavik-iceland.jpg`      | Icelandic landscape, aurora, or the city itself  |
| Marrakech, Morocco      | `marrakech-morocco.jpg`      | Moroccan architecture, medina streets, or a riad |
| Queenstown, New Zealand | `queenstown-new-zealand.jpg` | Lake Wakatipu with the Remarkables behind it     |
| Lisbon, Portugal        | `lisbon-portugal.jpg`        | Tiled streets, trams, or the Alfama hillside     |
| Bali, Indonesia         | `bali-indonesia.jpg`         | Rice terraces or a temple in a tropical setting  |
| Cape Town, South Africa | `cape-town-south-africa.jpg` | Table Mountain over the coastline                |
| Paris, France           | `paris-france.jpg`           | A street scene or the Eiffel Tower               |
| Rome, Italy             | `rome-italy.jpg`             | The Colosseum or a Roman street                  |
| Barcelona, Spain        | `barcelona-spain.jpg`        | Sagrada Família or Gaudí architecture            |
| Tokyo, Japan            | `tokyo-japan.jpg`            | A neon district or city skyline                  |
| Bangkok, Thailand       | `bangkok-thailand.jpg`       | A gilded wat or a river/market scene             |
| New York, USA           | `new-york-usa.jpg`           | The skyline or a street scene                    |
| Banff, Canada           | `banff-canada.jpg`           | A glacial lake with mountains                    |
| Rio de Janeiro, Brazil  | `rio-de-janeiro-brazil.jpg`  | Christ the Redeemer, Sugarloaf, or the coastline |
| Sydney, Australia       | `sydney-australia.jpg`       | The Opera House and/or Harbour Bridge            |

## Why this repo can't add them itself

This project is built and validated inside a sandboxed environment with no
access to image hosting/stock-photo services and no image-generation tool —
only package registries (npm/GitHub) are reachable. Any photo added here has
to come from outside that environment (a licensed stock library, your own
photography, or a source you've personally verified the rights to).

## Recommended sources

- Your own photos, if you have them for any of these places
- A licensed stock library (Unsplash+, Shutterstock, Getty, etc.) — respect
  each photo's license terms
- Public-domain or CC-licensed sources (Wikimedia Commons, Pexels, Pixabay),
  verified individually

Once a file lands here, wiring it in is a one-line change per destination —
see the comment at the top of `data/destinations.ts`.
