#!/bin/bash

echo "Starting import...";

/opt/keycloak/bin/kc.sh import --file /tmp/realm.json --override false;

if [ $NO_THEME_CACHE == "true" ]
then
  echo "Starting server without theme cache...";
  /opt/keycloak/bin/kc.sh start \
    --spi-theme-static-max-age=-1 \
    --spi-theme-cache-themes=false \
    --spi-theme-cache-templates=false;
else
  echo "Starting server in normal mode...";
  /opt/keycloak/bin/kc.sh start;
fi