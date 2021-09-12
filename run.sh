#!/bin/sh
CWD="$(pwd)"
echo $CWD
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
nvm use v14.10.0
pm2 ls
pm2 delete ef-nl-frontend
ls -l
rm -rf build
ls -l
tar -xzf build.tar.gz
ls -l
pm2 start index.js --name ef-nl-frontend
