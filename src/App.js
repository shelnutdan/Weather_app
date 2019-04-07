import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isChecked:true,
      forecast:[],
      error: null,
      zipcode:0

    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.toggleChange=this.toggleChange.bind(this);
    this.todaysForecast=this.todaysForecast.bind(this);
    this.fiveDayForecast=this.fiveDayForecast.bind(this);
    this.handledate=this.handledate.bind(this)
  }

  handleSubmit(event){
    event.preventDefault();
    const zipcode=this.state.zipcode;
    this.setState({ forecast: [] });
    console.log(zipcode);
    if(this.state.oneDay){
      fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
        (data)=>{
          console.log(data)
          this.setState(prevState =>{
            return (
              {
                forecast: [...prevState.forecast,data]
              }
            )
          })
          /*
          this.setState({
          temperature: (data.main.temp-273.15).toFixed(1),
          location: data.name,
          weather: data.weather[0].main,
          icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`*/
          console.log(this.state.forecast)
    }).catch( error=> console.log('Parsing error',error))
    }

    else if( this.state.fiveDay){
      fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
        (data)=>{
        let list=data.list

        for (let i=0;i<list.length;i+=8){
          this.setState(prevState =>{
            return (
              {
                forecast: [...prevState.forecast,data.list[i]]
              }
            )
          })
          console.log(list[i])
        }

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
handledate(date){
  let d=new Date(date*1000);
  //let ds=d.toString("MMM dd yy");
  let ds= (d.getMonth()+1)+"/"+ d.getDate()+"/"+d.getFullYear()
  return ds;
}
 toggleChange(){
   this.setState({isChecked: !this.state.isChecked})
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
      var testRender=[{id:1,test:this.state.date},{id:2,test:200}]
      return (
        <div className="App">
        <header>
          <h1>Welcome to the Weather Forecaster!</h1>
          <p>Just enter in your locoation what type of forecast you want</p></header>
          <div className='weatherInputs'>
            <form onSubmit={this.handleSubmit}>
              <label>Zip-Code:
                <input type='number' name='zipcode' value={this.state.value} onChange={this.handleChange}/>
              </label>
              <br/>

              <input type='checkbox' name='forecast_length' value=' 1 day' onClick={this.todaysForecast} />Todays forecast
              <input type='checkbox' name='forecast_length' value=' 5 day' onClick={this.fiveDayForecast}/>Next Five Days<br/>
              <label>
              Choose Temperature unit:
              <input type='radio' name='temperature_unit' value='fahernheight' onChange={this.toggleChange} checked={this.state.isChecked}/>&deg; F
              <input type='radio' name='temperature_unit' value='celculius ' onChange={this.toggleChange}/>&deg; C<br/>
              </label><br/>
              <input type='submit' value='Submit'/>
            </form>
          </div>
          <div className='weatherDisplay'>
          {this.state.forecast.map( e =>
            <div className='individualDays'>
            <img
            src={`http://openweathermap.org/img/w/${e.weather[0].icon}.png`}
            />
              <p>Day: {this.handledate(e.dt)}</p>
              <p>Temperature: {this.state.isChecked ?
                <span>{((e.main.temp-273.15)*(9/5)+32).toFixed(0)}&deg; F</span>:
                <span> {(e.main.temp-273.15).toFixed(0)}&deg; C</span>}
              </p>
              <p>Weather: {e.weather[0].main}</p>
            </div>
          )}
          </div>
        </div>
      );


  }
}

export default App;
