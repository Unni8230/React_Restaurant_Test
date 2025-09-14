import './App.css'
import {Component} from 'react'
import Home from './components/Home'
import RestaurantContext from './context/RestaurantContext'

let categories = []
class App extends Component {
  state = {
    cart: [],
    categories: [],
    activeCategory: 'From The Barnyard',
    allProducts: [],
  }

  componentDidMount() {
    this.fetchCartItems()
  }

  changeActiveCategory = category => {
    this.setState({
      activeCategory: category,
    })
  }

  addItemstoCart = item => {
    console.log(item.count)
    const {cart} = this.state
    const isalready = cart.some(each => each.dish_id === item.dish_id)
    if (!isalready) {
      this.setState(prev => ({
        cart: [...prev.cart, item],
      }))
    } else {
      this.setState(prev => ({
        cart: prev.cart.map(each =>
          each.dish_id === item.dish_id
            ? {...each, count: each.count + 1}
            : each,
        ),
      }))
    }
  }

  fetchCartItems = async () => {
    const productsUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const fetchProductDetailsResponse = await fetch(productsUrl)
    const productsData = await fetchProductDetailsResponse.json()
    const productItems = productsData[0].table_menu_list
    const allProductsDetails = productItems.map(each => ({
      ...each,
      category_dishes: each.category_dishes.map(item => ({
        ...item,
        count: 1,
      })),
    }))
    categories = productItems.map(each => each.menu_category)
    this.setState({
      allProducts: allProductsDetails,
      categories,
    })
  }

  render() {
    const {categories} = this.state
    const {cart, activeCategory, allProducts} = this.state
    console.log(cart)
    return (
      <RestaurantContext.Provider
        value={{
          cart,
          addItemsToCart: this.addItemstoCart,
          categories,
          activeCategory,
          changeActiveCategory: this.changeActiveCategory,
          allProducts,
        }}
      >
        <Home />
      </RestaurantContext.Provider>
    )
  }
}
export default App
