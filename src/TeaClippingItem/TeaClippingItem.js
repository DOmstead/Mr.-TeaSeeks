import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TeaClippingsContext from '../TeaClippingsContext';
import config from '../config';
import './TeaClippingItem.css';


//This function performs an api request that allows us to remove a record
function deleteTeaClippingRequest(teaClippingId, cb) {
  fetch(config.API_ENDPOINT + `/${teaClippingId}`, {
    method: 'DELETE',
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
      cb(teaClippingId)
    })
    .catch(error => {
      console.error(error)
    })
}

//This section handles what renders for the end user.
export default function TeaClippingItem(props) {
  return (
    <TeaClippingsContext.Consumer>
      {(context) => (
        <li className='TeaClippingItem'>
          <div className='TeaClippingItem__row'>
            <h3 className='TeaClippingItem__name'>
              <p
                target='_blank'
                rel='noopener noreferrer'>
                {props.name}
              </p>
            </h3>
          </div>
          <div className='TeaClippingItem__buttons'>
            <Link to={`/edit/${props.id}`}>
              Edit
            </Link>
            {' '}
            <button
              className='TeaClippingItem__description'
              onClick={() =>
                deleteTeaClippingRequest(props.id, context.deleteTeaClipping)
              }>
              Delete
            </button>
          </div>
        </li>
      )}
    </TeaClippingsContext.Consumer>
  )
}

TeaClippingItem.defaultProps = {
  onClickDelete: () => {},
}

//This sets the relevant proptypes and requires the neccessary pieces. 
TeaClippingItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  tea_type: PropTypes.string.isRequired,
  caffeine: PropTypes.string.isRequired,
  taste: PropTypes.string,
  details: PropTypes.string,
  temp: PropTypes.string,
  brew_time: PropTypes.string,
  image: PropTypes.string,
  onClickDelete: PropTypes.func,
}
