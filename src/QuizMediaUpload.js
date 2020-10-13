import { Button, ButtonGroup, Placeholder, Toolbar, DropdownMenu, MenuItem, MenuGroup, Tooltip } from '@wordpress/components';
import { image, trash, edit } from '@wordpress/icons';

const { MediaUpload } = wp.blockEditor;

export default function QuizMediaUpload({onChange, imgSrc}) {
    const renderControls = ({open}) => {
        if (imgSrc) {
            return (
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
                        <DropdownMenu icon={edit} tooltipText="Image Options">
                            {({onClose}) => (
                                <>
                                    <MenuGroup>
                                        <MenuItem icon={image} onClick={open}>
                                            Change Image
                                        </MenuItem>
                                    </MenuGroup>
                                    <MenuGroup>
                                        <MenuItem icon={trash} onClick={() => onChange('')}>
                                            Remove Image
                                        </MenuItem>
                                    </MenuGroup>
                                </>
                            )}
                        </DropdownMenu>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <img src={imgSrc} style={{ maxWidth: '250px', maxHeight: '150px', width: 'auto', height: 'auto', display: 'block' }} />
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ height: '6em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={open} icon={image} style={{ padding: '2em' }}>
                        Set Image
                    </Button>
                </div>
            );
        }
    }

    return (
        <MediaUpload
            onSelect={media => onChange(media.url)}
            render={renderControls}
        />
    );
}

