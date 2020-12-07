import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Form extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          acc_id: null,
          accType: null,
          balance: null,
          Username: null,
          Password: null,
          submitted: false
      }
  }
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='./Account.js' />
    }
  }
    submitHandler = (event) => {
      event.preventDefault();
      //var id = this.state.id;
      alert("You are submitting " + this.state.Username + "," + this.state.Password);
      axios.get('http://localhost:8080/fromDB/'+this.state.Username)
      .then(response => {
        console.log(response);
        alert(response.data.accType +',' + response.data.balance);
        this.setState({submitted: true, acc_id: response.data.acc_id, accType: response.data.accType,balance:response.data.balance});
        console.log('Latest: '+this.state.contact);
    });
    }
    createHandler = (event) => {
      event.preventDefault();
      //var id = this.state.id;
       
      alert("You are creating " + this.state.acc_id + "," + this.state.Username);
      axios.put('http://localhost:8080/putAccount',
        {
       "acc_id": this.state.acc_id,
       "accType":this.state.accType,
       "balance":this.state.balance,
        "username":this.state.Username,
        "password":this.state.Password})
      .then(response => response.data);
    }
    deleteHandler = (event) => {
      event.preventDefault();
      alert("You are deleting " + this.state.Username);
      axios.delete('http://localhost:8080/delete', 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "acc_id": this.state.acc_id,
          "accType":this.state.accType,
          "balance":this.state.balance,
           "username":this.state.Username,
           "password":this.state.Password}})
           .then(response => response.data);
         }
        
    updateHandler = (event) => {
      event.preventDefault();
      //var id = this.state.id;
       
      alert("You are updating " + this.state.Username + "," + this.state.Password);
      axios.post('http://localhost:8080/updatePassword',
        {
       "acc_id": this.state.acc_id,
       "accType":this.state.accType,
       "balance":this.state.balance,
        "username":this.state.Username,
        "password":this.state.Password})
      .then(response => response.data);
    }
    usernameChangeHandler = (event) => {
      this.setState({Username: event.target.value});
}
  passwordChangeHandler = (event) => {
    this.setState({Password: event.target.value});
}
balanceChangeHandler = (event) => {
  this.setState({balance: event.target.value});
}
accTypeChangeHandler = (event) => {
  this.setState({accType: event.target.value});
}
accIdChangeHandler = (event) => {
  this.setState({acc_id: event.target.value});
}
  render() {
      return (<div align='center'>
        <form>
          {/* <form onSubmit={this.submitHandler}> */}
            <h1>WELCOME TO BANKING SERVICES</h1>
            <p>Enter your Username:</p>
            <input
              type="text"
              onChange={this.usernameChangeHandler}
            />
             <p>Enter your Password:</p>
            <input
              type="text"
              onChange={this.passwordChangeHandler}
            />
            <p>Enter your AccountID:</p>
            <input
              type="text"
               onChange={this.accIdChangeHandler}
            />
            <p>Enter your AccountType:</p>
            <input
              type="text"
               onChange={this.accTypeChangeHandler}
            />
            <p>Enter your Balance:</p>
            <input
              type="text"
               onChange={this.balanceChangeHandler}
            />
             <p>
            <button onClick={this.submitHandler}>Get Account</button>
            </p>
          {this.state.submitted && <Account value = {this.state}/>}
           <button onClick={this.createHandler}>Create Account</button>
          <button onClick={this.deleteHandler}>Delete Account</button>
          <button onClick={this.updateHandler}>Update Account</button>
          </form>
          </div>
        );
  }

}
function Account(props) {
  console.log('Account: '+props);
  return (
  <div>
  <p>Acc_id: {props.value.acc_id}</p>
  <p>Acc_type: {props.value.accType}</p>
  <p>Balance: {props.value.balance}</p>
  </div>
  )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

//export default App;
