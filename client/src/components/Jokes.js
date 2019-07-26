import React, { Component } from 'react'
import axios from 'axios';

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
            <div>
                <h2>Jokes</h2>
                {this.state.jokes && this.state.jokes.map(joke => <p>{joke.joke}</p>)}
            </div>
        )
    }
}

export default Jokes;
