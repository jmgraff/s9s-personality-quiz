const { render, useState } = wp.element;

const S9SPersonalityQuiz = (props) => {
    console.log(props);
    const { title, text } = props.data.thing;
    const [titleChecked, setTitleChecked] = useState(false);
    const [textChecked, setTextChecked] = useState(false);

    return (
        <div style={{color: 'blue', border: '1px dotted black' }}>
            <div>
                <p>{ title }</p>
                <input type="checkbox" checked={titleChecked} onChange={() => setTitleChecked(!titleChecked)} />
            </div>
            <div>
                <p>{ text }</p>
                <input type="checkbox" checked={textChecked} onChange={() => setTextChecked(!textChecked)} />
            </div>
        </div>
    );
}

document.querySelectorAll('.wp-block-s9s-personality-quiz').forEach(e => {
    console.log('Rendering react root component at :', e);
    render(<S9SPersonalityQuiz data={JSON.parse(e.getAttribute('data-quiz'))} />, e);
});
