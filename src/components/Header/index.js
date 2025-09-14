import './index.css'
import {IoCartOutline} from 'react-icons/io5'
import RestaurantContext from '../../context/RestaurantContext'

const Header = () => (
  <RestaurantContext.Consumer>
    {value => {
      const {cart} = value
      const cartLength = cart.length
      return (
        <div className="header-main-container">
          <h1 className="header-heading">UNI Resto Cafe</h1>
          <div className="header-cart-logo-section">
            <IoCartOutline className="cart-logo" />
            <p className="cart-items-count">{cartLength}</p>
          </div>
        </div>
      )
    }}
  </RestaurantContext.Consumer>
)
export default Header
