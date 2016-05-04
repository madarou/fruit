import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../actions/cart'

import CartBottom from '../components/CartBottom'
import CartDetail from '../components/CartDetail'
import CartBlock from '../components/CartBlock'

class CartBuy extends Component {
  edit(){
    let { actions } = this.props
    actions.edit()
  }
  render() { 
    let { name, head, points, cart } = this.props  
    return (
      <div className='cart-buy'>
        <CartDetail cart={cart} edit={this.edit.bind(this)}/>
        <CartBlock til1="送货" til2="方式"></CartBlock>
        <CartBlock til1="收货" til2="信息"></CartBlock>
        <CartBlock til1="付款" til2="方式"></CartBlock>
        <CartBlock til1="收货" til2="时间"></CartBlock>
        <CartBottom />
      </div>
    )
  }
}

CartBuy.propTypes = {
  points: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  head: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  const {
    points,
    name,
    head,
  } = state.me;
  
  const cart = state.cart
  
  return {
    points,
    name,
    head,
    cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartBuy)