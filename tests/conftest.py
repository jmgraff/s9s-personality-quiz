import pytest

import os
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture(scope="function")
def stack():
    os.system('docker-compose down')
    os.system('docker-compose up -V -d')
    os.system('scripts/setup_wordpress.sh')
    yield
    os.system('docker-compose down')

class ReactQuizBrowser(webdriver.Chrome):
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        super().__init__(options=chrome_options)

    def login(self):
        self.get('http://192.168.1.175:3000/wp-login.php')
        self.find_element_by_id("user_login").send_keys("admin")
        self.find_element_by_id("user_pass").send_keys("admin")
        submitButton = self.find_element_by_id("wp-submit").click() 

    def grab(self, xpath, timeout=10):
        return WebDriverWait(self, timeout).until(EC.presence_of_element_located((By.XPATH, xpath)))

    def go_create_quiz_page(self):
        self.get("http://192.168.1.175:3000/wp-admin/post-new.php?post_type=reactquiz_quiz")

    def go_quiz(self):
        permalink = self.grab("//span[@id='sample-permalink']/a[1]").get_attribute('href')
        self.get(permalink)

    def set_quiz_page_title(self, title):
        self.grab("//input[@id='title']").send_keys(title)

    def set_quiz_title(self, title):
        self.grab("//div[@class='App']/div[1]/input[1]").send_keys(title)

    def set_quiz_description(self, description):
        self.grab("//div[@class='App']/div[2]/input[1]").send_keys(description)

    def publish_quiz(self):
        publish_button_xpath = "//input[@id='publish']"
        # FIXME: doing this twice is a hack
        self.grab(publish_button_xpath).click()
        time.sleep(1)
        self.grab(publish_button_xpath).click()


@pytest.fixture(scope="function")
def browser(stack):
    browser = ReactQuizBrowser()
    yield browser 
    browser.save_screenshot('screenshot.png')
    browser.quit()
