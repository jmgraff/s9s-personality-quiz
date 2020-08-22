const { registerBlockType } = wp.blocks;
const { useState, RawHTML } = wp.element;
const { Button } = wp.components;
const { registerStore, withSelect, withDispatch } = wp.data;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { compose } = wp.compose;

const applyWithSelect = withSelect(select => {
    const {getTodos} = select('my-todos-plugin');
    return { todos: getTodos() };
});
const applyWithDispatch = withDispatch(dispatch => ({ addTodo } = dispatch('my-todos-plugin')));

const Todos = compose(applyWithSelect)(({todos}) => {
    return (
        <ul>
            { todos.map(todo => <li>{todo.text}</li>) }
        </ul>
    );
});

const TodoAdder = compose(applyWithDispatch, applyWithSelect)(({addTodo, setData, todos}) => {
    [currentTodo, setCurrentTodo] = useState('');

    setData(JSON.stringify(todos));

    return (
        <div>
            <Todos />
            <div>
                <input type="text" value={currentTodo} onChange={(e) => setCurrentTodo(e.target.value)} />
                <button onClick={() => addTodo(currentTodo)}>Add Todo</button>
            </div>
        </div>
    );
});

//import produce from 'immer';
// This is the reducer
function reducer( state = [], action ) {
    if ( action.type === 'ADD_TODO' ) {
        return state.concat( [ action.todo ] );
    }

    return state;
}

// These are some selectors
function getTodos(state) {
    return state;
}

function countTodos(state) {
    return state.length;
}

// These are the actions
function addTodo(text, done = false) {
    return {
        type: 'ADD_TODO',
        todo: { text, done }
    };
}

// Now let's register our custom namespace
wp.data.registerStore( 'my-todos-plugin', {
    reducer: reducer,
    selectors: { getTodos, countTodos },
    actions: { addTodo },
    initialState: []
});

registerBlockType('s9s/personality-quiz', {
    title: 'S9S Personality Quiz - Free Edition',
    category: 'common',
    attributes: {
        data: {
            type: 'string'
        }
    },

    edit(props) {
        console.log(props.attributes);
        return (
            <TodoAdder setData={(data) => props.setAttributes({data})} />
        );
    },

    save(props) {
        return <div data-quiz={JSON.stringify(props.attributes.data)}></div>;
    },
});
