PROJECT_NAME=S9S\ Personality\ Quiz

DEV_IMAGE_NAME = s9s/wp-plugin-dev:1.0
SHELL = /bin/sh

dev:
	./scripts/run_dev_container.sh $(DEV_IMAGE_NAME) $(PROJECT_NAME)
PHONY+=dev

# *********************************************************************
# * Everything below this line only runs inside the Docker container! *
# *********************************************************************

ifeq ($(shell pwd), /project)
  PROJECT_NAME_SLUG=$(shell slugify $(PROJECT_NAME))
  SRC_BASE = /project/src
  WP_IMAGE_NAME = s9s/wp-plugin-web:1.0
  TEST_DIR = tests
  TEMP_DIR = /tmp/$(PROJECT_NAME_SLUG)
  BUILD_DIR = /project/build

  DOTFILES = ~/.vim
  DOTFILES += ~/.vimrc
  DOTFILES += ~/.tmux.conf

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

  build: $(SRC_BASE)/index.php $(SRC_BASE)/admin.js
	  rm -rf $@
	  mkdir -p $@
	  rm -rf $(TEMP_DIR) && mkdir -p $(TEMP_DIR)
	  cp -r $(SRC_BASE)/$(PROJECT_NAME_SLUG).php $(SRC_BASE)/*.js $(TEMP_DIR)
	  cd $(TEMP_DIR) && zip -r $(BUILD_DIR)/$(PROJECT_NAME_SLUG).zip *
	  touch $@

  clean:
	  docker-compose down
	  rm -rf build
  PHONY+=clean
endif

.PHONY: $(PHONY)
