import time
import re
import json

def test_creation(browser):
    browser.login()

    browser.go_create_quiz_page()
    assert browser.find_in_source('".*/admin/static/js/.*"')
    assert browser.find_in_source('".*/admin/static/css/.*"')

    browser.set_quiz_page_title('test quiz')
    browser.set_quiz_title('my new quiz')
    browser.set_quiz_description('my quiz description')
    browser.publish_quiz()

    # update the quiz
    browser.set_quiz_title('my newer quiz')
    time.sleep(10)
    browser.publish_quiz()

    browser.go_quiz()

    assert browser.find_in_source('my new quiz')
    assert browser.find_in_source('".*/frontend/static/js/.*"')
    assert browser.find_in_source('".*/frontend/static/css/.*"')

def test_creation_from_JSON(browser):
    browser.login()
    browser.go_create_quiz_page()

    with open('tests/data/testquiz.json') as data_file:
        quiz_json = data_file.read()

    browser.set_quiz_page_title('Test Quiz 123')

    json_input = browser.grab("//textarea[@id='reactquiz-json']")
    json_input.clear()
    json_input.send_keys(quiz_json)
    print(quiz_json)
    assert False

    browser.publish_quiz()
    browser.go_quiz()

    quiz_obj = json.loads(quiz_json)

    assert browser.find_in_source(quiz_obj["quizData"]["description"])
    assert browser.grab("//div[@id='reactquiz']")
