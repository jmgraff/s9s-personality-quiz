def test_thing(wordpress, browser): 
    browser.get('http://192.168.1.175:3000')
    print(browser.title)
