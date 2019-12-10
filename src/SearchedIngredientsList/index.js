import React from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';

function SearchedIngredientsList(props) {
    const searched = props.search.map((ingredient) => {
        return (
            <Segment>
                <Header as='h2' >
                    {ingredient}
                </Header>
            </Segment>
        )
    })

    return (
        <React.Fragment>
            {searched}
        </React.Fragment>
    )
}

export default SearchedIngredientsList