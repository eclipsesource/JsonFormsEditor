#!/bin/bash


msg=$1
rm -r ./test/coverage
git add -f ./test
git commit -m "${msg}"
git push