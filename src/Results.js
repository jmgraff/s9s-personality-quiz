const { TextControl, TextareaControl, Button, Card, CardBody, CardHeader, CardFooter,
    ButtonGroup, TabPanel } = wp.components;

import { getResults, add, remove, setTitle, setDescription, setImageURL } from './store-results.js';
import { connect } from 'react-redux';

function Results({ results, add, remove, setTitle, setDescription, setImageURL }) {
    const tabs = results.map((r,i) => ({
        name: i,
        title: r.title ? r.title : `Result ${i + 1}`,
        className: 'result'
    }));

    return (
        <>
            <TabPanel tabs={tabs}>
                { (tab) => (
                    <Card>
                        <CardBody>
                            <TextControl
                                label="Result Title"
                                onChange={ val => setTitle(results[tab.name].id, val) }
                                value={ results[tab.name].title }
                            />
                            <TextareaControl
                                label="Result Description"
                                onChange={ val => setDescription(results[tab.name].id, val) }
                                value={ results[tab.name].description }
                            />
                        </CardBody>
                        <CardFooter>
                            <Button
                                onClick={() => remove(results[tab.name].id)}
                                isDestructive
                            >
                                Delete Result
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={add} isPrimary>Add Result</Button>
        </>
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
