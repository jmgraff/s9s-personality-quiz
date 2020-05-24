alias wp='docker-compose exec web wp'

URL="$HOST_IP:3000"

curl $URL
while [ $? -gt 0 ]
do
  sleep 1
  curl $URL
done

wp core install \
  --url="$URL" \
  --title="admin" \
  --admin_user="admin" \
  --admin_password="admin" \
  --admin_email="admin@email.com"
wp plugin activate "react-quiz"

