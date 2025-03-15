#!/bin/bash 
echo "Starting build process..."

#Install dependencies
npm install 

#Rebuild sqlite3 with correct bindings 
npm rebuild sqlite3 --build-from-source

echo "Build process completed!"