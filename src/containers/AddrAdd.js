import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NavBack from '../components/NavBack'
import CartBlock from '../components/CartBlock'
import AddrBottom from '../components/AddrBottom'

import * as addrActions from '../actions/address'

class AddrAdd extends Component {
  componentWillMount(){
    let {location,addrs,history} = this.props
    let id = location.query.id
    this.state={
      name:"",
      tel:"",
      addr:''
    }    
    if(!id){
      return 
    }
    let addr = addrs.filter(add=>id==add.id)[0]
    if(!addr){
      history.replace('/')
      return 
    }
    this.update=addr.id
    this.state={
      name: addr.name,
      tel: addr.tel,
      addr: addr.addr,
    }
  }
  setDefault(){
    this.props.actions.setDefault()
  }
  change(type,e){
    let v=e.target.value
    let refs = ['name','tel','addr']
    this.setState({[refs[type]]: v});
  }
  save(){
    let {actions,setDef,history} = this.props
    let {name,tel,addr} = this.refs
    let value = {
      name:name.value,
      tel:tel.value,
      addr:addr.value,
      moren:setDef,
    }
    if(this.update){
      this.props.actions.update(this.update,value)
    }else{
      this.props.actions.addSave(value)
    }
    history.go(-1)
  }
  render() { 
    let {history,qus,cities,NowCity,Nowqu,setDef,location,moren} = this.props
    if(!setDef && location.query.id == moren )
      setDef = true
    return (
      <div className="addr">
        <NavBack history={history}>
          <span className="tit">
            {
              this.update?
              "更改收货地址"
              :
              "新增收货地址"
            }
          </span>
        </NavBack>
        <ul className="add-list">
          <CartBlock til1="收货" til2="姓名">
            <input placeholder="请输入收货姓名" ref="name" value={this.state.name} onChange={this.change.bind(this,0)}/>
          </CartBlock>
          <CartBlock til1="手机" til2="号码">
            <input placeholder="请输入手机号码" ref="tel" value={this.state.tel} onChange={this.change.bind(this,1)}/>
          </CartBlock>
          <CartBlock til1="收货" til2="地址">
            <span className="dizhi">{cities.filter(c=>c.id===NowCity)[0].name}</span>
            <span className="dizhi">{qus[NowCity].filter(c=>c.id===Nowqu)[0].name}</span>
            <a><i className="fa fa-angle-right right"></i></a>
          </CartBlock>
          <CartBlock til1="具体" til2="地址">
            <input placeholder="请输入详细地址" ref="addr" value={this.state.addr} onChange={this.change.bind(this,2)}/>
          </CartBlock>
          <CartBlock til1="设为" til2="默认">
            <span className="icon" onClick={this.setDefault.bind(this)}>
              <i className={setDef ? "fa fa-dot-circle-o":"fa fa-circle-o"}></i>
            </span>
          </CartBlock>
        </ul>
        <AddrBottom desc="保存" action={this.save.bind(this)}/>
      </div>
    )
  }
}

AddrAdd.propTypes = {
  addrs: PropTypes.array.isRequired,
  moren: PropTypes.number.isRequired,
  setDef: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const {
    addrs,
    moren,
    setDef,
  } = state.address;
  const {
    NowCity,
    Nowqu,
    cities,
    qus,
  } = state.city
  
  return {
    addrs,
    moren,
    setDef,
    cities,
    qus,
    Nowqu,
    NowCity
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(addrActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddrAdd)