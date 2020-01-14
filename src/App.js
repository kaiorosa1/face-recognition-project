import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
const initialState = {
    input: '',
    imgUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user : {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''

    }
};
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
  }

  loadUser = (data)=>{
    this.setState({
     user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
     }
    })
  }
  onRouteChange = (route)=>{
    if(route ==='signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftColumn: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightColumn :width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
      this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit = ()=>{
    this.setState({imgUrl : this.state.input});
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
        // URL
       this.state.input
        )
    .then((response) =>{
      if(response){
        fetch('http://afternoon-badlands-84545.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
               id: this.state.user.id
            })
        })
        .then(response=> response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, {
            entries: count
          }))
        })

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }
   
        
    ).catch(err => console.log(err));
    // console.log("click");
  }
  render(){
    return (
      <div className="App">
        <Particles className="particles"
        params={particlesOptions} 
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
         {
           this.state.route === 'home' 
           ?
           <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} img={this.state.imgUrl}/>
          </div>
          :
           (
             this.state.route === 'signin' || this.state.route === 'signout' ?
             <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
             :
             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
           )
         }
      </div>
    );
  }
  
}

export default App;
