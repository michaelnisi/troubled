#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o xtrace

SOURCE="${BASH_SOURCE[0]}"
if [[ -h $SOURCE ]]; then
  SOURCE="$(readlink "$SOURCE")"
fi

DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
SRC=$DIR/src
TEMPLATES=$DIR/templates
CSS=$DIR/resources/css

# Inserts the new CSS file names into the head template.
insert_css_paths() {
  for p in $CSS/*; do
    filename="${p##*/}"

    if [[ $filename == *"style"* ]]; then
        local style=/css/$filename
    fi
    if [[ $filename == *"normalize"* ]]; then
        local normalize=/css/$filename
    fi
    if [[ $filename == *"syntax"* ]]; then
        local syntax=/css/$filename
    fi
  done

  local in=$SRC/head.pug.in
  local out=$TEMPLATES/head.pug

  sed \
    -e "s;@@NORMALIZE@@;$normalize;g" \
    -e "s;@@STYLE@@;$style;g" \
    -e "s;@@SYNTAX@@;$syntax;g" \
    $in> $out
  }

echo "Inserting CSS Paths"
insert_css_paths

exit 0
