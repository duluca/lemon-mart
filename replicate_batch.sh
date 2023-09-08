#!/usr/bin/env bash

# check git status clean before replicating, exit if not clean
if [[ -n $(git status -s) ]]; then
  echo "Git status is not clean, please commit changes before replicating"
  exit 1
fi

echo "Replicating..."

# ./replicate.sh src/app/common "ui.service.ts ui.service.spec.ts" "8 10 11 12 13 14"
./replicate.sh src/app/page-not-found "*" "8 10 11 12 13 14"
