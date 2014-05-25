#!/usr/bin/env sh

cd "$( cd "$( dirname "$0" )" && pwd )"

cd ../node-ovrsdk 
npm pack
mv node-ovrsdk-*.tgz ../test
cd ../test
npm install printf colors *.tgz
node test.js
rm node-ovrsdk-*.tgz
rm -rf node_modules




