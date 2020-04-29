import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import { setCookie, getCookie } from '../../services/cookies';

class App extends Component {
    state = {
        enteredCreature: '',
        favoriteCreature: '',
        isEditable: true,
    }

    getCreature() {
        axios.get('/api/creature')
            .then((response) => {
                this.setState({
                    favoriteCreature: response.data.fantasticCreature,
                });
            })
            .catch((err) => {
                console.warn(err);
            });
    }

    postCreature(creatureData) {
        axios.post('/api/creature', {
            fantasticCreature: creatureData
        })
            .then((response) => {
               this.getCreature();
            })
            .catch((err) => {
                console.warn(err);
            });
    }

    componentDidMount() {
        // const favoriteCreature = getCookie('favoriteCreature');

        // this.setState({
        //     favoriteCreature,
        // });
        this.getCreature();
    }

    changeFavoriteAnimal = (event) => {
        this.setState({
            enteredCreature: event.target.value,
        });
    }

    saveCreature = (event) => {
        // setCookie('favoriteCreature', this.state.enteredCreature);
        this.postCreature(this.state.enteredCreature);

        this.setState({
            favoriteCreature: this.state.enteredCreature,
            enteredCreature: '',
        });
    }

    editCreature = (event) => {
        this.setState({
            isEditable: true,
        });
    }

    //
    // API Calls
    // ------------------------------------------------------------

    render() {
        let editRegion = <div className="container">
            <label className="formField">
                <div>Favorite Fantastic Creature:</div>
                <input
                    type="text"
                    placeholder="Animal"
                    value={this.state.enteredCreature}
                    onChange={this.changeFavoriteAnimal}
                />
            </label>
            <button onClick={this.saveCreature}>Save My Creature</button>
        </div>;
        let myCreature = <h3>You have not chosen a Favorite Creature</h3>;

        if (this.state.favoriteCreature != null
            && this.state.favoriteCreature.length > 0
        ) {
            myCreature = <h3>Your Favorite Creature: {this.state.favoriteCreature}</h3>
        }

        if (!this.state.isEditable) {
            editRegion = <div className="container">
                {this.state.favoriteCreature} <button onClick={this.editCreature}>EDIT</button>
            </div>

        }

        return (
            <div>
                <div className="headerBar">
                    <h1>Browser Cookies</h1>
                    {myCreature}
                </div>

                {editRegion}
            </div>
        );
    }
}

export default App;
