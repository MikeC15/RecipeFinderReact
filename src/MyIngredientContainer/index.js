import React, { Component } from 'react';
import MyIngredientList from '../MyIngredientList'
import CreateMyIngredientForm from '../CreateMyIngredientForm'
import EditIngredientModal from '../EditIngredientModal'

class MyIngredientContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myIngredients: [],
            myIngredient: null,
            showEditModal: false,
            myIngredientToEdit: {
                name: '',
                id: ''
            }
        }
    }

    componentDidMount() {
        this.setState({myIngredients: this.props.myIngredients})        
    }


    addMyIngredient = async (e, ingredientFromTheForm) => {
        e.preventDefault();
        console.log("INGREDIENT LIFTING UP FROM FORM", ingredientFromTheForm)
        try {
            const createdIngredientResponse = await fetch(process.env.REACT_APP_API_URL + '/myIngredients', {
                method: 'POST',
                body: JSON.stringify(ingredientFromTheForm),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const parsedResponse = await createdIngredientResponse.json();
            console.log(parsedResponse, ' this is response')
            this.setState({ myIngredients:parsedResponse.user.myIngredients})
            console.log(this.state.myIngredients)
        } catch (err) {
            console.log('error')
            console.log(err)
        }
    }

    deleteMyIngredient = async (id) => {
        console.log("THIS IS _ID PASSED UP FROM LIST:::", id)
        const deleteMyIngredientResponse = await fetch(process.env.REACT_APP_API_URL + '/myIngredients/' + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log("hi", deleteMyIngredientResponse)
        const deleteMyIngredientParsed = await deleteMyIngredientResponse.json();
        // console.log("DELETEINGREDIENTPARSED:::", deleteMyIngredientParsed)
        this.setState({ myIngredients: this.state.myIngredients.filter((ingredient) => ingredient._id !== id) })
        // console.log("STATE AFTER setting delete state:::", this.state.myIngredients)
    }

    closeAndEdit = async (e) => {
        e.preventDefault()
        try {
            // console.log('sending new ingredient data to server:', this.state.myIngredientToEdit)
            const editResponse = await fetch(process.env.REACT_APP_API_URL + '/myIngredients/' + this.state.myIngredientToEdit._id, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(this.state.myIngredientToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const editResponseParsed = await editResponse.json()
            // console.log('editResponseParsed::::', editResponseParsed)
            const newIngredientArrayWithEdit = this.state.myIngredients.map((ingredient) => {
                // console.log("ingredient::", ingredient)
                // console.log("editedresponse::", editResponseParsed)
                if (ingredient._id === editResponseParsed.user.myIngredients[0]._id) {
                    // console.log("success!")
                    ingredient = editResponseParsed.user.myIngredients[0]
                }
                return ingredient;
            })
            console.log("HERE:: ", newIngredientArrayWithEdit)
            this.setState({
                myIngredients: newIngredientArrayWithEdit,
                showEditModal: false
            })
        }catch (err) {
            console.log(err)
        }
    }

    openEditModal = (formFromTheList) => {
        console.log('food to edit:', formFromTheList)
        this.setState({
            showEditModal: true,
            myIngredientToEdit: { ...formFromTheList }
        })
    }

    handleEditChange = (e) => {
        this.setState({
            myIngredientToEdit: {
                ...this.state.myIngredientToEdit,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }



    render() {
        return (
            <React.Fragment>
                <MyIngredientList ingredientsToSearch={this.props.ingredientsToSearch} myIngredients={this.state.myIngredients} deleteMyIngredient={this.deleteMyIngredient} openEditModal={this.openEditModal} />
                <CreateMyIngredientForm addMyIngredient={this.addMyIngredient} />
                <EditIngredientModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} myIngredientToEdit={this.state.myIngredientToEdit} closeAndEdit={this.closeAndEdit} />
            </React.Fragment>
        )
    }
}

export default MyIngredientContainer