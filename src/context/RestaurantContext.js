import React from 'react'

const RestaurantContext = React.createContext({
  cart: [],
  addItemsToCart: () => {},
  categories: [],
  activeCategory: '',
  changeActiveCategory: () => {},
  allProducts: [],
})
export default RestaurantContext
