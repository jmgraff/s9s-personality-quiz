import time

def test_creation(wordpress, browser): 
    browser.implicitly_wait(10)
    browser.get('http://192.168.1.175:3000/wp-login.php')

    username = browser.find_element_by_id("user_login").send_keys("admin")
    password = browser.find_element_by_id("user_pass").send_keys("admin")

    submitButton = browser.find_element_by_id("wp-submit").click() 

    browser.get("http://192.168.1.175:3000/wp-admin/post-new.php?post_type=reactquiz_quiz")

    browser.find_element_by_xpath("//input[@id='title']").send_keys("test-title")
    browser.find_element_by_xpath("//div[@class='App']/div[1]/input[1]").send_keys("quiz-title")
    browser.find_element_by_xpath("//div[@class='App']/div[2]/input[1]").send_keys("quiz-description")

    browser.find_element_by_xpath("//input[@id='publish']").click()
    time.sleep(1) #FIXME: use selenium wait features instead
    browser.find_element_by_xpath("//input[@id='publish']").click()
    time.sleep(1) #FIXME: use selenium wait features instead

    permalink = browser.find_element_by_xpath("//span[@id='sample-permalink']/a[1]").get_attribute('href')
    browser.get(permalink)

    assert "Oops! That page" not in browser.page_source
    assert browser.find_element_by_id("reactquiz")
