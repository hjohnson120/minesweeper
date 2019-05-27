import React, { Component } from 'react'

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

  render() {
    return (
      <>
        <div>
          <table>
            <tbody>
              {this.state.game.board.map((row, i) => {
                return (
                  <tr key={i}>
                    {row.map((col, j) => {
                      return (
                        <td key={j} className="data">
                          {this.state.game.board[i][j]}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default App
