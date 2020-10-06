import { Button, ButtonGroup } from '@wordpress/components';
const { MediaUpload } = wp.blockEditor;

export default function QuizMediaUpload({onChange, imgSrc}) {
    const renderControls = ({open}) => {
        if (imgSrc) {
            return (
                <div>
                    <img src={imgSrc} />
                    <ButtonGroup>
                        <Button onClick={open}>
                            Change Image
                        </Button>
                        <Button onClick={() => onChange('')}>
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
        <MediaUpload
            onSelect={media => onChange(media.url)}
            render={renderControls}
        />
    );

}

