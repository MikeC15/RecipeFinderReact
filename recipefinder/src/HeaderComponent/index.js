import React, {Component} from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Login from '../Login'
import Register from '../Register'
import './style.css'

export default class HeaderComponent extends Component {
    constructor() {
    super()
        this.state = {
            isLogged: false,
            registered: false
        }
    }
    
    render() {
        return (
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
                        {this.state.registered ? <Register /> : <Login />}
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
    
}
