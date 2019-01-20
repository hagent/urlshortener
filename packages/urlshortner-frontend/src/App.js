import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'

const Table = styled.table`
  border-collapse: collapse;

  & td {
    border: 1px solid grey;
  }
`

class App extends Component {
  state = {
    newUrl: {
      name: '',
      url: ''
    }
  }
  componentDidMount() {
    this.loadUrls()
  }

  async loadUrls() {
    const urlsResponse = await fetch('/url')
    const urls = await urlsResponse.json()
    this.setState({ urls })
  }

  render() {
    const { urls = [], newUrl } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter the url name"
            value={newUrl.name}
            onChange={this.handleChange('name')}
          />
          <input
            type="text"
            placeholder="Enter the url itself"
            value={newUrl.url}
            onChange={this.handleChange('url')}
          />
          <button type="submit" value="Submit">
            Add Shortcut
          </button>
        </form>
        {urls.length > 0 && (
          <Table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Url</td>
                <td>Short Url</td>
              </tr>
            </thead>
            <tbody>
              {urls.map(({ name, url, shortUrl }) => (
                <tr>
                  <td>{name}</td>
                  <td>{url}</td>
                  <td>{shortUrl}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    )
  }

  handleChange = field => e =>
    this.setState({
      newUrl: {
        ...this.state.newUrl,
        [field]: e.target.value
      }
    })

  handleSubmit = e => {
    e.preventDefault()
    this.submit()
  }

  async submit() {
    const newUrlResponse = await fetch('/url', {
      method: 'POST',
      body: JSON.stringify(this.state.newUrl)
    })
    const newUrlBackend = await newUrlResponse.json()
    this.setState({ urls: [newUrlBackend, ...this.state.urls] })
  }
}

export default App
