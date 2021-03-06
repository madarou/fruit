import React, { Component, PropTypes } from 'react'
import ReactDom from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NavBack from '../components/NavBack'

class CouponDetail extends Component {
  render() {
    let { history, detail } = this.props
    return (
      <div className="coupon-det">
        <NavBack history={history} white={true}>
          <span>代金券详情</span>
        </NavBack>
        <div className="img block">
          <img src={detail.img2} />
        </div>
        <div className="block">
          <ul>
            <li>
              <span className="tit left">
                优惠金额：
              </span>
              <span className="desc left">
                {detail.discount}
              </span>
              <p className="clear"></p>
            </li>
            <li>
              <span className="tit left">
                有效期：
              </span>
              <span className="desc left">
                {detail.time}到{detail.deadline}
              </span>
              <p className="clear"></p>
            </li>
            <li>
              <span className="tit left">
                使用限制：
              </span>
              <span className="desc left">
                {detail.qianti}
              </span>
              <p className="clear"></p>
            </li>
            <li>
              <span className="tit left">
                获取日期：
              </span>
              <span className="desc left">
                {detail.time}
              </span>
              <p className="clear"></p>
            </li>
            <li>
              <span className="tit left">
                优惠券说明：
              </span>
              <span className="desc left">
                {detail.detail}
              </span>
              <p className="clear"></p>
            </li>          
          </ul>        
        </div>
      </div>
    )
  }
}

CouponDetail.propTypes = {
  detail: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {
    detail,
  } = state.coupon;
  
  return {
    detail,
  }
}

export default connect(
  mapStateToProps
)(CouponDetail)