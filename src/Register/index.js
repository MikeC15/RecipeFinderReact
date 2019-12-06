import React, { Component } from 'react'
import { Form, Label, Button, Message, Container } from 'semantic-ui-react';
import '../Login/style.css'


export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const registrationUrl = `${process.env.REACT_APP_API_URL}/auth/registration`;
        const registerResponse = await fetch(registrationUrl, {
            method: 'POST',
            body: JSON.stringify(this.state),
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedResponse = await registerResponse.json();
        if (parsedResponse.status === 201) {
            console.log('Sign up successful');
            // this.props.history.push('/comments');
            this.setState({
                RegisterMsg: "Login after Register"
            });
            // this.props.getIngredients()
        } else {
            this.setState({
                errorMsg: "error registering"
            });
        }
    }

    render() {
        return (
            <div> 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input size='mini' className="userLog" placeholder="email" type="email" name="email" onChange={this.handleChange} required />
                        <Form.Input size='mini' className="userLog" placeholder="username" type="username" name="username" onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Input size='mini' width="2px" placeholder="password" type="password" name="password" onChange={this.handleChange} required action={{
                        type: 'submit',
                        color: 'teal',
                        icon: 'search'
                    }} />
                    {this.state.errorMsg ? <Message size='mini' className="message" negative>{this.state.errorMsg}</Message> : null}
                    {this.state.RegisterMsg ? <Message size='mini' className="message" positive>{this.state.RegisterMsg}</Message> : null}
                </Form>
            </div>
        )
    }
}
