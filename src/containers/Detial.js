import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as cartActions from '../actions/cart'
import * as detailActions from '../actions/detail'

import NavBack from '../components/NavBack'
import DetialBottom from '../components/detial/DetialBottom'
import DetialBody from '../components/detial/DetialBody'
import Comment from '../components/detial/Comment'

class Detial extends Component {
  componentDidMount() {
  }
  showCmt(){
    let cmt = this.refs.cmt
    cmt.className='modal show'
  }
  hideCmt(e){
    let cmt = this.refs.cmt
    if(e.target.className.indexOf('comment')){
      cmt.className='modal'    
    }
  }
  like(){
    let {detailActions,item} = this.props
    if(!item.like){
      detailActions.like(item.id)
    }else{
      detailActions.unlike(item.id)
    }
  }
  add(cnt){
    let { actions, item } = this.props
    actions.add(item,cnt)
  }
  render() { 
    let {history,item,cart} = this.props
    let good = cart.goods.filter(g=>{
      return g.id===item.id
    })

    return (
      <div className="detial">
        <NavBack  history={history}/>
        <DetialBody showCmt={this.showCmt.bind(this)} item={item} like={this.like.bind(this)}/>
        <DetialBottom num={good.length?good[0]['count']:0} history={this.props.history} add={this.add.bind(this)}/>
        <div className="modal" ref="cmt" onClick={this.hideCmt.bind(this)}>
          <Comment />
        </div>
      </div>
    )
  }
}

Detial.propTypes = {
  item: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(cartActions, dispatch),
    detailActions: bindActionCreators(detailActions, dispatch),
  }
}

function mapStateToProps(state) {
  let item = state.detail,
      cart = state.cart
  return {
    item,
    cart,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detial)