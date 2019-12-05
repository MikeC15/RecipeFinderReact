import React from 'react';
import './App.css';
import { Grid, Image, Container, Segment } from 'semantic-ui-react'
import HeaderComponent from './HeaderComponent/index'
import MyIngredientContainer from './MyIngredientContainer'
import "semantic-ui-css/semantic.min.css"

function App() {
  return (
    <div className="App">
      <HeaderComponent />

      <Grid columns='equal' className="mainPage">
        <Grid.Row stretched className="stretched">
          <Grid.Column>
            <Segment>1</Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched className="stretched">
          <Grid.Column className="bottomPage">
            <Segment><MyIngredientContainer /></Segment>
          </Grid.Column>
          <Grid.Column className="bottomPage">
            <Segment>2</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  );
}

export default App;
