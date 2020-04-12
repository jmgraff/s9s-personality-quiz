import React, {useState} from 'react';

function Answers(props) {
  const [answers, setAnswers] = useState(props.data);

  function onChange(e, i) {
    const currentState = [...answers];
    currentState[i][e.target.name] = e.target.value;
    setAnswers(currentState);
    props.onChange(currentState);
  }

  function renderAnswers(answers) {
    return answers.map((k,v) => {
      return (
        <li key={v}>
         <input type="text" name='answer' value={k.answer} onChange={e => onChange(e,v)}/>
         <input type="text" name='value' size="3" value={k.value} onChange={e => onChange(e,v)}/>
        </li>
      );
    });
  }

  return (
    <ul>
      {renderAnswers(answers)}
    </ul>
  );
}

export default Answers;
