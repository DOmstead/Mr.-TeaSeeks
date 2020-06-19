import React, { Component } from  'react';
import PropTypes from 'prop-types';
import TeaClippingsContext from '../TeaClippingsContext';
import config from '../config'
import './AddTeaClipping.css';

const Required = () => (
  <span className='AddTeaClipping__required'>*</span>
)

class AddTeaClipping extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = TeaClippingsContext;

  state = {
    error: null,
  };

  //This function prevents the default behavior from occurring and supplements it with our custom requirements.

  handleSubmit = e => {
    e.preventDefault()
    const { name, tea_type, caffeine, taste, details, temp, brew_time, image } = e.target
    const teaClipping = {
      name: name.value,
      tea_type: tea_type.value,
      caffeine: caffeine.value,
      taste: taste.value,
      details: details.value,
      temp: temp.value,
      brew_time: brew_time.value,
      image: image.value,
    }

    //This API call is responsible for making a post request to our API, posting a new Tea Clipping to our archive. 
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(teaClipping),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(data => {
        tea_type.value = ''
        caffeine.value = ''
        taste.value = ''
        details.value = ''
        temp.value = ''
        brew_time.value = ''
        image.value = ''
        this.context.addTeaClipping(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  //This function handles what happens when a user clicks cancel on the form.
  handleClickCancel = () => {
    this.props.history.push('/')
  };


  //This section renders the end user interface for this component.  
  render() {
    const { error } = this.state
    return (
      <section className='AddTeaClipping'>
        <h2>Had a great cup of tea? Help by adding it to our archive.</h2>
        <form
          className='AddTeaClipping__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddTeaClipping__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
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
            />
          </div>
          <div className='AddTeaClipping__buttons'>
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

export default AddTeaClipping;
