import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isChecked:true,
      forecast:[],
      error: null,
      zipcode:0,
      city:"",
      err:true

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
    const cityCountry=this.state.city;
    this.setState({ forecast: [] });
    console.log(zipcode.length);
    console.log(cityCountry);
    if(zipcode=="" && cityCountry==""){
      alert("please enter in a city or zipcode")
    }
    else if(zipcode.length==5 && cityCountry!=""){
      alert("please enter in only a city or a zipcode")
    }
    else if(zipcode.length <5 && zipcode.length>0){
      alert('Enter a valid zipcode for the US')
    }
    else if(zipcode.length==5 && cityCountry==""){
      if(this.state.oneDay){
       fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425`).then(
         response=>response.json()).then(
         (data)=>{
           console.log(this.state.err)
           this.setState({err:true})
           this.setState(prevState =>{
             return (
               {
                 forecast: [...prevState.forecast,data]
               }
             )
           })

     }).catch( error=> {
       this.setState({err:false})

     })
     }

       else if( this.state.fiveDay){
         fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
           (data)=>{
             this.setState({err:true})
           let list=data.list

           for (let i=0;i<list.length;i+=8){
             this.setState(prevState =>{
               return (
                 {
                   forecast: [...prevState.forecast,data.list[i]],

                 }
               )
             })
           }
           }
         ).catch( error=> {
           this.setState({err:false})

         })
       }else{
         alert("Please select a forecast option")
       }
    }
    else if( zipcode.length==0 && cityCountry!="" && cityCountry.includes(",")){
      console.log(cityCountry.split(",")[0].toLowerCase(),cityCountry.split(",")[1].toLowerCase())
      let city=cityCountry.split(",")[0].toLowerCase();
      let country=cityCountry.split(",")[1].toLowerCase()
        if(this.state.oneDay){
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
           (data)=>{
             console.log(data)
             this.setState({err:true})
             this.setState(prevState =>{
               return (
                 {
                   forecast: [...prevState.forecast,data]
                 }
               )
             })
       }).catch( error=>{
         this.setState({err:false})

       })
       }
     else if(this.state.fiveDay){

         fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=fc20bc99a527278382bcc31e4b774425`).then(response=>response.json()).then(
           (data)=>{
             console.log(data)
             this.setState({err:true})
           let list=data.list
           for (let i=0;i<list.length;i+=8){
             this.setState(prevState =>{
               return (
                 {
                   forecast: [...prevState.forecast,data.list[i]]
                 }
               )
             })
           }
           }
         ).catch( error=>{
           this.setState({err:false})

         }
           )

     }else{
       alert("Please select a forecast option")
     }

    }



  }
  handleChange(event) {
    /*Allow for changes regradless of which input field is changed*/
    //console.log(event.target);
   this.setState({ [event.target.name]: event.target.value});
 }
handledate(date){
  let d=new Date(date*1000);

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

      return (
        <div className="App">
        <header>
          <h1>Welcome to the Weather Forecaster!</h1>
          <p>Just enter in your locoation what type of forecast you want</p></header>
          <div className='weatherInputs'>
            <form onSubmit={this.handleSubmit}>
              <label> Zip-Code:
                <input type='number' name='zipcode' value={this.state.value} onChange={this.handleChange}/>
              </label>
              <br/>
              OR
              <br/>
              <label> City,Country:
                <input type='text' name='city' placeholder="London,UK" value={this.state.value} onChange={this.handleChange}/>
              </label>
              <br/>
              <input type='checkbox' name='forecast_length' value=' 1 day' onClick={this.todaysForecast} />Todays forecast<br/>
              <input type='checkbox' name='forecast_length' value=' 5 day' onClick={this.fiveDayForecast}/>Next Five Days<br/>
              <label>
              Choose Temperature unit:
              <input type='radio' name='temperature_unit' value='fahernheight' onChange={this.toggleChange} checked={this.state.isChecked}/>&deg; F
              <input type='radio' name='temperature_unit' value='celculius ' onChange={this.toggleChange}/>&deg; C<br/>
              </label><br/>
              <input type='submit' value='Submit'/>
            </form>
          </div>
          {this.state.err? <div className='weatherDisplay'>
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
          </div>:<div className='weatherDisplay'>Data for location could not be found, please enter in a valid location</div>}
        </div>
      );


  }
}

export default App;
