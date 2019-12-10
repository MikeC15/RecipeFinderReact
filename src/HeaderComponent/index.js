import React, {Component} from 'react';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Login from '../Login'
import Register from '../Register'
import SpoonContainer from '../SpoonContainer'
import RecipeContainer from '../RecipeContainer'
import MyIngredientContainer from '../MyIngredientContainer'
import SearchedIngredients from '../SearchedIngredients'
import './style.css'

export default class HeaderComponent extends Component {
    constructor() {
    super()
        this.state = {
            recipes: [],
            myIngredients: [],
            isLogged: false,
            registered: false,
            search: [],
            searchFixed: '',
            showOneRecipe: false,
            oneRecipe: {}
        }
    }
    //my API
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
                myIngredients: parsedIngredients.user.myIngredients,
                isLogged: true
            })
        } catch (err) {
            console.log(err);
        }
    }

    // componentDidMount=()=>{
    //     this.getRecipes()
    // }

    //Spoon api
    getRecipes = async (ingredient) => {
        try {
            // console.log("ingredient isnide getrecipe", ingredient)
            // const recipes = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&number=2&apiKey=3074b56566d24e71ad9b96aab7728234')
            const recipes = await fetch('https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + ingredient + '&number=10&apiKey=3074b56566d24e71ad9b96aab7728234')
            const parsedRecipes = await recipes.json()
            // console.log('PARSEDRECIPES INSIDE getRecipes():::', parsedRecipes)
            this.setState({
                recipes: parsedRecipes
            })
            // console.log("state.recipes inside getRecipes()", this.state.recipes)
        } catch (err) {
            console.log(err)
        }
    }

    ingredientsToSearch = (liftedIngredient) => {
        console.log(liftedIngredient)
        this.state.search.push(liftedIngredient)
        this.setState({
            search: this.state.search
        })
        //DO SOMETHING WITH THIS.STATE.SEARCH TO PLUG INTO API SEARCH
    }

    fixSearch = (search) => {
        //sterilizes array for fetch query
        console.log("search passed into fixSearch", search)
        let string = '';
        for(let i = 0; i < search.length; i++){
            if (i === search.length - 1){
                string += search[i]
                console.log("string", string)
                return string
            }
            string = string + search[i] + ",+"
        }
    }

    clearAndSearch = () => {
        console.log("this.state.search", this.state.search)
        let fixSearchResult = this.fixSearch(this.state.search)
        // console.log('FIXEDSTRING???', fixSearchResult)
        this.getRecipes(fixSearchResult)
        // CHANGE THIS ARRAY (THIS.STATE.SEARCH) INTO A STERILIZED STRING FOR API CALL
        this.setState({
            search: [],
            showOneRecipe: false
        })
    }

    // liftRecipe = (liftedId) => {
    //     console.log("lifted ID:: ", liftedId)
    //     this.setState({
    //         showOneRecipe: true
    //     })
    // }

    getOneRecipe = async (recipeId) => {
        try {
            // console.log("searched recipe id", recipeId)
            const recipe = await fetch('https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=3074b56566d24e71ad9b96aab7728234')
            const parsedRecipe = await recipe.json()
            // console.log('PARSEDRECIPE INSIDE getOneRecipe():::', parsedRecipe)
            this.setState({
                oneRecipe: parsedRecipe,
                showOneRecipe: true
            })
            console.log("RECIPE:", this.state.oneRecipe)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* Header Grid */}
                <Segment className='bigContainer'>
                    <Grid padded>
                        <Grid.Column className='headerContainer' width={4}>
                            <Icon name="food" size="big" />
                            <Icon name="find" flipped="vertically" size="big" />
                        </Grid.Column>
                        <Grid.Column className='headerContainer' width={8}>
                            <Header as="h1" className="headerMargin">RecipeFinder</Header>
                            <p onClick={() => {this.setState({ registered: false }) }} className="loginP">Login</p>
                            <p onClick={() => { this.setState({ registered: true }) }} className="loginP">Register</p>
                        </Grid.Column>
                        <Grid.Column className="loginContainer" width={4}>
                            {this.state.registered ? <Register getIngredients={this.getMyIngredients} /> : <Login getIngredients={this.getMyIngredients} />}
                        </Grid.Column>
                    </Grid>
                </Segment>
                {/* Body Grid */}
                <Grid columns='equal' className="mainPage">
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment className="mainSegment">
                                {this.state.showOneRecipe ? <RecipeContainer recipe={this.state.oneRecipe} /> : <SpoonContainer recipes={this.state.recipes} getOneRecipe={this.getOneRecipe} />}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row stretched>
                        <Grid.Column style={{ overflow: 'auto', maxHeight: 600, paddingRight: 0}}>
                            <Segment >
                                <Header as="h3" >Choose Favorite Ingredients</Header>
                                {this.state.isLogged ? <MyIngredientContainer ingredientsToSearch={this.ingredientsToSearch} getIngredients={this.getMyIngredients} myIngredients={this.state.myIngredients} /> : <Header as="h3" >Login To Search Recipes</Header>}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column className="bottomPage">
                            <Segment>
                                <Header as="h3" >Search By These Ingredients</Header>
                                <SearchedIngredients clearAndSearch={this.clearAndSearch} search={this.state.search} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        )
    }
    
}
