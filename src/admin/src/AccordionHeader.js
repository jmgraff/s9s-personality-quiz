import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

export default function AccordionHeader(props) {
    const size = props.size ? props.size : 'small';

    const Control = (props) => {
        if (props.f) {
            return (
                <Button size={size} as='a' onClick={e => props.f(props.arg)}>{props.children}</Button>
            );
        }
        return (
            <></>
        );
    };

    return (
        <Grid columns={2}>
            <Grid.Column>
                <Header as={props.as ? props.as : 'h3'}>{props.name} {props.index + 1}: {props.title}</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
                <Button.Group  size={size} basic>
                    <Control f={props.up} arg={props.index}>&#9650; Move Up</Control>
                    <Control f={props.down} arg={props.index}>&#9660; Move Down</Control>
                    <Control f={props.remove} arg={props.id}>&times; Delete</Control>
                </Button.Group>
            </Grid.Column>
        </Grid>
    );
}
