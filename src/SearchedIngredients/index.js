import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import SearchedIngredientsList from '../SearchedIngredientsList'

export default class index extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => this.props.clearAndSearch()}>Search Recipes</Button>
                <SearchedIngredientsList search={this.props.search} />
            </div>
        )
    }
}
