import React, {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

function Results(props) {
    const [results, setResults] = useState(props.data.map(r => {
        if (!r.id) { 
            r.id = uuidv4();
        }
        return r;
    }));

    useEffect(() => {
        props.onChange(results);
    }, [results]);

    function handleAdd(e) {
        e.preventDefault();
        setResults([...results, {id: uuidv4(), title: '', value: ''}]);
    }

    function handleRemove(e, index) {
        e.preventDefault();
        setResults(results.filter((a,i) => i !== index));
    }

    function onChange(e, i) {
        const currentState = [...results];
        currentState[i][e.target.name] = e.target.value;
        setResults(currentState);
    }

    return (
        <div>
            <h3>Results</h3>
            <ul>
                {results.map((x,i) => (
                    <li key={x.id} data-testid={`answer-${i}`}>
                        <input
                            data-testid="result-input"
                            type="text"
                            name="title"
                            value={x.title}
                            onChange={e => onChange(e,i)}
                        />
                        <input 
                            data-testid="value-input"
                            type="text"
                            name="value"
                            size="3"
                            value={x.value}
                            onChange={e => onChange(e,i)}
                        />
                        <button 
                            data-testid="remove-button"
                            onClick={e => handleRemove(e,i)}
                        >
                            &times;
                        </button>
                    </li>
                ))}
                <button onClick={e => handleAdd(e)}>Add Result</button>
            </ul>
        </div>
    );
}

export default Results;
