import React from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import ImageLinkForm from './ImageLinkForm';
import FaceRecognition from './FaceRecognition';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );
}

export default App;
