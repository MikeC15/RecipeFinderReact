import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateComment extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
        }
    }
    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
        // this.setFlightId()
    }
    // setFlightId = () => {
    //     this.setState({ flight_number: this.props.mission.mission_id })
    // }
    render() {
        return (
            <Segment>
                <h5>Create Ingredient</h5>
                <Form onSubmit={(e) => this.props.addMyIngredient(e, this.state)}>
                    <Label>Ingredient Content:</Label>
                    <Form.Input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                    <Button type='Submit'>Create Ingredient</Button>
                </Form>
            </Segment>
        )
    }
}

export default CreateComment;