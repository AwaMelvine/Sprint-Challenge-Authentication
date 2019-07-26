import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:3300/api';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'Awa',
            password: 'mel'
        };
    }

    change = e => this.setState({ [e.target.name]: e.target.value })

    submit = async e => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/register`, this.state);
            this.props.history.push('/');
        } catch (error) {
            alert('Failed to register');
        }

    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.submit}>
                    <div>
                        <input name="username" value={username} onChange={this.change} />
                    </div>
                    <div>
                        <input type="password" name="password" value={password} onChange={this.change} />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;
