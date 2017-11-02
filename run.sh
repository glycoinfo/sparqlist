#!/bin/sh

docker run -d -v ~/workdir/sparqlist/repository:/opt/git/sparqlist/repository -p 8089:3000 sparqlist:v1.0
