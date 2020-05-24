import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os

@pytest.fixture(scope="session")
def wordpress():
    os.system('docker-compose down')
    os.system('docker-compose up -d')
    os.system('scripts/setup_wordpress.sh')
    yield
    os.system('docker-compose down')

@pytest.fixture(scope="session")
def browser():
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--headless")
    browser = webdriver.Chrome(options=chrome_options)
    yield browser
    browser.quit()

