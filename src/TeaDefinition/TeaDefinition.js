import React, { Component } from  'react';
import PropTypes from 'prop-types';
import TeaClippingsContext from '../TeaClippingsContext';
import './TeaDefinition.css';
import { Link } from 'react-router-dom';
import seedrandom from 'seedrandom';

//Welcome to one of the most important pieces of Mr. TeaSeeks. User choice is important, because not all teas are equal, and we want something different at a different time of day.
//This component is what allows users to select the type of tea they are looking for, and a matching tea is then chosen from our archive of teaclippings. 

class TeaDefinition extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = TeaClippingsContext;

  state = {
    error: null,
    id: '',
    validTeaTypes: ['Black', 'Green', 'Chai', 'Herbal', 'Pu-Erh'],
    validCaffeineTypes:['High', 'Low'],
    validTasteTypes: ['Strong', 'Light'],
    teaTypeSelected: '' || localStorage.getItem('teaTypeSelected'),
    tasteTypeSelected: '' || localStorage.getItem('tasteTypeSelected'),
    caffeineTypeSelected: '' || localStorage.getItem('caffeineTypeSelected'),
  };


  //The following variables, along with the corresponding import, create a seedable Math.random() style function for more 
  //effective random number generation.

  seedrandom = require('seedrandom');
  rng = seedrandom();
    
  //These functions set the values for the choices made by the user.

  setTeaType = value => {
    this.setState({ teaTypeSelected: value })
    localStorage.setItem('teaTypeSelected', value)
    this.context.setTeaTypeSelection(value);
    console.log(this.state.teaTypeSelected)
  };

  setCaffeineType = value => {
    this.setState({ caffeineTypeSelected: value })
    localStorage.setItem('caffeineTypeSelected', value)
    this.context.setCaffeineSelection(value);
    console.log(this.state.caffeineTypeSelected)
  };

  setTasteType = value => {
    this.setState({ tasteTypeSelected: value })
    localStorage.setItem('tasteTypeSelected', value)
    this.context.setTasteTypeSelection(value)
    console.log(this.state.tasteTypeSelected)
    
  };

  setTeaTypeRandom = () => {
    let randomIndex = Math.floor(this.rng() * 5 )
    this.setState({teaTypeSelected: this.state.validTeaTypes[randomIndex]})
    localStorage.setItem('teaTypeSelected', this.state.validTeaTypes[randomIndex])
    this.context.setTeaTypeSelection(this.state.validTeaTypes[randomIndex]);
  }

  teaTypeButtons() {
    let teaType = this.state.validTeaTypes;
    return (
      <div>
        {
          teaType.map((teaType, index) => {
            return (
              <button 
              className = {`teaType${index}`}
                  key = {index}
                  onClick={() => this.setTeaType(teaType)}>
                   {teaType}  
              </button>
            );
          })
        }
      </div>
    );
  }

  caffeineTypeButtons() {
    let caffeineType = this.state.validCaffeineTypes;
    return (
      <div>
        {
          caffeineType.map((caffeineType, index) => {
            return (
              <button 
              className = {`caffeineType${index}`}
                  key = {index}
                  onClick={() => this.setCaffeineType(caffeineType)}>
                   {caffeineType} Caffeine 
              </button>
            );
          })
        }
      </div>
    );
  }

  tasteTypeButtons() {
    let tasteType = this.state.validTasteTypes;
    return (
      <div>
        {
          tasteType.map((tasteType, index) => {
            return (
              <button 
                  className = {`tasteType${index}`}
                  key = {index}
                  onClick={() => this.setTasteType(tasteType)}>
                   {tasteType}  
              </button>
            );
          })
        }
      </div>
    );
  }

  //Do you like starting in the middle of a page? No right? Neither do most users! This makes sure you start at the top. 
componentDidMount(){
  window.scrollTo(0, 0)
}
  
  //This function prevents the default submit action, allowing our buttons to not reload the page on each click.
  handleSubmit = e => {
    e.preventDefault()
  }

  //This section renders the end user interface for this component.
    render() {
    const { error } = this.state
    return (
      <section className='SelectTeaClipping'>
        <h2 className= 'firstHeader'>Let's start by choosing what type of tea you are craving!</h2>
        <form
          className='SelectTeaClipping__form'
          onSubmit={this.handleSubmit}
        >
          <div className='SelectTeaClipping__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div className='button-container'>
            {this.teaTypeButtons()}
            <button className= 'randomTeaType' onClick={() => this.setTeaTypeRandom()}>Let Mr. TeaSeeks Decide</button>
              <p>You Chose: {this.state.teaTypeSelected}</p>
            <h3>Need some energy, or trying to relax? Tell us how much caffeine you prefer in this batch of tea</h3>
            {this.caffeineTypeButtons()}
              <p>You Chose: {this.state.caffeineTypeSelected}</p>
            <h3>Shall we delight in something Light, or do we belong with something Strong? </h3>  
            {this.tasteTypeButtons()}
              <p>You Chose: {this.state.tasteTypeSelected}</p>
          </div>
            <br></br>
          <Link className= 'discoveryLink' to={'/teaDiscovery'}>
            Discover My Tea
          </Link>
        </form>
      </section>
    );
  }
}

export default TeaDefinition;
