import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';


const StyledJokeDiv = styled.div`

    padding: 20px;
    width: 20%;

    p {
        padding: 10px;
        border: 1px solid #e0e0e0;
    }

`;

const apiUrl = 'http://localhost:3300/api';

class Jokes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jokes: []
        }
    }
    async componentDidMount() {
        try {
            const token = await localStorage.getItem('token');
            const { data } = await axios.get(`${apiUrl}/jokes`, { headers: { authorization: token } });
            this.setState({ jokes: data });
        } catch (error) {
            this.props.history.push('/login');
        }

    }
    render() {
        return (
            <StyledJokeDiv>
                <h2>Jokes</h2>
                {this.state.jokes && this.state.jokes.map(joke => <p key={joke.id}>{joke.joke}</p>)}
            </StyledJokeDiv>
        )
    }
}

export default Jokes;
