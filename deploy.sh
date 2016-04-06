#!/bin/bash




set -o errexit -o nounset

rev=$1

git remote add upstream "https://github.com/eclipsesource/JsonFormsEditor"
git tag -a "v${rev}" -m "Created tag v${rev}"
git push upstream "v${rev}"

cd dist

git init

git remote add upstream "https://github.com/eclipsesource/JsonFormsEditor"

git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "Release version v${rev}"
git push -q upstream HEAD:gh-pages