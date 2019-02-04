import React from 'react'

import SponsoredIcon from './SponsoredIcon'
import RemoteIcon from './RemoteIcon'
import HeartIcon from './HeartIcon'

const { NumberFormat } = Intl
const fmt = (amount, currency) =>
  new NumberFormat('en-US', {
    currency,
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(amount / 1000)

export default class extends React.Component {
  state = { liked: false }
  render = () => {
    const { hit } = this.props
    return (
      <div className="card">
        <div className="job">
          <HeartIcon
            onClick={() => this.setState(({ liked }) => ({ liked: !liked }))}
            className={`small-icon job-icon ${this.state.liked ? 'liked' : ''}`}
          />
          <img src={hit.logo} alt="logo" />
          <br />
          <strong>{hit.title}</strong>
          <div>{hit['company-name']}</div>
          <div>
            {hit.location &&
              hit.location.city &&
              hit.location.country &&
              `${hit.location.city}, ${hit.location.country}`}
          </div>
          <div className="perks">
            {hit['sponsorship-offered'] && (
              <div>
                <SponsoredIcon /> Sponsorship
              </div>
            )}
            {hit.remote && (
              <div>
                <RemoteIcon /> Remote
              </div>
            )}
          </div>
          {hit.remuneration && (
            <div className="salary">
              {hit.remuneration.competitive
                ? 'Competitive'
                : `${fmt(
                    hit.remuneration.min,
                    hit.remuneration.currency
                  )}K - ${fmt(
                    hit.remuneration.max,
                    hit.remuneration.currency
                  )}K`}
            </div>
          )}
          <ul>
            {hit.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div>{hit.tagline}</div>
        </div>
        <div className="btns">
          <button className="btn">More Info</button>
          <button className="btn">1-Click-Apply</button>
        </div>
      </div>
    )
  }
}
