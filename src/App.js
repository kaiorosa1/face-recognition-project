import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';


const app = new Clarifai.App({
  apiKey: '1ebcce34d8924c7f95ef368377244223'
 });
 
const particlesOptions = {
  "particles": {
    "number": {
        "value": 60
    },
    "size": {
        "value": 3
    }
},
"interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
    }
}
};
class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      input: '',
      imgUrl: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }
  onButtonSubmit = ()=>{
    this.setState({imgUrl : this.state.input});
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        // URL
       this.state.input
        )
    .then(function(response) {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {// there was an error
          console.log(err);
        }
    );
    // console.log("click");
  }
  render(){
    return (
      <div className="App">
        <Particles className="particles"
        params={particlesOptions} 
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
         />
        <FaceRecognition img={this.state.imgUrl}/>
      </div>
    );
  }
  
}

export default App;
