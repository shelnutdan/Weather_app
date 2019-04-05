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
      isChecked:true,
      oneDay:false,
      fiveDay:false
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.toggleChange=this.toggleChange.bind(this);
    this.handleDate=this.handleDate.bind(this);
    this.todaysForecast=this.todaysForecast.bind(this);
    this.fiveDayForecast=this.fiveDayForecast.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    const zipcode=this.state.zipcode
    console.log(zipcode);
    if(this.state.oneDay){
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

    else if( this.state.fiveDay){
      fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
        (data)=>{
          let dateArray=[]
          let tempArray=[];
          let weatherArray=[];
          let iconArray=[]
          let list=data.list


        for (let i=0;i<list.length;i+=8){
          console.log(list[i])
          dateArray.push(list[i].dt_txt)
            tempArray.push(list[i].main.temp)
              weatherArray.push(list[i].weather[0].main)
              iconArray.push(list[i].weather[0].icon)
        }
        console.log(dateArray)
        console.log(tempArray);
        console.log(weatherArray);
        console.log(iconArray);
          console.log(list)
        }
      ).catch( error=> console.log('Parsing error',error))
    }else{
      console.log('Select a forecast option')
    }



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
 }
 todaysForecast(){
   this.setState(
     {oneDay:!this.state.oneDay,
       fiveDay:false
     }
   )
   console.log("todays forecast was checked", this.state.oneDay)
 }
 fiveDayForecast(){
   this.setState(
     {fiveDay:!this.state.fiveDay,
       oneDay:false
     }

   )
   if(this.state.oneDay){
     this.setState({oneDay: !this.state.oneDay})
   }
   console.log("five day forecast was selected", this.state.fiveDay)
 }

  render() {

      return (
        <div className="App">
          <h1>Welcome to the Weather Forecaster!</h1>
          <p>Just enter in your locoation what type of forecast you want</p>
          <div className='weatherInputs'>
          <form onSubmit={this.handleSubmit}>
            <label>Zip-Code:
              <input type='number' name='zipcode' value={this.state.value} onChange={this.handleChange}/>
            </label>

            <br/>
            {/*Forecast options*/}
            <input type='checkbox' name='forecast_length' value=' 1 day' onClick={this.todaysForecast} />Todays forecast
            <input type='checkbox' name='forecast_length' value=' 5 day' onClick={this.fiveDayForecast}/>Next Five Days<br/>
            <label>
            Choose Temperature unit:
            <input type='radio' name='temperature_unit' value='fahernheight' onClick={(e)=>console.log(e.target.value)} />&deg; F
            <input type='radio' name='temperature_unit' value='celculius ' onClick={(e)=>console.log(e.target.value)}/>&deg; C<br/>
            </label><br/>
            <input type='submit' value='Submit'/>
          </form>
          <div className='degree' onClick={ this.toggleChange}>
            {this.state.isChecked ? <span>&deg; F</span>:<span> &deg; C</span>}
          </div>
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
