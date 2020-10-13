import { Button, Toolbar, ToolbarButton } from '@wordpress/components';
import { image, trash, edit } from '@wordpress/icons';

const { MediaUpload } = wp.blockEditor;

export default function QuizMediaUpload({src, width, height, onChange}) {
    const renderControls = ({open}) => (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{ width, height, border: '2px dashed gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button onClick={open} icon={image} style={{ padding: '2em' }}>
                    Choose Image
                </Button>
            </div>
        </div>
    );

    if (src) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <img src={src} style={{ maxWidth: width, maxHeight: height, width: 'auto', height: 'auto', display: 'block' }} />
                    <Toolbar style={{border: 0, display: 'flex', justifyContent: 'center'}}>
                        <ToolbarButton icon={trash} onClick={() => onChange('')} />
                        <MediaUpload onSelect={media => onChange(media.url)}
                            render={({open}) => <ToolbarButton label="Change image" icon={edit} onClick={open} />} />
                    </Toolbar>
                </div>
            </div>
        );

    } else {
        return <MediaUpload onSelect={media => onChange(media.url)} render={renderControls} />;
    }
}

