import React, { Component } from 'react'

export default class Cart extends Component{
  go(){
    let {history} = this.props
    history.push('/cart')
  }
  render() {
    let { total } = this.props
    return (
      <div className="cart-bottom" onClick={this.go.bind(this)}>
        <i></i>
        <span className="total">￥{total}</span>
      </div>
    )
  }
}