SHELL = /bin/sh

SRC_BASE = /project/src
ADMIN_DIR = $(SRC_BASE)/admin
FRONTEND_DIR = $(SRC_BASE)/frontend
BUILD_REACT = npm run-script build
TEST_REACT = npm run-script test
SERVE_REACT = npm run-script start
DEV_IMAGE_NAME = reactquiz/dev:1.0
WP_IMAGE_NAME = reactquiz/wp:1.0
TEST_DIR = tests
TEMP_DIR = /tmp/react-quiz
BUILD_DIR = /project/build

DOTFILES = ~/.vim
DOTFILES += ~/.vimrc
DOTFILES += ~/.tmux.conf

build: $(ADMIN_DIR)/build $(FRONTEND_DIR)/build $(SRC_BASE)/ReactQuiz.php
	rm -rf $@
	mkdir -p $@
	rm -rf $(TEMP_DIR) && mkdir -p $(TEMP_DIR)
	cp -r $(ADMIN_DIR)/build $(TEMP_DIR)/admin
	cp -r $(FRONTEND_DIR)/build $(TEMP_DIR)/frontend
	cp -r $(SRC_BASE)/ReactQuiz.php $(TEMP_DIR)
	cd $(TEMP_DIR) && zip -r $(BUILD_DIR)/react-quiz.zip *
	touch $@

wp:
	docker build -t $(WP_IMAGE_NAME) containers/wp/
PHONY+=wp

dev:
	./scripts/run_dev_container.sh $(DEV_IMAGE_NAME)
PHONY+=dev

test: build
	./scripts/setup_wordpress.sh
	(CYPRESS_BASE_URL=http://$$HOST_IP:3000 cypress run)
PHONY+=test

server:
	./scripts/setup_wordpress.sh
PHONY+=server

server-down:
	docker-compose down
PHONY+=server-down

$(ADMIN_DIR)/node_modules: $(ADMIN_DIR)/package.json
	cd $(ADMIN_DIR) && npm install
	touch $@

$(ADMIN_DIR)/build: $(ADMIN_DIR)/node_modules $(ADMIN_DIR)/src/$(wildcard *.js) $(ADMIN_DIR)/src/$(wildcard *.css)
	cd $(ADMIN_DIR) && $(BUILD_REACT)
	touch $@

$(FRONTEND_DIR)/node_modules: $(FRONTEND_DIR)/package.json
	cd $(FRONTEND_DIR) && npm install
	touch $@

$(FRONTEND_DIR)/build: $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/src/$(wildcard *.js) $(FRONTEND_DIR)/src/$(wildcard *.css)
	cd $(FRONTEND_DIR) && $(BUILD_REACT)
	touch $@

test-admin:
	cd $(ADMIN_DIR) && $(TEST_REACT)
PHONY+=test-admin

test-frontend:
	cd $(FRONTEND_DIR) && $(TEST_REACT)
PHONY+=test-frontend

serve-admin:
	cd $(ADMIN_DIR) && $(SERVE_REACT)
PHONY+=serve-admin

serve-frontend:
	cd $(FRONTEND_DIR) && $(SERVE_REACT)
PHONY+=serve-admin

clean:
	docker-compose down
	rm -rf $(ADMIN_DIR)/build/
	rm -rf $(FRONTEND_DIR)/build/
	rm -rf build
PHONY+=clean

.PHONY: $(PHONY)
