import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <div>
        <table className="table-style">
          <tbody>
            {this.props.game.board.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((col, j) => {
                    return (
                      <td
                        key={j}
                        className="data"
                        onClick={() => this.props.cellClick(i, j)}
                        onContextMenu={event =>
                          this.props.flaggedCell(event, i, j)
                        }
                      >
                        {this.props.game.board[i][j]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <h1>{this.props.message}</h1>
      </div>
    )
  }
}

export default Cell
