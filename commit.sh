#!/bin/bash


msg=$1
git add -A
git commit -m "${msg}"
git push