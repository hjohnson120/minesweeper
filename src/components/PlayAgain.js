import React, { Component } from 'react'

class PlayAgain extends Component {
  render() {
    return (
      <section className="play-again">
        <button onClick={() => this.props.playAgain()}>Play Again?</button>
      </section>
    )
  }
}

export default PlayAgain
