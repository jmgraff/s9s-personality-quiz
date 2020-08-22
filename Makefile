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
JS_FILES = $(wildcard src/*.js)
CSS_FILES = $(wildcard src/*.css)

# *** Phony Targets ***
web:
	docker build -t $(WP_IMAGE_NAME) containers/wp/
PHONY+=web

test: build
	./scripts/setup_wordpress.sh
	(CYPRESS_BASE_URL=http://$$HOST_IP:3000 cypress run)
PHONY+=test

serve: dist
	./scripts/setup_wordpress.sh
PHONY+=serve

server-down:
	docker-compose down
PHONY+=server-down

clean: server-down
	rm -rf build/*
	rm -f dist/$(PROJECT_NAME_SLUG).zip
	rm -f *.empty
PHONY+=clean


# *** Build Targets ***
webpack.empty: $(JS_FILES)
	rm -f build/*.js
	npm run-script build
	touch $@

build/style.css: src/style.css
	cp $^ $@

build/index.php: src/index.php
	cp $^ $@

build: build/index.php build/style.css webpack.empty
	touch $@

dist/$(PROJECT_NAME_SLUG).zip: build
	rm -f $@
	zip -rj $@ build/*

dist: dist/$(PROJECT_NAME_SLUG).zip
	touch $@

endif # Docker container

.PHONY: $(PHONY)
