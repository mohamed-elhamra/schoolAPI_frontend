#! /bin/sh

chmod +x ./wait
./wait
nginx -g 'daemon off;'