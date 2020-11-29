import { createHashtagList } from '../src/Share.js';

test("Create hashtag list", () => {
    let result = createHashtagList("#a ##b ###c");
    expect(result.length).toBe(3);
    result.forEach(ii => expect(!ii.startsWith('#')));

    result = createHashtagList(undefined);
    expect(result).toBeUndefined();
});
