#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

cd dist

git init
git config user.name "Felix Thiele"
git config user.email "felix.thiele@tum.de"

git remote add upstream "https://$GH_TOKEN@github.com/FelixThieleTUM/JsonFormsEditor"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages