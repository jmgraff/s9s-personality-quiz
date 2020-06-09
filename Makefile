SHELL = /bin/sh

SRC_BASE = ./src
ADMIN_DIR = $(SRC_BASE)/admin
FRONTEND_DIR = $(SRC_BASE)/frontend
BUILD_REACT = npm run-script build
TEST_REACT = npm run-script test
SERVE_REACT = npm run-script start
DEV_CONTAINER_NAME = reactquiz/dev:1.0
TEST_DIR = tests

DOTFILES = ~/.vim
DOTFILES += ~/.vimrc
DOTFILES += ~/.tmux.conf

build: $(ADMIN_DIR)/build $(FRONTEND_DIR)/build $(SRC_BASE)/ReactQuiz.php
	mkdir -p $@
	cp -r $(ADMIN_DIR)/build $@/admin
	cp -r $(FRONTEND_DIR)/build $@/frontend
	cp $(SRC_BASE)/ReactQuiz.php $@
	touch $@

dev:
	docker build -t $(DEV_CONTAINER_NAME) containers/dev/
	docker run -it --rm \
		--detach-keys="ctrl-@" \
		-v $(shell pwd):/project \
		-v /home/$(shell whoami)/.ssh:/root/.ssh \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-e HOST_PWD=$(shell pwd) \
		-e HOST_IP=$(shell hostname -I | awk -F' ' '{print $$1}') \
		--network host \
		$(DEV_CONTAINER_NAME) fish
PHONY+=dev

test:
	pytest -s -vvx $(TEST_DIR)

server:
	docker-compose up -d 
	./scripts/setup_wordpress.sh	
PHONY+=server

server-down:
	docker-compose down

$(ADMIN_DIR)/node_modules: $(ADMIN_DIR)/package.json
	cd $(ADMIN_DIR) && npm install
	touch $@

$(ADMIN_DIR)/build: $(ADMIN_DIR)/node_modules $(ADMIN_DIR)/src/$(wildcard *.js) $(ADMIN_DIR)/src/$(wildcard *.css)
	cd $(ADMIN_DIR) && $(BUILD_REACT)
	touch $@

$(FRONTEND_DIR)/node_modules: $(FRONTEND_DIR)/package.json 
	cd $(FRONTEND_DIR) && npm install
	touch $@

$(FRONTEND_DIR)/build: $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/src/$(wildcard *.js) $(FRONTEND_DIR)/src/$(wildcard *.js)
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
	rm -rf $(ADMIN_DIR)/build/
	rm -rf $(FRONTEND_DIR)/build/
	rm -rf build
PHONY+=clean

.PHONY: $(PHONY)
