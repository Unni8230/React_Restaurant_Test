import {Component} from 'react'
import Header from '../Header'
import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

class Home extends Component {
  state = {
    count: 0,
  }
  render() {
    return (
      <RestaurantContext.Consumer>
        {value => {
          const {
            allProducts,
            activeCategory,
            categories,
            addItemsToCart,
            changeActiveCategory,
          } = value

          let currentProducts = []
          if (allProducts.length > 0) {
            const currentProductsList = allProducts.filter(
              each => each.menu_category === activeCategory,
            )
            currentProducts = currentProductsList[0].category_dishes
          }
          return (
            <>
              <Header />
              <div className="restaurant-menu-bg-container">
                <ul className="categories-ul-list-container">
                  {categories.map(each => (
                    <li
                      className={`each-category-list-item ${
                        each === activeCategory ? 'active' : ''
                      }`}
                      key={each}
                      onClick={() => changeActiveCategory(each)}
                    >
                      {each}
                    </li>
                  ))}
                </ul>
                <ul className="current-products-display-container">
                  {currentProducts.map(each => (
                    <li className="each-product-list-item" key={each.dish_id}>
                      <div className="each-product-title-description-section">
                        <p className="each-product-title">{each.dish_name}</p>
                        <div className="each-product-currency-section">
                          <p className="each-product-currency-type">
                            {each.dish_currency}
                          </p>
                          <p className="each-product-price">
                            {each.dish_price}
                          </p>
                        </div>
                        <p className="each-product-description">
                          {each.dish_description}
                        </p>

                        <button
                          className="add-to-cart-btn"
                          onClick={() => addItemsToCart(each)}
                        >
                          Add to Cart
                        </button>

                        <p className="each-product-customization-text">
                          {each.addonCat.length > 0
                            ? 'Customizations available'
                            : ''}
                        </p>
                      </div>
                      <p className="each-product-calories-text">
                        {each.dish_calories} calories
                      </p>
                      <img
                        className="each-product-image"
                        src={each.dish_image}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}
export default Home
