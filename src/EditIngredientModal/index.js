import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';


const EditCommentModal = (props) => {
    // console.log("PROPS::", props)
    return (
        <Modal open={props.open}>
            <Header>Edit Ingredient</Header>
            <Modal.Content>
                <Form onSubmit={props.closeAndEdit}>
                    <Label>
                        Name:
                    </Label>
                    <Form.Input type='text' name='name' value={props.myIngredientToEdit.name} onChange={props.handleEditChange} />
                    <Modal.Actions>
                        <Button color='green' type='submit'>Edit Ingredient</Button>
                    </Modal.Actions>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default EditCommentModal;