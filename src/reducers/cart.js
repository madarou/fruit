import * as types from '../constants/ActionTypes'
import {assign} from '../utils/Object'

const initialState = {
  total:0,
  count:0,
  position:null,
  editing:false,
  goods:[]
}

function _add(state,item,cnt){
  let goods = [], exsit = false
  state.goods.map(g=>{
    if(g.id===item.id){
      exsit=true
      g.count+=cnt
      state.count+=cnt
      state.total+=cnt*g.price
    }
    g.count>0 && ( goods.push(assign({},g)) )
  })
  if(!exsit){
    goods.push(assign({},item,{count:cnt}))
    state.total+=cnt*item.price
    state.count+=cnt
  }
  return goods
}

export default function cart(state = initialState, action){
  switch (action.type) {
    case types.CART_UPDPOS:
      return assign({},state,{
        position:action.val
      })
    case types.CART_EDIT:
      return assign({},state,{
        editing:!state.editing
      })
    case types.CART_ADD:
      let {item,val} = action.val
      return assign({},state,{
        goods:_add(state,item,val)
      })
    case types.CART_CLEAR:
      return assign({},initialState,{
        position:state.position
      })
    default:
      return state
  } 
}