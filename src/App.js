import React from 'react'

import './App.css'
import Card from './Card'

export default class extends React.Component {
  state = { query: '', hits: [] }

  render = () => (
    <div className="App">
      <h1>Welcome to FunctionalWorks Pair Programming!</h1>
      <input
        className="search"
        type="text"
        defaultValue={this.state.query}
        onChange={e => {
          this.setState({ query: e.target.value })
          fetch('https://MVK698T35T-dsn.algolia.net/1/indexes/dev_jobs/query', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Algolia-API-Key': '11b4f5ffdbe095d0c1c69c5051bff2de',
              'X-Algolia-Application-Id': 'MVK698T35T',
            },
            body: JSON.stringify({ params: `query=${this.state.query}` }),
          })
            .then(res => res.json())
            .then(({ hits }) => console.log(hits) || this.setState({ hits }))
        }}
      />
      <span>{this.state.data}</span>
      <div className="container">
        {this.state.hits.map(hit => (
          <Card key={hit.objectID} hit={hit} />
        ))}
      </div>
    </div>
  )
}
