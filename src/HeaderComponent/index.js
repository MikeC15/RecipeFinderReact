import React, {Component} from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Login from '../Login'
import Register from '../Register'
import MyIngredientContainer from '../MyIngredientContainer'
import './style.css'

export default class HeaderComponent extends Component {
    constructor() {
    super()
        this.state = {
            myIngredients: [],
            isLogged: false,
            registered: false
        }
    }

    getMyIngredients = async () => {
        try {
            const myIngredients = await fetch(process.env.REACT_APP_API_URL + '/myIngredients', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const parsedIngredients = await myIngredients.json();
            console.log(parsedIngredients);
            this.setState({
                myIngredients: parsedIngredients,
                isLogged: true
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* Header Grid */}
                <Segment className='bigContainer'>
                    <Grid padded>
                        <Grid.Column className='headerContainer' width={4}>
                            <Icon name="food" size="large" />
                            <Icon name="find" flipped="vertically" size="large" />
                        </Grid.Column>
                        <Grid.Column className='headerContainer' width={7}>
                            <Header className="headerMargin">RecipeFinder</Header>
                            <p onClick={() => {this.setState({ registered: false }) }} className="loginP">Login</p>
                            <p onClick={() => { this.setState({ registered: true }) }} className="loginP">Register</p>
                        </Grid.Column>
                        <Grid.Column className="loginContainer" width={5}>
                            {this.state.registered ? <Register getIngredients={this.getMyIngredients} /> : <Login getIngredients={this.getMyIngredients} />}
                        </Grid.Column>
                    </Grid>
                </Segment>
                {/* Body Grid */}
                <Grid columns='equal' className="mainPage">
                    <Grid.Row stretched className="stretched">
                        <Grid.Column>
                            <Segment>
                                1
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row stretched className="stretched">
                        <Grid.Column className="bottomPage">
                            <Segment>
                                {this.state.isLogged ? <MyIngredientContainer myIngredients={this.state.myIngredients} /> : "HI"}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column className="bottomPage">
                            <Segment>
                                2
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
    
}
