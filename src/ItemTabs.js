import { Button, Card, CardBody, Toolbar, TabPanel, DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { moreVertical, trash, arrowLeft, arrowRight, plus } from '@wordpress/icons';

import ellipsize from 'ellipsize';

export default function ItemTabs({items, itemName, onMoveLeft, onMoveRight, onAdd, onRemove, renderItem, renderEmpty}) {
    const itemTabs = items.map((item, ii) => ({
        name: ii,
        title: item.title ? ellipsize(item.title, 16) : `${itemName} ${ii + 1}`,
        item
    }));

    const newTabTab = {
        name: 'new-tab',
        title: <Button icon={plus} onClick={(e) => {
            e.stopPropagation();
            onAdd(); }
        } />
    }

    const tabs = [...itemTabs, newTabTab];

    if (tabs.length > 1) {
        return (
            <TabPanel tabs={ tabs }>
                {(tab) => (
                    <Card style={{position: 'relative'}}>
                        <Toolbar style={{top: 0, right: 0, border: 0, position: 'absolute'}}>
                            <DropdownMenu icon={moreVertical}>
                                {({onClose}) => (
                                    <>
                                        <MenuGroup>
                                            <MenuItem icon={arrowLeft} onClick={() => onMoveLeft(tab.item)}>
                                                Move Left
                                            </MenuItem>
                                            <MenuItem icon={arrowRight} onClick={() => onMoveRight(tab.item)}>
                                                Move Right
                                            </MenuItem>
                                        </MenuGroup>
                                        <MenuGroup>
                                            <MenuItem icon={trash} onClick={() => onRemove(tab.item)}>
                                                Remove {itemName}
                                            </MenuItem>
                                        </MenuGroup>
                                    </>
                                )}
                            </DropdownMenu>
                        </Toolbar>
                        <CardBody>
                            {renderItem(tab.item)}
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
