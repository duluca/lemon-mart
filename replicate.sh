#!/usr/bin/env bash

# define source folder
# take src as input arg
src=$1
# src=src/app/common

# define files array
# take multiple files as input arg
# if * is passed, copy all files
if [[ $2 == "*" ]]; then
  files=($(ls $src))
else
  files=($2)
fi
# files=(auth.service.ts auth.service.spec.ts)

# define folders array
# take multiple folders as input arg
stages=("8" "10" "11" "12" "13" "14")
# if the third arg is not empty use it as the stages array
if [[ -n $3 ]]; then
  stages=($3)
fi

stageFolders=()
# prepend each stages input with stage
for number in "${stages[@]}"; do
  stageFolders+=("projects/stage$number")
done

# set param named force if --force or -f is passed
force=false
if [[ $4 == "--force" || $4 == "-f" ]]; then
  force=true
fi

for file in "${files[@]}"; do
  for folder in "${stageFolders[@]}"; do
    echo -n "Copying $src/$file to $folder"
    if [[ -d "$folder" ]]; then
      # copy only if target file exists or force is true
      if [[ -f "$folder/$src/$file" && $force == true ]]; then
        cp -r $src/$file $folder/$src/
        echo "... done"
      elif [[ ! -f "$folder/$src/$file" ]]; then
        cp -r $src/$file $folder/$src/
        echo "... done"
      else
        echo "... file exists"
      fi
    else
      echo "... folder does not exist"
    fi
  done
done
