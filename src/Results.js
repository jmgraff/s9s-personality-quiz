const { TextControl, TextareaControl, Button, Card, CardBody, CardHeader, CardFooter,
    ButtonGroup, TabPanel } = wp.components;
const { MediaUpload } = wp.blockEditor;

import ellipsize from 'ellipsize';

import { getResults, add, remove, setTitle, setDescription, setImageURL } from './store-results.js';
import { connect } from 'react-redux';


function Results({ results, add, remove, setTitle, setDescription, setImageURL }) {
    const tabs = results.map((r,i) => ({
        name: i,
        title: r.title ? ellipsize(r.title, 16) : `Result ${i + 1}`,
        result: r
    }));
    const renderMediaUpload = (open, result) => {
        if (result.image_url) {
            return (
                <div>
                    <img src={result.image_url} />
                    <ButtonGroup>
                        <Button onClick={open}>
                            Change Image
                        </Button>
                        <Button onClick={() => setImageURL(result.id, '')}>
                            Remove Image
                        </Button>
                    </ButtonGroup>
                </div>
            );
        } else {
            return (
                <Button onClick={open}>
                    Set Image
                </Button>
            );
        }
    }

    return (
        <>
            <TabPanel tabs={ tabs }>
                {(tab) => (
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
                            <MediaUpload
                                onSelect={ media => setImageURL(tab.result.id, media.url) }
                                render={({open}) => renderMediaUpload(open, tab.result) }
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
