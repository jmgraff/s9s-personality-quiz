const { TextControl, TextareaControl, Button, Card, CardBody, CardHeader, CardFooter,
    ButtonGroup, TabPanel } = wp.components;

import ellipsize from 'ellipsize';

import { getResults, add, remove, setTitle, setDescription, setImageURL } from './store-results.js';
import { connect } from 'react-redux';

function Results({ results, add, remove, setTitle, setDescription, setImageURL }) {
    const tabs = results.map((r,i) => ({
        name: i,
        title: r.title ? ellipsize(r.title, 16) : `Result ${i + 1}`,
        result: r
    }));

    return (
        <>
            <TabPanel tabs={ tabs }>
                { (tab) => (
                    <Card>
                        <CardBody>
                            <TextControl
                                label="Result Title"
                                onChange={ val => setTitle(tab.result.id, val) }
                                value={ tab.result.title }
                            />
                            <TextareaControl
                                label="Result Description"
                                onChange={ val => setDescription(tab.result.id, val) }
                                value={ tab.result.description }
                            />
                        </CardBody>
                        <CardFooter>
                            <Button
                                onClick={ () => remove(tab.result.id) }
                                isDestructive
                            >
                                Delete Result
                            </Button>
                        </CardFooter>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={ add } isPrimary>Add Result</Button>
        </>
    );
}

const mapStateToProps = (state) => ({ results: getResults(state) });
export default connect(mapStateToProps, { remove, add, setTitle, setDescription, setImageURL })(Results);
