PROJECT_NAME=S9S\ Personality\ Quiz

DEV_IMAGE_NAME = s9s/wp-plugin-dev:1.0
WP_IMAGE_NAME = s9s/wp-plugin-web:1.0
SHELL = /bin/sh

.PHONY: dev
dev:
	./scripts/run_dev_container.sh $(DEV_IMAGE_NAME) $(PROJECT_NAME)

.PHONY: docker
docker:
	scripts/install_docker_ubuntu.sh

.PHONY: list
list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

# *********************************************************************
# * Everything below this line only runs inside the Docker container! *
# *********************************************************************
ifeq ($(shell pwd), /project)
SLUG=$(shell slugify $(PROJECT_NAME))
JS_FILES=$(wildcard src/*.js)
CSS_FILES=$(wildcard src/*.css)
BUILDS=$(SLUG) $(SLUG)-premium $(SLUG)-debug $(SLUG)-premium-debug

.PHONY: web
web:
	docker build -t $(WP_IMAGE_NAME) containers/wp/

.PHONY: test
test: serve-s9s-personality-quiz-premium-debug
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

build/index.php: src/index.php
	sed 's/__PRODUCT_NAME__/S9S Personality Quiz/g' $^ > $@

build/index.premium.php: src/index.php
	sed 's/__PRODUCT_NAME__/S9S Personality Quiz PREMIUM/g' $^ > $@

build: build/index.php build/index.premium.php webpack.empty
	cp build/index.premium.php build/$(SLUG)-premium/index.php
	cp build/index.premium.php build/$(SLUG)-premium-debug/index.php
	cp build/index.php build/$(SLUG)/index.php
	cp build/index.php build/$(SLUG)-debug/index.php
	touch $@

define BUILD_ZIPS
dist/$(1).zip: build
	rm -f $$@
	zip -rj $$@ build/$(1)/*
.PHONY: serve-$(1)
serve-$(1): dist
	scripts/setup_wordpress.sh $(1)
endef
$(foreach ii,$(BUILDS),$(eval $(call BUILD_ZIPS,$(ii))))

dist: $(foreach ii,$(BUILDS),dist/$(ii).zip)
	touch $@

endif # Docker container

.PHONY: $(PHONY)
