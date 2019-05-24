import React, { Component } from 'react'
import HelloWorld from './components/HelloWorld'

class App extends Component {
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
        <HelloWorld />
        {/* <div>
          <table>
            {this.state.newGame.board.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((col, j) => {
                    return <td key={j}>{this.state.newGame.board[i][j]}</td>
                  })}
                </tr>
              )
            })}
          </table>
        </div> */}
      </>
    )
  }
}

export default App
