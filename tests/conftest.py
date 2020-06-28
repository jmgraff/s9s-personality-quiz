import pytest

import os
import re
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


@pytest.fixture(scope="function")
def stack():
    os.system('scripts/setup_wordpress.sh')
    yield

class ReactQuizBrowser(webdriver.Chrome):
    def __init__(self):
        self.base_url = f'http://{os.environ["HOST_IP"]}:3000'
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--headless")
        dc= DesiredCapabilities.CHROME
        dc['goog:loggingPrefs'] = { 'browser' : 'ALL' }
        super().__init__(options=chrome_options, desired_capabilities=dc)
        self.set_window_size(1024, 768)

    def login(self):
        self.get(f'{self.base_url}/wp-login.php')
        self.find_element_by_id("user_login").send_keys("admin")
        self.find_element_by_id("user_pass").send_keys("admin")
        self.find_element_by_id("wp-submit").click()

    def grab(self, xpath, timeout=20):
        return WebDriverWait(self, timeout).until(EC.presence_of_element_located((By.XPATH, xpath)))

    def find_in_source(self, regex_string):
        plugin_css_regex = re.compile(regex_string);
        return plugin_css_regex.findall(self.page_source)

    def go_create_quiz_page(self):
        self.get(f"{self.base_url}/wp-admin/post-new.php?post_type=reactquiz_quiz")

    def go_quiz(self):
        permalink = self.grab("//span[@id='sample-permalink']/a[1]").get_attribute('href')
        self.get(permalink)

    def set_quiz_page_title(self, title):
        self.grab("//input[@id='title']").send_keys(title)

    def set_quiz_title(self, title):
        title_input = self.grab("//input[@id='reactquiz-title']")
        title_input.clear()
        title_input.send_keys(title)

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
    with open('chromelog.txt', 'w+') as log:
        for line in browser.get_log('browser'):
            log.write(f"{line['level']}: {line['message']}\n")
    with open('pagesource.html', 'w+') as pagesource:
        pagesource.write(browser.page_source)
    browser.quit()
