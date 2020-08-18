const { registerBlockType } = wp.blocks;
const { useState, RawHTML } = wp.element;
const { Button } = wp.components;
const { registerStore } = wp.data;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;

//import produce from 'immer';
// This is the reducer
function reducer( state = [], action ) {
    if ( action.type === 'ADD_TODO' ) {
        return state.concat( [ action.todo ] );
    }

    return state;
}

// These are some selectors
function getTodos(stat ) {
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
    actions: { addTodo }
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
        let mediaId = '';
        const [imageUrl, setImageUrl] = useState(props.attributes.data);

        return (
            <>
                <img src={imageUrl} />
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ (media) => {
                            console.log(media);
                            setImageUrl(media.url);
                            props.setAttributes({data: media.url});
                        } }
                        allowedTypes={['image']}
                        value={mediaId}
                        render={({open}) => (
                            <Button onClick={open}>
                                Select Image
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
            </>
        );
    },

    save(props) {
        return <div data-quiz={props.attributes.data}></div>;
    },
});
