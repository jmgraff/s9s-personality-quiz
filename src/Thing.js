const { useState } = wp.element;
const {  } = wp.components;

import { connect } from 'react-redux';

import { getThing, setThingTitle, setThingText } from './store.js';
import TodoAdder from './TodoAdder.js';
import TodoList from './TodoList.js';

function Thing({ title, text, setData, setThingTitle, setThingText }) {
    const handleClick = (e) => {
        e.preventDefault();
        setData();
    }

    return (
        <div>
            <input type="text" value={title} onChange={(e) => setThingTitle(e.target.value)} />
            <br />
            <textarea type="text" value={text} onChange={(e) => setThingText(e.target.value)}></textarea>
            <br />
            <button onClick={handleClick}>Save</button>
        </div>
    );
}

const mapStateToProps = (state) => getThing(state);
export default connect(mapStateToProps, { setThingTitle, setThingText })(Thing);

