import React, { Component } from 'react'
import Header from './components/Header'
import Cell from './components/Cell'

class App extends Component {
  state = {
    game: { board: [] },
    message: ''
  }

  playAgain() {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(resp => {
        return resp.json()
      })
      .then(newGame => {
        this.setState({
          game: newGame,
          message: ''
        })
        console.log({ newGame })
      })
  }

  render() {
    return (
      <>
        <section>
          <Header />
          <Cell />
          <div className="play-again">
            <button onClick={() => this.playAgain()}>Play Again?</button>
          </div>
        </section>
      </>
    )
  }
}

export default App
