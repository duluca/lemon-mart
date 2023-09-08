#!/usr/bin/env bash

echo "Replicating..."

# ./replicate.sh src/app/common "ui.service.ts ui.service.spec.ts" "8 10 11 12 13 14"
./replicate.sh src/app/page-not-found "*" "8 10 11 12 13 14"
