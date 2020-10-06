import ellipsize from 'ellipsize';

import { connect } from 'react-redux';

import { TextControl, Button, Card, CardBody, CardHeader, CardFooter, Toolbar, ToolbarButton, SelectControl,
    TabPanel, IconButton, DropdownMenu , MenuItem, MenuGroup } from '@wordpress/components';
import { moreVertical, trash, arrowLeft, arrowRight } from '@wordpress/icons';
import { getAnswers, remove, add, setTitle, up, down, setImageURL, setResultID } from './store-answers.js';
import { getResults } from './store-results.js';

function Answers({question_id, results, answers, remove, add, setTitle, up, down, setImageURL, setResultID}) {
    const tabs = answers.map((a,i) => ({
        name: i,
        title: a.title ? ellipsize(a.title, 16) : `Answer ${i + 1}`,
        answer: a
    }));

    const resultOptions = results.map((r) => {
        return { value: r.id, label: r.title };
    });

    resultOptions.unshift({ value: '', label: 'None' });

    return (
        <>
            <TabPanel tabs={ tabs }>
                {(tab) => (
                    <Card style={{position:'relative'}}>
                        <Toolbar style={{top: 0, right: 0, border: 0, position: 'absolute'}}>
                            <DropdownMenu icon={moreVertical}>
                                {({onClose}) => (
                                    <>
                                        <MenuGroup>
                                            <MenuItem icon={arrowLeft} onClick={() => up(tab.name)}>
                                                Move Left
                                            </MenuItem>
                                            <MenuItem icon={arrowRight} onClick={() => down(tab.name)}>
                                                Move Right
                                            </MenuItem>
                                        </MenuGroup>
                                        <MenuGroup>
                                            <MenuItem icon={trash} onClick={() => remove(tab.answer.id)}>
                                                Remove Answer
                                            </MenuItem>
                                        </MenuGroup>
                                    </>
                                )}
                            </DropdownMenu>
                        </Toolbar>
                        <CardBody>
                            <TextControl
                                label="Answer Text"
                                value={tab.answer.title}
                                onChange={val => setTitle(tab.answer.id, val)}
                            />
                            <SelectControl
                                label="Associated Result"
                                value={tab.answer.result_id}
                                options={resultOptions}
                                onChange={val => setResultID(tab.answer.id, val)}
                            />
                        </CardBody>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={e => add(question_id)} isPrimary>&#43; Add Answer</Button>
        </>
    );
}

const mapStateToProps = (state, ownProps) => ({
    answers: getAnswers(state, ownProps.question_id),
    results: getResults(state)
});
export default connect(mapStateToProps, {remove, add, setTitle, up, down, setImageURL, setResultID})(Answers);
