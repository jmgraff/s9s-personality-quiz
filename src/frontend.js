const { render, useState } = wp.element;

const S9SPersonalityQuiz = (props) => {
    const { title, description } = props.data.intro;

    return (
        <div style={{ border: '1px dotted black' }}>
            <div>
                <h3>{ title }</h3>
                <p>{ description }</p>
            </div>
        </div>
    );
}

document.querySelectorAll('.wp-block-s9s-personality-quiz').forEach(e => {
    console.log('Rendering react root component at :', e);
    render(<S9SPersonalityQuiz data={JSON.parse(e.getAttribute('data-quiz'))} />, e);
});
