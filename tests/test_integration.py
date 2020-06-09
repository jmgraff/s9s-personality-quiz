import re

def test_creation(browser): 
    browser.login()
    browser.go_create_quiz_page()

    plugin_css_regex = re.compile('".*/admin/static/css/.*"');
    matches = plugin_css_regex.findall(browser.page_source)
    print(matches)
    assert len(matches) > 0

    browser.set_quiz_page_title('test quiz')
    browser.set_quiz_title('my new quiz')
    browser.set_quiz_description('my quiz description')
    browser.publish_quiz()
    browser.go_quiz()
    
    plugin_css_regex = re.compile('".*/frontend/static/css/.*"');
    matches = plugin_css_regex.findall(browser.page_source)
    print(matches)
    assert len(matches) > 0
