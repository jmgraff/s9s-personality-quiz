SRC_BASE=./src/
ADMIN_DIR=$(SRC_BASE)/admin/
FRONTEND_DIR=$(SRC_BASE)/frontend/
PLUGIN_DIR=./plugin/
BUILD_REACT=npm run-script build

server: plugin
	docker-compose up

admin:
	cd $(ADMIN_DIR) && $(BUILD_REACT)

frontend:
	#cd $(FRONTEND_DIR) && $(BUILD_REACT)
	@echo "Frontend not workin' right now"

plugin: admin frontend
	mkdir -p plugin
	cp -r $(ADMIN_DIR)/build/ ./plugin/admin/
	#cp -r $(FRONTEND_DIR)/build/ ./plugin/frontend/
	cp   $(SRC_BASE)/*.php ./plugin/

clean:
	docker-compose down
	rm -rf $(ADMIN_DIR)/build/
	rm -rf $(FRONTEND_DIR)/build/
	rm -rf $(PLUGIN_DIR)
