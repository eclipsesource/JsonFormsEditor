#!/bin/bash




set -o errexit -o nounset

rev=$1
git remote rm upstream
git remote add upstream "https://github.com/eclipsesource/JsonFormsEditor"
git tag -a "v${rev}" -m "Created tag v${rev}"
git push upstream "v${rev}"

git remote remove heroku
heroku git:remote -a jsonformseditor
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku master