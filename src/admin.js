import { Provider } from 'react-redux';

const { registerBlockType } = wp.blocks;

import Thing from './Thing.js';
import { getNewStore } from './store.js';

let title = '';

if (PREMIUM) {
    title = 'S9S Personality Quiz Premium';
} else {
    title = 'S9S Personality Quiz - Free Edition';
}

registerBlockType('s9s/personality-quiz', {
    title,
    category: 'common',
    attributes: {
        data: {
            type: 'string'
        }
    },

    edit({ attributes: { data }, setAttributes }) {
        const store = getNewStore(data, () => {
            console.log("Saving attributes: ", store.getState());
            setAttributes({data: JSON.stringify(store.getState())})
        });

        return (
            <Provider store={store}>
                <Thing />
            </Provider>
        );
    },

    save(props) {
        return <div data-quiz={ props.attributes.data }></div>;
    },
});
