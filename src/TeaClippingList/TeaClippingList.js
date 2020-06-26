import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeaClippingsContext from '../TeaClippingsContext';
import TeaClippingItem from '../TeaClippingItem/TeaClippingItem';
import './TeaClippingList.css';

//This presents a list of the records available in the Mr. TeeSeaks archive. 
class TeaClippingList extends Component {
  static proptTypes = {
    teaClippings: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
      })
    )
  };

  static defaultProps = {
    teaClippings: []
  };

  static contextType = TeaClippingsContext;


//For each entry in the Mr. TeaSeeks archive a listing is rendered.  
  render() {
    const { teaClippings } = this.context
    return (
      <section className='TeaClippingList'>
        <h2>Tea Clipping Entries</h2>
        <ul className='TeaClippingList__list' aria-live='polite'>
          {teaClippings.map(record =>
            <TeaClippingItem
              key={record.id}
              {...record}
            />
          )}
        </ul>
      </section>
    );
  };
};

export default TeaClippingList;
