import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      error: null,
      zipcode:0,
      temperature:0,
      forecast:[],
      location:'',
      icon:'',
      weather:'',
      date:"2017-06-01",
      isLoaded:false,
      isChecked:true
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.toggleChange=this.toggleChange.bind(this);
    this.handleDate=this.handleDate.bind(this);

  }/*
  componentDidMount(){

    fetch('https://api.openweathermap.org/data/2.5/weather?zip=98407,us&APPID=fc20bc99a527278382bcc31e4b774425').then(response=>response.json()).then(
      (data)=>{
        console.log(data)
        this.setState({
          isLoaded:true,
          temperature: data.main.temp-273,
          location: data.name,
          weather: data.weather[0].main
        })
      }).catch( error=> console.log('Parsing error',error))

  }*/
  handleSubmit(event){
    event.preventDefault();
    const zipcode=this.state.zipcode
    console.log(zipcode)
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
      (data)=>{
        console.log(data)
        this.setState({
        temperature: (data.main.temp-273.15).toFixed(1),
        location: data.name,
        weather: data.weather[0].main,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
    })
  }).catch( error=> console.log('Parsing error',error))
    console.log('Entered in a zip-code',this.state.zipcode, "For this location of", this.state.location ,"For this date",this.state.date)

  }
  handleChange(event) {
    /*Allow for changes regradless of which input field is changed*/
    //console.log(event.target);
   this.setState({ [event.target.name]: event.target.value});
 }

 toggleChange(){
   this.setState({isChecked: !this.state.isChecked})
 }
 handleDate(){
   this.setState({date: this.state.date})
 }/*
getWeather(){
  const zipcode = this.state.zipcode
  console.log(zipcode)
  fetch('https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425').then(response=>response.json()).then(
    (data)=>{
  this.setState({

      temperature: data.main.temp-273,
      location: data.name,
      weather: data.weather[0].main
  })
}).catch( error=> console.log('Parsing error',error))
}*/


  render() {
    /*const { error, isLoaded}= this.state;
    if(error){
      return <div>This is an error</div>
    }else if(!isLoaded){
      return <div>Loading...</div>
    }else{*/
      return (
        <div className="App">
          <h1>Welcome to the Weather Forecaster!</h1>
          <p>Just enter in your locoation what type of forecast you want</p>
          <form onSubmit={this.handleSubmit}>
            <label>Zip-Code:
              <input type='number' name='zipcode' value={this.state.value} onChange={this.handleChange}/>
            </label>
            {/*
            <br/>OR<br/>
            <label>City, State:
              <input type='text' name='location' value={this.state.value} onChange={this.handleChange}/>
            </label>
            */}
            <br/>
            <input type='checkbox' name='forecast_length' value=' 1 day'/>One day
            <input type='checkbox' name='forecast_length' value=' 5 day'/>Five day<br/>
            <label>
            Enter a Date:
            <input type='date' name='date' value={this.state.date} onChange={this.handleChange}/>
            </label>
            <input type='submit' value='Submit'/>
          </form>
          <div className='degree' onClick={ this.toggleChange}>
            {this.state.isChecked ? <span>14&deg; F</span>:<span> 100&deg; C</span>}
          </div>
          <div className='weatherDisplay'>
          <img src={this.state.icon}/>
            <p>Temperature: {this.state.isChecked ? <span>{this.state.temperature*(9/5)+32}&deg; F</span>:<span> {this.state.temperature}&deg; C</span>} </p>
            <p>Location: {this.state.location}</p>
            <p>Weather: {this.state.weather}</p>
          </div>
        </div>
      );


  }
}

export default App;
