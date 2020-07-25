import React, { useState } from 'react'

function HomeProducts() {

    // const [allProducts, setAllProducts] = useState([])
    const [search, setSearch] = useState('')
    const [quantity, setQuantity] = useState(1)


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
            <h1 className="home-category-name">Category 1</h1>
            <div className="home-products-items-container">
                <div className="home-products-items">
                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                    <p>Title</p>
                    <div className="product-bottom">
                        <p>MRP Rs. 99</p>
                        <div className="product-bottom-row">
                            <label>Qty</label>
                            <input type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
                            <button>ADD</button>
                        </div>
                    </div>
                </div>
                <div className="home-products-items">
                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                    <p>Title</p>
                    <div className="product-bottom">
                        <p>MRP Rs. 99</p>
                        <div className="product-bottom-row">
                            <label>Qty</label>
                            <input type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
                            <button>ADD</button>
                        </div>
                    </div>
                </div>
                <div className="home-products-items">
                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                    <p>Title</p>
                    <div className="product-bottom">
                        <p>MRP Rs. 99</p>
                        <div className="product-bottom-row">
                            <label>Qty</label>
                            <input type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
                            <button>ADD</button>
                        </div>
                    </div>
                </div>
                <div className="home-products-items">
                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                    <p>Title</p>
                    <div className="product-bottom">
                        <p>MRP Rs. 99</p>
                        <div className="product-bottom-row">
                            <label>Qty</label>
                            <input type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
                            <button>ADD</button>
                        </div>
                    </div>
                </div>
                <div className="home-products-items">
                    <img src={require('./../Images/product.webp')} alt="product-pic" />
                    <p>Title</p>
                    <div className="product-bottom">
                        <p>MRP Rs. 99</p>
                        <div className="product-bottom-row">
                            <label>Qty</label>
                            <input type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
                            <button>ADD</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}

export default HomeProducts
