import React, { Component } from 'react';
// import CommentList from '../CommentList'
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
            // if (parsedResponse.status.code === 201) {
            this.setState({ myIngredients:parsedResponse.user.myIngredients})
            console.log(this.state.myIngredients)
            // } else {
            //     alert("You must be logged in to comment")
            // }
        } catch (err) {
            console.log('error')
            console.log(err)
        }
    }

    // deleteComment = async (id) => {
    //     // console.log(id)
    //     const deleteCommentResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + id, {
    //         method: 'DELETE',
    //         credentials: 'include'
    //     });
    //     const deleteCommentParsed = await deleteCommentResponse.json();
    //     console.log(deleteCommentParsed)
    //     if (deleteCommentParsed.status.code === 200) {
    //         console.log(deleteCommentParsed, ' response from Flask server')
    //         this.setState({ comments: this.state.comments.filter((comment) => comment.id !== id) })
    //     } else {
    //         alert(deleteCommentParsed.status.message);
    //     }
    // }

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
                {/* <CommentList mission={this.props.mission} deleteComment={this.deleteComment} comments={this.state.comments} openEditModal={this.openEditModal} /> */}
                <CreateMyIngredientForm addMyIngredient={this.addMyIngredient} />
                {/* <EditCommentModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} commentToEdit={this.state.commentToEdit} closeAndEdit={this.closeAndEdit} /> */}
            </React.Fragment>
        )
    }
}

export default MyIngredientContainer