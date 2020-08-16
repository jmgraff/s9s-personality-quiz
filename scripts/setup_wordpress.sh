#!/bin/bash

WP='docker-compose exec web wp'

URL="$HOST_IP:3000"

docker-compose down -v
docker-compose up -V -d

curl $URL
while [ $? -gt 0 ]
do
  sleep 1
  curl $URL
done

$WP core install \
  --url="$URL" \
  --title="S9S Wordpress Test Site" \
  --admin_user="admin" \
  --admin_password="admin" \
  --admin_email="admin@email.com"

docker-compose exec web mkdir wp-content/temp
docker-compose exec web chmod 755 wp-content/temp
docker-compose exec web chown www-data wp-content/temp
docker-compose exec web chgrp www-data wp-content/temp

$WP config set WP_TEMP_DIR __DIR__\ .\ \'/wp-content/temp/\' --raw

$WP config set WP_DEBUG true --raw
$WP config set WP_DEBUG_DISPLAY true --raw

$WP plugin install /tmp/$PROJECT_NAME_SLUG.zip --force --activate
