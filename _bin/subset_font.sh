#!/bin/sh
#
# Compresses and removes non-latin characters from font files.  This
# makes them much smaller but removes support for other languages, so
# use with care.
#
# It also replaces the original file on SCSS files, assuming you're
# placing fonts on assets/fonts/ and final CSS on assets/css/

set -e

LATIN_UNICODE="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

font="$@"
output_font="${font%.*}-subset.woff2"

if test -f "${output_font}" && test "${output_font}" -nt "${font}"; then
  echo "ok - nothing to do for ${output_font}"
  exit 0
fi

pyftsubset "${font}" --output-file="${output_font}" --unicodes="${LATIN_UNICODE}" --layout-features="*" --flavor=woff2

echo "$(test $? -ne 0 && echo "not ")ok - ${output_font}"

for scss in _scss/* _sass/*; do
  test -f "${scss}" || continue
  grep -q "${font#*/}" "${scss}" || continue

  sed -r \
      -e "s|${font#*/}|${output_font##*/}|g" \
      -e "s|format\([^)]+\)|format('woff2')|g" \
      -i "${scss}"
  echo "$(test $? -ne 0 && echo "not ")ok - ${scss}"
done
