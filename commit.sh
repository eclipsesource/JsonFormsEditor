#!/bin/bash


msg=$1
git add -f ./temp
git commit -m "${msg}"
git push