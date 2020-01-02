import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import Particles from 'react-particles-js';

import './App.css';
const particlesOptions = {
  particles :{
    number: {
      value: 50,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
};
const  App = () =>{
  return (
    <div className="App">
      <Particles className="particles"
      params={particlesOptions} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );
}

export default App;
