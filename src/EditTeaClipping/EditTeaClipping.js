import React, { Component } from  'react';
import PropTypes from 'prop-types';
import TeaClippingsContext from '../TeaClippingsContext';
import config from '../config'
import './EditTeaClipping.css';

const Required = () => (
  <span className='EditTeaClipping__required'>*</span>
)


//This component is a key piece in record maintenance. It allows us to edit and clipping in our archive of tea clippings.

class EditTeaClipping extends Component {
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
    name: '',
    tea_type: '',
    caffeine: '',
    taste: '',
    details: '',
    temp: '',
    brew_time: '',
    image: '',
  };

  //When this componeent mounts it performs the following API call for the specific tea clipping requested. 
  componentDidMount() {
    const { teaClippingId } = this.props.match.params
    fetch(config.API_ENDPOINT + `/${teaClippingId}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(res => {
        this.setState({
          name: res.value,
          tea_type: res.value,
          caffeine: res.value,
          taste: res.value,
          details: res.value,
          temp: res.value,
          brew_time: res.value,
          image: res.value,
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }


  //This series of functions target specific pieces of data and call the setState 
  //function accordingly 
  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleChangeTeaType = e => {
    this.setState({ tea_type: e.target.value })
  };

  handleChangeCaffeine = e => {
    this.setState({ caffeine: e.target.value })
  };

  handleChangeTaste = e => {
    this.setState({ taste: e.target.value })
  };

  handleChangeDetails = e => {
    this.setState({ details: e.target.value })
  };

  handleChangeTemp = e => {
    this.setState({ temp: e.target.value })
  };

  handleChangeBrewTime = e => {
    this.setState({ brew_time: e.target.value })
  };

  handleChangeImage = e => {
    this.setState({ Image: e.target.value })
  };


  //When the user submits the form we prevent the default, and run the following fetch request. 
  handleSubmit = e => {
    e.preventDefault()
    const { teaClippingId } = this.props.match.params
    const { id, name, tea_type, caffeine, taste, details, temp, brew_time, image } = this.state
    const newTeaClipping = { id, name, tea_type, caffeine, taste, details, temp, brew_time, image }
    fetch(config.API_ENDPOINT + `/${teaClippingId}`, {
      method: 'PATCH',
      body: JSON.stringify(newTeaClipping),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newTeaClipping)
        this.context.updateTeaClipping(newTeaClipping)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }


  //Want fields full of text even after you submit? No? Neither do our users. This function takes care of that. 
  resetFields = (blank) => {
    this.setState({
          name: blank.value || '',
          tea_type: blank.value || '',
          caffeine: blank.value || '',
          taste: blank.value || '',
          details: blank.value || '',
          temp: blank.value || '',
          brew_time: blank.value || '',
          image: blank.value || '',
    })
  }

  //When the user hits cancel this function runs.
  handleClickCancel = () => {
    this.props.history.push('/')
  };


  //This section renders the visual representation of this component.   
  render() {
    const { error, name, tea_type, caffeine, taste, details, temp, brew_time, image } = this.state
    return (
      <section className='EditTeaClipping'>
        <h2>Tea Clipping Changes</h2>
        <form
          className='EditTeaClipping__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditTeaClipping__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <input
            type='hidden'
            name='id'
          />
          <div>
            <label htmlFor='title'>
              Name
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter tea name here!'
              required
              value={name}
              onChange={this.handleChangeName}
            />
          </div>
          <div>
            <label htmlFor='tea_type'>
              Tea Type
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='tea_type'
              id='tea_type'
              placeholder='Please input a valid tea type'
              required
              value={tea_type}
              onChange={this.handleChangeTeaType}
            />
          </div>
          <div>
            <label htmlFor='taste'>
            Taste
            </label>
            <textarea
              name='taste'
              id='taste'
              placeholder='Does this have a Smooth or Light taste?'
              required
              value={taste}
              onChange={this.handleChangeTaste}
            />
          </div>
          <div>
            <label htmlFor='details'>
            Details
            </label>
            <textarea
              name='details'
              id='details'
              placeholder='Give me the details! What makes this tea great?'
              value={details}
              onChange={this.handleChangeDetails}
            />
          </div>
          <div>
            <label htmlFor='temp'>
            Temp
            </label>
            <textarea
              name='temp'
              id='temp'
              placeholder='Caffeine: High or Low?'
              required
              value={temp}
              onChange={this.handleChangeTemp}
            />
          </div>
          <div>
            <label htmlFor='brew_time'>
            Steep Time
            </label>
            <textarea
              name='brew_time'
              id='brew_time'
              placeholder='How long do we steep this for?'
              required
              value={brew_time}
              onChange={this.handleChangeBrewTime}
            />
          </div>
          <div>
            <label htmlFor='image'>
            Image
            </label>
            <textarea
              name='image'
              id='image'
              placeholder='Got an image link for this?'
              required
              value={image}
              onChange={this.handleChangeImage}
            />
          </div>
          <div className='EditTeaClipping__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
          </form>
      </section>
    );
  }
}

export default EditTeaClipping;
