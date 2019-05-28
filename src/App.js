import React, { Component } from 'react'
import Header from './components/Header'

const gameUrl = 'https://minesweeper-api.herokuapp.com/'

class App extends Component {
  state = {
    game: { board: [] },
    message: ''
  }

  componentDidMount() {
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
          message: newGame.state
        })
        console.log({ newGame })
      })
  }

  whatsYourStat() {
    if (this.state.game.state === 'won') {
      this.setState({
        message: 'Bomb.com You Win!!'
      })
    } else if (this.state.game.state === 'lost') {
      this.setState({
        message: 'Well That Blew Up On Ya.. You Lose!'
      })
    } else {
      this.setState({
        message: 'Tik Tok, Tik Tok'
      })
    }
  }

  cellClick = (row, col) => {
    console.log('clicked', row, col)
    fetch(`${gameUrl}games/${this.state.game.id}/check`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ row: row, col: col })
    })
      .then(resp => {
        return resp.json()
      })
      .then(newGame => {
        this.setState({
          game: newGame,
          message: newGame.state
        })
        console.log({ newGame })
        this.whatsYourStat()
      })
  }

  flaggedCell = (event, row, col) => {
    console.log('clicked', row, col)
    event.preventDefault()
    fetch(`${gameUrl}games/${this.state.game.id}/flag`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ row: row, col: col })
    })
      .then(resp => {
        return resp.json()
      })
      .then(currentGameState => {
        this.setState({
          game: currentGameState,
          message: currentGameState.state
        })
        console.log({ currentGameState })
      })
  }

  playAgain() {}

  render() {
    return (
      <>
        <section>
          <Header />
          <table className="table-style">
            <tbody>
              {this.state.game.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((col, j) => {
                      return (
                        <td
                          key={j}
                          className="data"
                          onClick={() => this.cellClick(i, j)}
                          onContextMenu={event => this.flaggedCell(event, i, j)}
                        >
                          {this.state.game.board[i][j]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h1>{this.state.message}</h1>
          <div className="play-again">
            <button onClick={this.playAgain()}>Play Again?</button>
          </div>
        </section>
      </>
    )
  }
}

export default App
