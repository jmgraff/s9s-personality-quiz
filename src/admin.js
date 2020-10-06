import { Provider } from 'react-redux';

const { registerBlockType } = wp.blocks;
import { TabPanel } from '@wordpress/components';

import Intro from './Intro.js';
import Results from './Results.js';
import Questions from './Questions.js';
import Finish from './Finish.js';

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
            setAttributes({data: JSON.stringify(store.getState())})
        });

        return (
            <Provider store={store}>
                <TabPanel tabs={[
                    {
                        name: 'intro',
                        title: 'Intro',
                        className: 'intro'
                    },
                    {
                        name: 'results',
                        title: 'Results',
                        className: 'results'
                    },
                    {
                        name: 'questions',
                        title: 'Questions',
                        className: 'questions'
                    },
                    {
                        name: 'finish',
                        title: 'Finish',
                        className: 'finish'
                    },
                ]}>
                    {
                        (tab) => {
                            switch (tab.name) {
                                case 'intro':
                                    return <Intro />;
                                case 'results':
                                    return <Results />;
                                case 'questions':
                                    return <Questions />;
                                case 'finish':
                                    return <Finish />;
                            }
                        }
                    }
                </TabPanel>
            </Provider>
        );
    },

    save(props) {
        return <div data-quiz={ props.attributes.data }></div>;
    },
});
