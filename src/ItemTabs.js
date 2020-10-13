const { createRef, useState, useEffect } = wp.element;
import { Button, Card, CardHeader, CardBody, Placeholder, Toolbar, TabPanel, DropdownMenu, MenuGroup, MenuItem, Icon } from '@wordpress/components';
import { moreVertical, trash, arrowLeft, arrowRight, plus } from '@wordpress/icons';

import ellipsize from 'ellipsize';

export default function ItemTabs({items, itemName, onMoveLeft, onMoveRight, onAdd, onRemove, renderItem, renderEmpty}) {
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
        console.log(`${itemName}s: tabs: `, tabs);
        if (activeTabIndex !== null && tabs[activeTabIndex] && tabs[activeTabIndex].ref) {
            console.log(`${itemName}s: Attempting to click tab index `, activeTabIndex);
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
        console.log(`Setting current ${itemName} index to: `, tab.name - 1);
        setActiveTabIndex(tab.name - 1);
        onMoveLeft(tab.item);
    }

    const onMoveTabRight = (tab) => {
        console.log(`Setting current ${itemName} index to: `, tab.name + 1);
        setActiveTabIndex(tab.name + 1);
        onMoveRight(tab.item);
    }

    const onRemoveTab = (tab) => {
        const newIndex = tab.name <= 0 ? 0 : tab.name - 1;
        console.log(`Setting current ${itemName} index to: `, newIndex);
        setActiveTabIndex(newIndex);
        onRemove(tab.item);
    }

    if (tabs.length > 1) {
        return (
            <TabPanel tabs={ tabs } onSelect={onSelectTab}>
                {(tab) => (
                    <Card>
                        <CardHeader style={{padding: 0, display: 'flex', justifyContent: 'right'}}>
                            <div>
                                <Toolbar style={{border: 0}}>
                                    <DropdownMenu icon={moreVertical}>
                                        {({onClose}) => (
                                            <>
                                                { onMoveLeft && onMoveRight &&
                                                    <MenuGroup>
                                                        <MenuItem icon={arrowLeft} onClick={() => onMoveTabLeft(tab)}>
                                                            Move Left
                                                        </MenuItem>
                                                        <MenuItem icon={arrowRight} onClick={() => onMoveTabRight(tab)}>
                                                            Move Right
                                                        </MenuItem>
                                                    </MenuGroup>
                                                }
                                                <MenuGroup>
                                                    <MenuItem icon={trash} onClick={() => onRemoveTab(tab)}>
                                                        Remove {itemName}
                                                    </MenuItem>
                                                </MenuGroup>
                                            </>
                                        )}
                                    </DropdownMenu>
                                </Toolbar>
                            </div>
                        </CardHeader>
                        <CardBody>
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
                    <Button isPrimary onClick={onAdd} style={{padding: '2em'}}>Add {itemName}</Button>
                </CardBody>
            </Card>
        )
    }
}
