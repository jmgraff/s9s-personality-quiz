const { createRef, useState, useEffect } = wp.element;
const { Button, Card, CardHeader, CardBody, ToolbarButton, TabPanel, Icon, ToolbarGroup } = wp.components;
import { trash, chevronLeft, chevronRight, plus, edit } from '@wordpress/icons';

import ellipsize from 'ellipsize';

import QuizMediaUpload from './QuizMediaUpload.js';

export default function ItemTabs({items, itemName, onMoveLeft, onMoveRight, onAdd, onRemove, onMediaChange, renderItem }) {
    const [activeTabIndex, setActiveTabIndex] = useState(null);

    const itemTabs = items.map((item, ii) => {
        const ref = createRef();
        return ({
            name: ii,
            title: <div ref={ref}> {item.title ? ellipsize(item.title, 16) : `${itemName} ${ii + 1}`} </div>,
            item,
            ref
        })
    });

    const newTabTab = {
        name: 'new-tab',
        title: <Icon icon="plus" />
    }

    const tabs = [...itemTabs, newTabTab];

    useEffect(() => {
        if (activeTabIndex !== null && tabs[activeTabIndex] && tabs[activeTabIndex].ref) {
            tabs[activeTabIndex].ref.current.click();
            setActiveTabIndex(null);
        }
    }, [items]);

    const onSelectTab = (tabName) => {
        if (tabName === 'new-tab') {
            setActiveTabIndex(tabs.length - 1);
            onAdd();
        }
    }

    const onMoveTabLeft = (tab) => {
        setActiveTabIndex(tab.name - 1);
        onMoveLeft(tab.item);
    }

    const onMoveTabRight = (tab) => {
        setActiveTabIndex(tab.name + 1);
        onMoveRight(tab.item);
    }

    const onRemoveTab = (tab) => {
        const newIndex = tab.name <= 0 ? 0 : tab.name - 1;
        setActiveTabIndex(newIndex);
        onRemove(tab.item);
    }

    if (tabs.length > 1) {
        return (
            <TabPanel tabs={tabs} onSelect={onSelectTab} style={{overflow: 'scroll'}}>
                {(tab) => (
                    <Card>
                        <CardHeader style={{padding: 0, display: 'flex', justifyContent: 'flex-end'}}>
                            <ToolbarGroup style={{border: 0}}>
                                { onMoveLeft && onMoveRight &&
                                    <>
                                        <ToolbarButton icon={chevronLeft} label="Move left" onClick={() => onMoveTabLeft(tab)} />
                                        <ToolbarButton icon={chevronRight} label="Move right" onClick={() => onMoveTabRight(tab)} />
                                    </>
                                }
                                <ToolbarButton icon={trash} label="Remove" onClick={() => onRemoveTab(tab)} />
                            </ToolbarGroup>
                        </CardHeader>
                        <CardBody>
                            {tab.item && onMediaChange &&
                                <QuizMediaUpload
                                    onChange={url => onMediaChange(tab.item, url)}
                                    src={tab.item.image_url}
                                    width={'100%'}
                                    height={300} />
                            }
                            {tab.item && renderItem(tab.item)}
                        </CardBody>
                    </Card>
                )}
            </TabPanel>
        );
    } else {
        return (
            <Card>
                <CardBody style={{ height: '6em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button icon={plus} onClick={onAdd}>Add {itemName}</Button>
                </CardBody>
            </Card>
        )
    }
}
