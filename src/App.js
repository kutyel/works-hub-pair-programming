import React, { useState } from 'react'

import Card from './Card'
import headers from './config.json'

export default () => {
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState([])

  return (
    <div className="App">
      <h1>Welcome to FunctionalWorks Pair Programming!</h1>
      <input
        className="search"
        type="text"
        defaultValue={query}
        onChange={e => {
          setQuery(e.target.value)
          fetch('https://MVK698T35T-dsn.algolia.net/1/indexes/dev_jobs/query', {
            method: 'POST',
            headers,
            body: JSON.stringify({ params: `query=${query}` }),
          })
            .then(res => res.json())
            .then(({ hits }) => setHits(hits))
        }}
      />
      <div className="container">
        {hits.map(hit => (
          <Card key={hit.objectID} hit={hit} />
        ))}
      </div>
    </div>
  )
}
