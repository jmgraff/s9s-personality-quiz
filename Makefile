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

test: serve-premium-debug
	#./scripts/setup_wordpress.sh
	(CYPRESS_BASE_URL=http://$$HOST_IP:3000 cypress run)
PHONY+=test

unit-test:
	npx jest
PHONY+=unit-test

serve-free: dist
	./scripts/setup_wordpress.sh free
PHONY+=serve-free

serve-free-debug: dist
	./scripts/setup_wordpress.sh free-debug
PHONY+=serve-free-debug

serve-premium: dist
	./scripts/setup_wordpress.sh premium
PHONY+=serve-premium

serve-premium-debug: dist
	./scripts/setup_wordpress.sh premium-debug
PHONY+=serve-premium-debug

server-down:
	docker-compose down
PHONY+=server-down

clean: server-down
	rm -rf build/*
	rm -rf dist/*
	rm -f *.empty
PHONY+=clean


# *** Build Targets ***
webpack.empty: $(JS_FILES)
	rm -f build/free/*.js
	rm -f build/free-debug/*.js
	rm -f build/premium/*.js
	rm -f build/premium-debug/*.js
	npm run-script build-all
	touch $@

build/style.css: src/style.css
	cp $^ $@

build/index.free.php: src/index.php
	sed 's/__FEATURE_SET__/Free/g' $^ > $@

build/index.premium.php: src/index.php
	sed 's/__FEATURE_SET__/Premium/g' $^ > $@

build: build/index.free.php build/index.premium.php build/style.css webpack.empty
	touch $@

dist/$(PROJECT_NAME_SLUG)-free.zip: build
	rm -f $@
	zip -rj $@ build/free/* build/index.free.php build/style.css

dist/$(PROJECT_NAME_SLUG)-free-debug.zip: build
	rm -f $@
	zip -rj $@ build/free-debug/* build/index.free.php build/style.css

dist/$(PROJECT_NAME_SLUG)-premium.zip: build
	rm -f $@
	zip -rj $@ build/premium/* build/index.premium.php build/style.css

dist/$(PROJECT_NAME_SLUG)-premium-debug.zip: build
	rm -f $@
	zip -rj $@ build/premium-debug/* build/index.premium.php build/style.css

dist: dist/$(PROJECT_NAME_SLUG)-free.zip dist/$(PROJECT_NAME_SLUG)-premium.zip \
dist/$(PROJECT_NAME_SLUG)-free-debug.zip dist/$(PROJECT_NAME_SLUG)-premium-debug.zip
	touch $@

endif # Docker container

.PHONY: $(PHONY)
