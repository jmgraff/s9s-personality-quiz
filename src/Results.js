const { TextControl, TextareaControl, Button, Card, CardBody, CardHeader, CardFooter, ButtonGroup } = wp.components;

import { connect } from 'react-redux';

import { getResults, add, remove, setTitle, setDescription, setImageURL } from './store-results.js';

function Results({ results, add, remove, setTitle, setDescription, setImageURL }) {
    console.log('results: ', results);
    return (
        <div>
            { results.map((r,i) => (
                <Card>
                    <CardBody>
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
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => remove(r.id)} isDestructive>Delete Result</Button>
                    </CardFooter>
                </Card>
            ))}
            <Button onClick={add} isPrimary>Add Result</Button>
        </div>
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
