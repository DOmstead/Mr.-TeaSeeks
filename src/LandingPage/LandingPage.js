import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import './LandingPage.css';
import Carousel from 'react-image-carousel';
import black_tea_leaf_landscape from '../Images/black_tea_leaf_landscape.jpg';
import huron_gold_needle from '../Images/huron_gold_needle.jpg';
import matcha_wisk_with_water from '../Images/matcha_wisk_with_water.jpg';
import  '../../node_modules/react-image-carousel/lib/css/main.min.css';


// This component is the first thing a user sees when they go to this app. 
// It is rendered on the '/' path, and serves as an introduction to what this app does
// and why a user may wish to use it.

class LandingPage extends Component {

images = [
  black_tea_leaf_landscape,
  huron_gold_needle,
  matcha_wisk_with_water,
];   

render() {
  return (
      <section className='Landing'> 
          <div>
              <h1>Mr. TeaSeeks</h1>
              <h3>I'm Mr. TeaSeeks, Look at me!</h3>
              <h5>Let me help you find your tea!</h5>
          </div>
          <div className = "my-carousel"> 
          <Carousel images={this.images}
                    thumb={true}
                    loop={true}
                    autoplay={8000}/>
          </div>
          <div>
            <p className = "intro">
              Mr. TeaSeeks is an app for tea lovers everywhere. 
              With hundreds of thousands of different teas across the globe to choose from, there is no reason we should be stuck drinking the same old green. 
              Simply make a few easy choices on what you're looking for, and Mr. TeaSeeks will scour the globe to find the right tea for you.    
            </p>
          </div>
          <Link className= 'LandingToDefinition' to={'/TeaDefinition'}>
            Find My Tea!
          </Link>
      </section>
  );
};
};

export default LandingPage
