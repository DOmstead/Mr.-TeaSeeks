import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import TeaClippingList from './TeaClippingList/TeaClippingList';
import TeaDiscovery from './TeaDiscovery/TeaDiscovery';
import TeaClippingsDatabase from './TeaClippingsTestingDatabase'
import AddTeaClipping from './AddTeaClipping/AddTeaClipping';
import EditTeaClipping from './EditTeaClipping/EditTeaClipping';
import TeaDefinition from './TeaDefinition/TeaDefinition';
import TeaClippingsContext from './TeaClippingsContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';


//This component is the main component of this program, and is therefore named app
//in keeping with industry best practices. 
class App extends Component {



  state = {
    //This is all records, followed by the three things a user chooses. 
    teaClippings: [] || localStorage.getItem('teaClippings'),
    teaTypeSelected: localStorage.getItem('teaTypeSelected') || "",
    caffeineTypeSelected: localStorage.getItem('caffeineTypeSelected') || "",
    tasteTypeSelected: localStorage.getItem('tasteTypeSelected') || "",
    teaSelected: "" || localStorage.getItem('teaSelected'),
    details: localStorage.getItem('details') || "",
    temp: localStorage.getItem('temp') || "",
    steepTime: localStorage.getItem('steepTime') || "",

    //This is the error state and I like it listed last.
    error: null,
  };


  //These functions allow calls to be made throughout the rest of the app and 
  //have context be update here. They are defined as part of context further down. 
  setTeaClippings = teaClippings => {
    this.setState({
      teaClippings: teaClippings,
      error: null,
    })
    localStorage.setItem('teaClippings', JSON.stringify(teaClippings))
  }

  setCaffeineSelection = caffeineTypeSelected => {
    this.setState({
      caffeineTypeSelected: caffeineTypeSelected
    })
  }
  
  setTeaTypeSelection = teaTypeSelected => {
    this.setState({
      teaTypeSelected: teaTypeSelected,
    })
  }

  setTasteTypeSelection = tasteTypeSelected => {
    this.setState({
      tasteTypeSelected: tasteTypeSelected,
    })
  }

  setTeaSelected = teaSelected => {
    this.setState({
      teaSelected: teaSelected,
    })
    localStorage.setItem('teaSelected', teaSelected)
  }

  addTeaClipping = teaClipping => {
    this.setState({
      teaClippings: [ ...this.state.teaClippings, teaClipping ],
    })
  }

  deleteTeaClipping = teaClippingId => {
    const newTeaClippings = this.state.teaClippings.filter(record =>
      record.id !== teaClippingId
    )
    this.setState({
      teaClippings: newTeaClippings
    })
  }


//  This API call happens when our app first loads, grabbing us all the data we need. 
  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setTeaClippings)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }



  updateTeaClipping = updatedTeaClipping => {
    this.setState({
      teaClippings: this.state.teaClippings.map(record =>
        (record.id !== updatedTeaClipping.id) ? record : updatedTeaClipping
      )
    })
  }


  //This section sets the value for context, calling in functions that allow context to be 
  //updated elsewhere throughout the app. Under return it handles all the pathing
  //for the app, showing what components render on what areas. 
  render() {
    const contextValue = {
      teaClippings: this.state.teaClippings || localStorage.getItem('teaClippings'),
      teaTypeSelected:this.state.teaTypeSelected,
      caffeineTypeSelected:this.state.caffeineTypeSelected,
      tasteTypeSelected:this.state.tasteTypeSelected,
      teaSelected:this.state.teaSelected,
      addTeaClipping: this.addTeaClipping,
      deleteTeaClipping: this.deleteTeaClipping,
      updateTeaClipping: this.updateTeaClipping,
      setCaffeineSelection: this.setCaffeineSelection,
      setTeaTypeSelection: this.setTeaTypeSelection,
      setTasteTypeSelection: this.setTasteTypeSelection,
      setTeaClippings: this.setTeaClippings,
      setTeaSelected: this.setTeaSelected
    }
    return (
      <main className='App'>
        <TeaClippingsContext.Provider value={contextValue}>
          <Nav />
          <br></br>
          <div className='content' aria-live='polite'>
          <Route
              exact
              path='/'
              component={LandingPage}
            />
          <Route
              exact
              path='/teaDefinition'
              component={TeaDefinition}
            />
          <Route
              exact
              path='/teaDiscovery'
              component={TeaDiscovery}
            />
          </div>
        </TeaClippingsContext.Provider>
      </main>
    );
  }
}

export default App;
