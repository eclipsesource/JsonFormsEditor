#!/bin/bash


msg=$1
git add -f ./test
git commit -m "${msg}"
git push