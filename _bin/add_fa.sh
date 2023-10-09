#!/bin/sh

for icon in "$@"; do
  grep -q " ${icon}$" fa.txt && continue
  if ! grep -q "^\$fa-var-${icon}: " node_modules/fork-awesome/scss/_variables.scss; then
    echo "\"${icon}\" no existe"
    continue
  fi

  grep "^\$fa-var-${icon}: " node_modules/fork-awesome/scss/_variables.scss |
    sed -re "s/^.*: \"?\\\(.*)\"?;/\1 ${icon}/" >> fa.txt
done
