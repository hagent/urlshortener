import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'

const Main = styled.div`
  padding: 20px;
`

const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;

  & td {
    border: 1px solid grey;
    padding: 5px 20px;
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
    this.loadBaseUrl()
  }

  async loadUrls() {
    const urls = await fetch('/url').then(x => x.json())
    this.setState({ urls })
  }

  async loadBaseUrl() {
    const { baseRedirectUrl } = await fetch('/config').then(x => x.json())
    this.setState({ baseRedirectUrl })
  }

  render() {
    const { urls = [], newUrl, baseRedirectUrl } = this.state
    return (
      <Main>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter an url alias name"
            value={newUrl.name}
            onChange={this.handleChange('name')}
          />
          <input
            type="text"
            placeholder="Enter an url"
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
              {urls.map(({ id, name, url, shortUrl }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>
                    <a target="_about" href={url}>
                      {url}
                    </a>
                  </td>
                  <td>
                    <a target="_about" href={baseRedirectUrl + shortUrl}>
                      {baseRedirectUrl + shortUrl}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Main>
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
    const newUrlBackend = await fetch('/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.newUrl)
    }).then(x => x.json())
    this.setState({ urls: [newUrlBackend, ...this.state.urls] })
  }
}

export default App
