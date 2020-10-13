import { TextControl, TextareaControl } from '@wordpress/components';
import { connect } from 'react-redux';

import { getResults, add, remove, setTitle, setDescription, setImageURL } from './store-results.js';
import QuizMediaUpload from './QuizMediaUpload.js';
import ItemTabs from './ItemTabs.js';


function Results({ results, add, remove, setTitle, setDescription, setImageURL }) {
    return (
        <ItemTabs
            items={results}
            itemName={'Result'}
            onAdd={() => add()}
            onRemove={r => remove(r.id)}
            renderItem={(r) => (
                <>
                    <QuizMediaUpload
                        imgSrc={ r.image_url }
                        onChange={ (url) => setImageURL(r.id, url) }
                    />
                    <TextControl
                        label="Result Title"
                        onChange={ val => setTitle(r.id, val) }
                        value={ r.title }
                    />
                    <TextareaControl
                        label="Result Description"
                        onChange={ val => setDescription(r.id, val) }
                        value={ r.description }
                    />
                </>
            )}
        />
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
