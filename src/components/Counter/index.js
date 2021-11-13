import {Component} from 'react'
import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai'

import './index.css'

class Counter extends Component {
  state = {count: 1}

  changed = () => {
    const {count} = this.state
    const {getNum} = this.props
    getNum(count)
  }

  onIncrement = () => {
    this.setState(prevState => {
      if (prevState.count >= 20) {
        return {count: 20}
      }
      return {count: prevState.count + 1}
    }, this.changed)
  }

  onDecrement = () => {
    this.setState(prevState => {
      if (prevState.count <= 1) {
        return {count: 1}
      }
      return {count: prevState.count - 1}
    }, this.changed)
  }

  render() {
    const {count} = this.state
    return (
      <div className="only-flex">
        <button
          type="button"
          onClick={this.onDecrement}
          className="counter-but"
        >
          <AiFillLeftCircle
            style={{color: 'white', width: '40px', height: '40px'}}
          />
        </button>
        <div>{count} of 20</div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="counter-but"
        >
          <AiFillRightCircle
            style={{color: 'white', width: '40px', height: '40px'}}
          />
        </button>
      </div>
    )
  }
}

export default Counter
