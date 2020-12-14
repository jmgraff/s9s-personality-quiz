import { Provider } from 'react-redux';

const { registerBlockType } = wp.blocks;
const { TabPanel } = wp.components;

import Intro from './Intro.js';
import Results from './Results.js';
import Questions from './Questions.js';
import Settings from './Settings.js';
import S9SPQIcon from './S9SPQIcon.js';

import { getNewStore } from './store.js';

let title = 'Personality Quiz';
let blockName = 's9s/personality-quiz';

if (PREMIUM) {
    title += ' PREMIUM';
    blockName += '-premium';
}

if (DEBUG) {
    title += ` - DEBUG`;
}

registerBlockType(blockName, {
    title,
    category: 'common',
    icon: <S9SPQIcon />,
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
                        name: 'questions',
                        title: 'Questions',
                        className: 'questions'
                    },
                    {
                        name: 'results',
                        title: 'Results',
                        className: 'results'
                    },
                    {
                        name: 'settings',
                        title: 'Settings',
                        className: 'settings'
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
                                case 'settings':
                                    return <Settings />;
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
