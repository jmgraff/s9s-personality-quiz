PROJECT_NAME=S9S\ Personality\ Quiz

DEV_IMAGE_NAME = s9s/wp-plugin-dev:1.0
WP_IMAGE_NAME = s9s/wp-plugin-web:1.0
SHELL = /bin/sh

dev:
	./scripts/run_dev_container.sh $(DEV_IMAGE_NAME) $(PROJECT_NAME)
PHONY+=dev

# *********************************************************************
# * Everything below this line only runs inside the Docker container! *
# *********************************************************************

ifeq ($(shell pwd), /project)

PROJECT_NAME_SLUG = $(shell slugify $(PROJECT_NAME))

# *** Phony Targets ***

web:
	docker build -t $(WP_IMAGE_NAME) containers/wp/
PHONY+=web

test: build
	./scripts/setup_wordpress.sh
	(CYPRESS_BASE_URL=http://$$HOST_IP:3000 cypress run)
PHONY+=test

serve: build
	./scripts/setup_wordpress.sh
PHONY+=serve

server-down:
	docker-compose down
PHONY+=server-down

dist: $(PROJECT_NAME_SLUG).zip
PHONY+=dist

clean: server-down
	rm -rf build/*
	rm $(PROJECT_NAME_SLUG).zip
PHONY+=clean


# *** Build Targets ***

build/admin.bundle.js: src/admin.js
	npm run-script build

build/style.css: src/style.css
	cp src/style.css $@

build/index.php: src/index.php
	cp src/index.php $@

build: build/index.php build/admin.bundle.js build/style.css
	touch $@

$(PROJECT_NAME_SLUG).zip: build
	zip -j $@ build/*

endif # Docker container

.PHONY: $(PHONY)
