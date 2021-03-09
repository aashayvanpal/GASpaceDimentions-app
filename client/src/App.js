import React from 'react'
import axios from 'axios'
import './App.css'

export default class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: []
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  getBlogData = () => {
    axios.get('/api')
      .then((response) => {
        this.setState({
          posts: response.data
        })
        console.log("data has been recieved")
        console.log(response.data)

      })
      .catch(() => {
        alert('could not get the data!')
      })
  }

  submit = (event) => {
    event.preventDefault()

    const payload = {
      title: this.state.title,
      body: this.state.body
    }

    axios({
      url: '/api/save',
      data: payload,
      method: 'POST'
    })
      .then(() => {
        console.log("data has been sent to the server")
        this.resetUserInputs()
        this.getBlogData()

      })
      .catch(() => {
        console.log("error in sending the data")

      })

  }

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    })
  }

  displayBlogPosts(posts) {

    if (!posts.length) return null

    return posts.map((post, index) => (
      <div key={index} className="blog-post_display">
        <h3>{index + 1}. {post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  }

  componentDidMount() {
    this.getBlogData()
  }

  render() {
    // console.log('state:', this.state)
    return (
      <div className="app">
        <h2>This is a MERN deployed App </h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              placeholder="body"
              cols="30" rows="10"
              value={this.state.body}
              onChange={this.handleChange}>

            </textarea>
          </div>
          <button>Submit</button>
        </form>
        <div className="blog-post">
          {this.displayBlogPosts(this.state.posts)}
        </div>
      </div>
    )
  }
}