#!/bin/bash

git remote remove heroku
heroku git:remote -a jsonforms-editor-staging
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku master