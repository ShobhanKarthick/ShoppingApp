import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuantityInput from './QuantityInput'

function HomeProducts(props) {

    const [allProducts, setAllProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [search, setSearch] = useState('')
    const [user, setUser] = useState('')
  
    useEffect(() => {
      axios.get("/users/authuser")
      .then(response => {
        setUser(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }, [])

    useEffect(() => {
        axios.get('/products')
        .then(response => {
            setAllProducts(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        axios.get('/products/categories')
        .then(response => {
            setAllCategories(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const searchHandler = (event) => {
        setSearch(event.target.value);
    }
    const quantityGetter = (product) => {
        if (user) {
            const index = user.cart.map(cart => cart.item._id).indexOf(product._id)
            if (index !== -1) {
                return user.cart[index].quantity
            }
        }
    }


    return (
        <div className="home-products">
            <div className="home-search-container">
                <input className="home-search-input" type="text" placeholder="Search..." value={search} onChange={searchHandler}/>
            </div>
        <div className="home-products-container">
        {
            allCategories.map((category, categoryIndex) => {
                return (
                <React.Fragment key={categoryIndex}>
                <h1 className="home-category-name">{category}</h1>
                <div className="home-products-items-container">
                {
                allProducts.map((product, productIndex) => {
                    if(product.category.includes(category)){
                        return (
                            <React.Fragment key={productIndex}>
                                <div className="home-products-items">
                                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                                    <p>{product.title}</p>
                                    <div className="product-bottom">
                                        <p>MRP Rs. {product.MRP}</p>
                                        <QuantityInput user={user} product={product} quantity={quantityGetter(product)}/>
                                    </div>
                                    </div>
                            </React.Fragment>
                        )}
                    })
                }
                </div>
                </React.Fragment>
                )}
        )}


        </div>

        </div>
    )
}

export default HomeProducts
