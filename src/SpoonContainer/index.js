import React from 'react'
import { Card, Header, Icon } from 'semantic-ui-react'



function SpoonContainer(props) {
    const eachRecipe = props.recipes.map((recipe) => {
        return(
            <Card
                onClick={() => props.getOneRecipe(recipe.id)} 
                image = {recipe.image}
                header = {recipe.title}
                extra={
                    <a>
                        <Icon name='thumbs up outline' />
                        {recipe.likes}
                    </a>
                }
            />
        )
    })    

    return (
        <React.Fragment>
            <Header as="h3">Searched Recipes</Header>
            <Card.Group itemsPerRow={2}>
                {eachRecipe}
            </Card.Group>
        </React.Fragment>
    )
}

export default SpoonContainer