import React, { Component } from 'react';
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
            <StyledAuthDiv>
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
            </StyledAuthDiv>
        )
    }
}

export default Register;
