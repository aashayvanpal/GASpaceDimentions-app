// App version - 1.0
import React from 'react'
import axios from 'axios'
import './App.css'
import PropertyList from './Components/PropertyList.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import googleLogo from './images/google-logo.jpg'

export default class App extends React.Component {
  state = {
    username: '',
    userid: '',
    profilePic: '',
  }

  getUserData = () => {
    axios.get('/protected')
      .then((response) => {
        console.log('check for the user here', response.data)
        this.setState({
          username: response.data.displayName,
          userid: response.data.id,
          profilePic: response.data.picture
        })
        // console.log("data has been recieved for propertys")
        // console.log(response.data)
        // window.location.href = '/home'
      })
      .catch(() => {
        console.log('could not get the users data!')
      })
  }

  componentDidMount() {
    this.getUserData()
  }

  login = () => {
    fetch("/auth/google")
      .then(res => {
        console.log(res.url)
        window.open(res.url, "_self")
      })
      .catch(err => err);
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {/* <a href='http://localhost:5001/google'><button>Login with google</button></a> */}
              <button onClick={this.login}><img src={googleLogo} style={{
                display: "inline-block",
                verticalAlign: "middle", marginRight: "10px", width: "30px", height: "30px"
              }} />
                <span >Login with google</span>
              </button>
            </Route>

            <Route path="/home" component={() => <PropertyList username={this.state.username}
              userid={this.state.userid}
              profilePic={this.state.profilePic} />} />
          </Switch>
        </BrowserRouter>

      </div >
    )
  }
}