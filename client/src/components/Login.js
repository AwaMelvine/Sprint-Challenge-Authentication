import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:3300/api';

class Login extends Component {
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
            const { data } = await axios.post(`${apiUrl}/login`, this.state);
            await localStorage.setItem('token', data.data);
            this.props.history.push('/');
        } catch (error) {
            alert('Invalid credentials');
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.submit}>
                    <div>
                        <input name="username" value={username} onChange={this.change} />
                    </div>
                    <div>
                        <input type="password" name="password" value={password} onChange={this.change} />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
