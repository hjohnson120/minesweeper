import React, { Component } from 'react'

const gameUrl = 'https://minesweeper-api.herokuapp.com/'

class App extends Component {
  state = {
    game: { board: [] }
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
          game: newGame
        })
        console.log({ newGame })
      })
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
      .then(newPlaying => {
        this.setState({
          game: newPlaying
        })
        console.log({ newPlaying })
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
      .then(flagPicked => {
        this.setState({
          game: flagPicked
        })
        console.log({ flagPicked })
      })
  }

  render() {
    return (
      <>
        <main>
          <body className="table">
            <table>
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
                            onContextMenu={event =>
                              this.flaggedCell(event, i, j)
                            }
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
          </body>
        </main>
      </>
    )
  }
}

export default App
