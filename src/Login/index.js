import React, { Component } from 'react'
import { Form, Label, Button, Message, Container } from 'semantic-ui-react';
import './style.css'


export default class Login extends Component {
    constructor() {
        super();
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
        const loginUrl = `${process.env.REACT_APP_API_URL}/auth/login`;
        const loginResponse = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(this.state),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const parsedResponse = await loginResponse.json();
        if (parsedResponse.status === 200) {
            console.log('Login successful');
            // this.props.history.push('/comments');
            this.setState({
                LoginMsg: "Logged In"
            });
            this.props.getIngredients()
        } else {
            this.setState({
                errorMsg: "Incorrect"
            });
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input size='mini' className="userLog" placeholder="username" type="username" name="username" onChange={this.handleChange} required />
                    <Form.Input size='mini' width="2px" placeholder="password" type="password" name="password" onChange={this.handleChange} required action={{
                        type: 'submit',
                        color: 'teal',
                        icon: 'search'
                    }} />
                    {this.state.errorMsg ? <Message size='mini' className="message" negative>{this.state.errorMsg}</Message> : null}
                    {this.state.LoginMsg ? <Message size='mini' className="message" positive>{this.state.LoginMsg}</Message> : null}
                </Form>
            </div>
        )
    }
}
