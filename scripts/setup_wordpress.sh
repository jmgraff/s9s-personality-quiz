alias wp='docker-compose exec web wp'

URL="$HOST_IP:3000"

docker-compose down -v
docker-compose up -V -d

curl $URL
while [ $? -gt 0 ]
do
  sleep 1
  curl $URL
done

wp core install \
  --url="$URL" \
  --title="Test Site" \
  --admin_user="admin" \
  --admin_password="admin" \
  --admin_email="admin@email.com"
wp plugin install /tmp/react-quiz.zip --force --activate

