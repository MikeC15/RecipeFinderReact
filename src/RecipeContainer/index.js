
import React from 'react'
import { Card, Header, Icon } from 'semantic-ui-react'


function RecipeContainer(props) {
    const eachIngredient = props.recipe.extendedIngredients.map((ingredient) => {
        return (
            <li>
                {ingredient.name}: {ingredient.measures.us.amount} {ingredient.measures.us.unitLong}
            </li>
        )
    })

    return (
        <React.Fragment>
            <Header as="h1">{props.recipe.title}</Header>
            <Header as="h3">Ingredient List</Header>
            {eachIngredient}
            <Header as="h3">Instructions</Header>
            {props.recipe.instructions}
            <br />
            <br />
            <img src={props.recipe.image} />
        </React.Fragment>
    )
}

export default RecipeContainer