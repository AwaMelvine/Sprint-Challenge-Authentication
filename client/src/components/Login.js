import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

const apiUrl = 'http://localhost:3300/api';

const StyledAuthDiv = styled.div`

    width: 20%;
    padding: 20px;

    h2 { text-align: center; }

    form {
        width: 100%;

        input {
            width: 100%;
            font-size: 1.2rem;
            padding: 5px 10px;
            outline: none;
            margin-bottom: .5rem;
            border-radius: 5px;
            border: 1px solid #e0e0e0;
        }
        button {
            width: 100%;
            padding: 10px;
            background: blueviolet;
            border: 1px solid transparent;  
            font-size: 1.1rem;
            color: white;
            border-radius: 5px; 
        }

    }

`;


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
            <StyledAuthDiv>
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
            </StyledAuthDiv>
        )
    }
}

export default Login;
