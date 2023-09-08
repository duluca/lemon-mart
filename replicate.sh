#!/usr/bin/env bash

# define source folder
# take src as input arg
src=$1
# src=src/app/common

# define files array
# take multiple files as input arg
files=($2)
# files=(auth.service.ts auth.service.spec.ts)

# define folders array
# take multiple folders as input arg
stages=($3)

stageFolders=()
# prepend each stages input with stage
for number in "${stages[@]}"; do
  stageFolders+=("projects/stage$number")
done

for file in "${files[@]}"; do
  for folder in "${stageFolders[@]}"; do
    echo -n "Copying $src/$file to $folder"
    if [[ -d "$folder" ]]; then
      cp -r $src/$file $folder/$src/
      echo "... done"
    else
      echo "... does not exist"
    fi
  done
done
