import React, { useState, useEffect } from 'react'
import axios from 'axios'

function HomeProducts(props) {

    const [allProducts, setAllProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [search, setSearch] = useState('')
    const [quantity, setQuantity] = useState(1)

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
    
    const quantityHandler = (event) => {
        setQuantity(event.target.value);
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
                allProducts.map((products, productsIndex) => {
                    if(products.category.includes(category)){
                        return (
                            <React.Fragment key={productsIndex}>
                                <div className="home-products-items">
                                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                                    <p>{products.title}</p>
                                    <div className="product-bottom">
                                        <p>MRP Rs. {products.MRP}</p>
                                        <div className="product-bottom-row">
                                            <label>Qty</label>
                                            <input id={products._id} type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
                                            <button>ADD</button>
                                        </div>
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
