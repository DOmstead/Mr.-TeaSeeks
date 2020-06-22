import React, { Component } from  'react';
import TeaClippingsContext from '../TeaClippingsContext';
import { Link } from 'react-router-dom';
import './TeaDiscovery.css';
import seedrandom from 'seedrandom';
import black_tea_leaf_landscape from '../Images/black_tea_leaf_landscape.jpg'
import matcha_wisk_with_water from '../Images/matcha_wisk_with_water.jpg'
import buddhaTears from '../Images/buddhaTears.jpg'
import mandalaNobleMark from '../Images/mandalaNobleMark.jpg'
import hmxinyangmaojian from '../Images/hmxinyangmaojian.jpg'
import keemun_lupin_black_tea_2 from '../Images/keemun_lupin_black_tea_2.jpg'




//This component is responsible for displaying the tea clipping that meet the criteria previously chosen by the user. 

class TeaDiscovery extends Component {

  static contextType = TeaClippingsContext;
  
  state = {
    error: null,
    id: '',
    teaTypeSelected: this.context.teaTypeSelected,
    caffeineTypeSelected: this.context.caffeineTypeSelected,
    tasteTypeSelected: this.context.tasteTypeSelected,
    clippingSelected: localStorage.getItem('clippingSelected')|| {},
    clippingsSelected: localStorage.getItem('clippingsSelected') || [], 
    indexShown: parseInt(localStorage.getItem('indexShown')) || 0,
    imageSelected: localStorage.getItem('imageSelected') || black_tea_leaf_landscape,
  };

  //This calls the main function of this component when it mounts.
  componentDidMount() {
  this.clippingSelector()
  this.imageSelected()
  window.scrollTo(0, 0)
  }

  
  //This function runs through the tea clippings available based off the criteria chosen by the user. 
  clippingSelector = () => {
    let clippingsSelected = []
    let teaClippings = JSON.parse(localStorage.getItem('teaClippings'));
        for(let i=0; i < teaClippings.length; i++){
        let clipping = teaClippings[i];
          if(this.state.teaTypeSelected === clipping.tea_type && 
            this.state.caffeineTypeSelected === clipping.caffeine &&
            this.state.tasteTypeSelected === clipping.taste
            ){ 
            clippingsSelected.push(clipping);
          }
        }
        this.setState({clippingsSelected: clippingsSelected})
        localStorage.setItem('clippingsSelected', clippingsSelected)
        this.setState({clippingSelected: clippingsSelected[0]})
        localStorage.setItem('clippingSelected', clippingsSelected[0])
        this.context.setTeaSelected(clippingsSelected[this.state.indexShown])
  } 

  //This function runs through the various teas that have met the requirements the user selected.
  changeindexShown = () => {
    if(this.state.indexShown < this.state.clippingsSelected.length - 1){
      this.setState({indexShown: this.state.indexShown + 1})
      this.context.setTeaSelected(this.state.clippingsSelected[this.state.indexShown + 1])
      localStorage.setItem('indexShown', this.state.indexShown + 1)
    }
    else{
      this.setState({indexShown: 0})
      this.context.setTeaSelected(this.state.clippingsSelected[0])
      localStorage.setItem('indexShown', 0)
    }
  }

  

  teaBlend = {    
    "id": 22,
    "name": "Wild Spring Laoshan Blend",
    "tea_type": "Herbal",
    "caffeine": "High",
    "taste": "Strong",
    "details": "A jack of all trades, this blend can differ wildly depending on how long it is brewed and steeped for. A quick brew and steep will give you a calming tea with a light flavor. A much longer steep can provide a strong tannin filled delight for those who like a bitter taste. Gan Zao Ye (Wild Jujube) is a tea that grows unmanaged and wild on the slopes of Laoshan. It is procured in limited quantity each spring and hand-processed just like a traditional green tea with withering, firing and curling. The final result is packed with just as much flavor complexity (and antioxidants) as traditional tea with a striking barley and walnut flavor",
    "temp": "165",
    "brew_time": "8 - 15",
    "image": "mandelaMasala.jpg"
  } 

  imageOptions = [
    black_tea_leaf_landscape,
    matcha_wisk_with_water,
    buddhaTears,
    mandalaNobleMark,
    hmxinyangmaojian,
    keemun_lupin_black_tea_2
  ]


  seedrandom = require('seedrandom');
  rng = seedrandom();

  imageSelected = () => {
    let imagePosition = Math.floor(this.rng() * 5 )
    for(let i=0; i < this.imageOptions.length; i++){
      this.setState({imageSelected: this.imageOptions[imagePosition] })
      localStorage.setItem('imageSelected', this.imageOptions[imagePosition] )
  }
}
   
  //This section renders the end user interface for this component.  
  render() {
      const {indexShown} = this.state
      const teaToShow = this.state.clippingsSelected[indexShown] || this.teaBlend
      return (
          <section className='TeaPresentation'> 
        <div>
      <h2>{teaToShow.name}</h2>
      {/* <img alt= 'Specified Tea Fetched' src={this.state.imageSelected}></img> */}
      <p className= 'tempAndTime'>Steeping Tempature: {teaToShow.temp}</p>
      <p className= 'tempAndTime'>Time to Steep: {teaToShow.brew_time} Minutes</p>
      <p className = 'teaDetails'>{teaToShow.details}</p>
        </div>
        <div className= 'optionContainer'>
          <h4>Want another tea that fits this criteria? Click below to see the next in line!</h4>
        <button className= 'moreTeas' type='button' onClick={this.changeindexShown}>
            Next Tea
        </button>
        </div>
        <div className= 'optionContainer'>
        <Link className= 'backToDefinition' to={'/teaDefinition'}>
          Want to change your choices? Click here  
        </Link>
        </div>
          </section>
      );
    }
  }
    
  export default TeaDiscovery;



