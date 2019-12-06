import React, { Component } from 'react';
import MyIngredientList from '../MyIngredientList'
import CreateMyIngredientForm from '../CreateMyIngredientForm'
// import EditCommentModal from '../EditCommentModal'

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

    // closeAndEdit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         console.log('sending new comment data to server:', this.state.commentToEdit)
    //         const editResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.state.commentToEdit.id, {
    //             method: 'PUT',
    //             credentials: 'include',
    //             body: JSON.stringify(this.state.commentToEdit),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         const editResponseParsed = await editResponse.json()

    //         if (editResponseParsed.status.code === 200) {
    //             console.log('editResponseParsed', editResponseParsed)
    //             const newCommentArrayWithEdit = this.state.comments.map((comment) => {
    //                 if (comment.id === editResponseParsed.data.id) {
    //                     comment = editResponseParsed.data
    //                 }
    //                 return comment;
    //             })
    //             this.setState({
    //                 comments: newCommentArrayWithEdit,
    //                 showEditModal: false
    //             })
    //         } else {
    //             alert(editResponseParsed.status.message);
    //             this.setState({
    //                 showEditModal: false
    //             })
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // openEditModal = (commentFromTheList) => {
    //     console.log('comment to edit:', commentFromTheList)
    //     this.setState({
    //         showEditModal: true,
    //         commentToEdit: { ...commentFromTheList }
    //     })
    // }

    // handleEditChange = (e) => {
    //     this.setState({
    //         commentToEdit: {
    //             ...this.state.commentToEdit,
    //             [e.currentTarget.name]: e.currentTarget.value
    //         }
    //     })
    // }



    render() {
        return (
            <React.Fragment>
                <MyIngredientList myIngredients={this.state.myIngredients} deleteMyIngredient={this.deleteMyIngredient} />
                <CreateMyIngredientForm addMyIngredient={this.addMyIngredient} />
                {/* <EditCommentModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} commentToEdit={this.state.commentToEdit} closeAndEdit={this.closeAndEdit} /> */}
            </React.Fragment>
        )
    }
}

export default MyIngredientContainer