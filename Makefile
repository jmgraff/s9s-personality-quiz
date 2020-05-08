SRC_BASE=./src
ADMIN_DIR=$(SRC_BASE)/admin
FRONTEND_DIR=$(SRC_BASE)/frontend
PLUGIN_DIR=./plugin
BUILD_REACT=npm run-script build
TEST_REACT=npm run-script test

server:
	docker-compose up

admin:
	cd $(ADMIN_DIR) && $(BUILD_REACT)

frontend:
	cd $(FRONTEND_DIR) && $(BUILD_REACT)

plugin: admin frontend
	mkdir -p plugin
	cd $(PLUGIN_DIR) && rm -rf *
	cp -r $(ADMIN_DIR)/build/ $(PLUGIN_DIR)/admin/
	cp -r $(FRONTEND_DIR)/build/ $(PLUGIN_DIR)/frontend/
	cp   $(SRC_BASE)/*.php $(PLUGIN_DIR)

test-admin: 
	cd $(ADMIN_DIR) && $(TEST_REACT)

test-frontend: 
	cd $(FRONTEND_DIR) && $(TEST_REACT)
  
clean:
	rm -rf $(ADMIN_DIR)/build/
	rm -rf $(FRONTEND_DIR)/build/
	rm -rf $(PLUGIN_DIR)

.PHONY: clean test-admin test-frontend frontend admin server
