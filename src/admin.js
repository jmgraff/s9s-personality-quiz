import { Provider } from 'react-redux';
import Thing from './Thing.js';
import { getNewStore } from './store.js';

const { registerBlockType } = wp.blocks;

registerBlockType('s9s/personality-quiz', {
    title: 'S9S Personality Quiz - Free Edition',
    category: 'common',
    attributes: {
        data: {
            type: 'string'
        }
    },

    edit({ attributes: { data }, setAttributes }) {
        console.log('data: ', data);
        const store = getNewStore(data);
        console.log('state: ', store.getState());
        return (
            <Provider store={store}>
                <Thing
                    setData={ () => setAttributes({ data: JSON.stringify(store.getState()) }) }
                />
            </Provider>
        );
    },

    save(props) {
        console.log('save data: ', props.attributes.data);
        return <div data-quiz={ props.attributes.data }></div>;
    },
});
