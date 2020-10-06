import { connect } from 'react-redux';
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, TextareaControl, TextControl, Toolbar,
    TabPanel, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { moreVertical, trash, arrowLeft, arrowRight } from '@wordpress/icons';

const { useState } = wp.element;

import ellipsize from 'ellipsize';
import arrayMove from 'array-move';

import Answers from './Answers.js';
import QuizMediaUpload from './QuizMediaUpload.js';

import { getQuestions, remove, add, setIndex, setTitle, setImageURL } from './store-questions.js';

function Questions({questions, remove, add, setIndex, setTitle, setImageURL}) {
    let tabs = questions.map((q,ii) => ({
        name: ii,
        title: q.title ? ellipsize(q.title, 16) : `Question ${ii + 1}`,
        question: q
    }));

    tabs.sort((a,b) => a.question.index - b.question.index);

    // move tab at index ii to index jj
    const moveTab = (ii,jj) => {
        if (jj > tabs.lenght) {
            jj = tabs.length -1;
        }

        if (jj < 0) {
            jj = 0;
        }

        console.log(`Moving tab at index ${ii} to ${jj}`);
        tabs = arrayMove(tabs, ii, jj);
        tabs.forEach((t,ii) => {
            setIndex(t.question.id, ii);
        });
        tabs.sort((a,b) => a.question.index - b.question.index);
    }

    const moveTabLeft = index => moveTab(index, index - 1);
    const moveTabRight = index => moveTab(index, index + 1);

    return (
        <>
            <TabPanel tabs={ tabs }>
                {(tab) => (
                    <Card style={{position: 'relative'}}>
                        <Toolbar style={{top: 0, right: 0, border: 0, position: 'absolute'}}>
                            <DropdownMenu icon={moreVertical}>
                                {({onClose}) => (
                                    <>
                                        <MenuGroup>
                                            <MenuItem icon={arrowLeft} onClick={() => moveTabLeft(tab.question.index)}>
                                                Move Left
                                            </MenuItem>
                                            <MenuItem icon={arrowRight} onClick={() => moveTabRight(tab.question.index)}>
                                                Move Right
                                            </MenuItem>
                                        </MenuGroup>
                                        <MenuGroup>
                                            <MenuItem icon={trash} onClick={() => remove(tab.question.id)}>
                                                Remove Question
                                            </MenuItem>
                                        </MenuGroup>
                                    </>
                                )}
                            </DropdownMenu>
                        </Toolbar>
                        <CardBody>
                            <TextControl
                                label="Question Title"
                                onChange={ val => setTitle(tab.question.id, val) }
                                value={ tab.question.title }
                            />
                            <QuizMediaUpload
                                imgSrc={ tab.question.image_url }
                                onChange={ (url) => setImageURL(tab.question.id, url) }
                            />
                            <Answers question_id={ tab.question.id } />
                        </CardBody>
                    </Card>
                )}
            </TabPanel>
            <Button onClick={ e => add() } isPrimary>&#43; Add Question </Button>
        </>
    );
}

const mapStateToProps = state => ({ questions: getQuestions(state) });
export default connect(mapStateToProps, {remove, add, setIndex, setTitle, setImageURL})(Questions);
