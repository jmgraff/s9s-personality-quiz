PROJECT_NAME=S9S\ Personality\ Quiz

DEV_IMAGE_NAME = s9s/wp-plugin-dev:1.0
WP_IMAGE_NAME = s9s/wp-plugin-web:1.0
SHELL = /bin/sh

.PHONY: dev
dev:
	./scripts/run_dev_container.sh $(DEV_IMAGE_NAME) $(PROJECT_NAME)

# *********************************************************************
# * Everything below this line only runs inside the Docker container! *
# *********************************************************************
ifeq ($(shell pwd), /project)
PROJECT_NAME_SLUG=$(shell slugify $(PROJECT_NAME))
JS_FILES=$(wildcard src/*.js)
CSS_FILES=$(wildcard src/*.css)
BUILDS=free premium free-debug premium-debug

.PHONY: web
web:
	docker build -t $(WP_IMAGE_NAME) containers/wp/

.PHONY: test
test: serve-premium-debug
	#./scripts/setup_wordpress.sh
	(CYPRESS_BASE_URL=http://$$HOST_IP:3000 cypress run)

.PHONY: unit-test
unit-test:
	npx jest

.PHONY: server-down
server-down:
	docker-compose down

.PHONY: clean
clean: server-down
	rm -rf build/*
	rm -rf dist/*
	rm -f *.empty

# *** Build Targets ***
webpack.empty: $(JS_FILES)
	rm -f $(foreach ii,$(BUILDS),build/$(ii)/*.js)
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

define BUILD_ZIPS
dist/$(PROJECT_NAME_SLUG)-$(1).zip: build
	rm -f $$@
	zip -rj $$@ build/$(1)/* build/index.$(2).php build/style.css

.PHONY: serve-$(1)
serve-$(1): dist
	scripts/setup_wordpress.sh $(1)

endef

$(foreach ii,$(BUILDS),$(eval $(call BUILD_ZIPS,$(ii),$(shell echo $(ii) | cut -d'-' -f1))))

dist: $(foreach ii,$(BUILDS),dist/$(PROJECT_NAME_SLUG)-$(ii).zip)
	touch $@

endif # Docker container

.PHONY: $(PHONY)
