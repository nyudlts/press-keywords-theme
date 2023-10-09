#!/bin/sh

grep -v "^#" fa.txt |
  sed "s/^/U+/" |
  cut -d " " -f 1 |
  tr "\n" "," |
  xargs -rI {} \
    pyftsubset \
      --output-file="assets/fonts/forkawesome-webfont.woff2" \
      --unicodes="{}" \
      --layout-features="*" \
      --flavor="woff2" \
      "node_modules/fork-awesome/fonts/forkawesome-webfont.woff2"
