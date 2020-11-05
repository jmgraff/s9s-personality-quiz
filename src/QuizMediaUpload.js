import { Button, ToolbarGroup, ToolbarButton, TextControl, Popover } from '@wordpress/components';
import { image, trash, edit, link } from '@wordpress/icons';

const { MediaUpload } = wp.blockEditor;
const { useState } = wp.element;

export default function QuizMediaUpload({src, width, height, onChange}) {
    if (src) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <img src={src} style={{ maxWidth: width, maxHeight: height, width: 'auto', height: 'auto', display: 'block' }} />
                    <ToolbarGroup style={{border: 0, display: 'flex', justifyContent: 'center'}}>
                        <ToolbarButton icon={trash} label="Remove image" onClick={() => onChange('')} />
                        <MediaUpload onSelect={media => onChange(media.url)}
                            render={({open}) => <ToolbarButton label="Change image" icon={edit} onClick={open} />}
                        />
                    </ToolbarGroup>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{ width, height, border: '2px dashed gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MediaUpload
                        onSelect={media => onChange(media.url)}
                        render={({open}) => <Button icon={image} onClick={open}>Choose Image</Button>}
                    />
                </div>
            </div>
        );
    }
}

