const { useState } = wp.element;
const { RichText } = wp.editor;

import { connect } from 'react-redux';

import { getThing, setThingTitle, setThingText } from './store.js';

function Thing({ title, text, setData, setThingTitle, setThingText }) {
    const handleToken = token => console.log(token);

    return (
        <div>
            <input type="text" value={title} onChange={e => setThingTitle(e.target.value)} /> <br />
            <RichText
                    onChange={setThingText}
                    value={text}
                    multiline="p"
                    placeholder="Thing text goes here"
            />
        </div>
    );
}

const mapStateToProps = (state) => getThing(state);
export default connect(mapStateToProps, { setThingTitle, setThingText })(Thing);

