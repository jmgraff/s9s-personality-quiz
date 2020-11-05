#!/bin/bash

DEV_IMAGE_NAME=$1
PROJECT_NAME=$2
DETACH_KEYS="ctrl-@"

while IFS="|" read -r image name; do
    if [[ $image = $DEV_IMAGE_NAME ]]; then
        RUNNING_CONTAINER_NAME=$name
        echo "Found running container ${name}"
        break
    fi
done <<< $(docker ps --format "{{.Image}}|{{.Names}}")

if [ -z $RUNNING_CONTAINER_NAME ]; then
    docker build -t $DEV_IMAGE_NAME containers/dev
    docker run -it --rm \
        --detach-keys=$DETACH_KEYS \
        -v $(pwd):/project \
        -v /home/$(whoami)/.ssh:/root/.ssh \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -e HOST_PWD=$(pwd) \
        -e HOST_IP=$(hostname -I | awk -F' ' '{print $1}') \
        -e PROJECT_NAME="$PROJECT_NAME" \
        --network="host" \
        --ipc="host" \
        $DEV_IMAGE_NAME fish
else
    docker attach --detach-keys=$DETACH_KEYS $RUNNING_CONTAINER_NAME
fi
