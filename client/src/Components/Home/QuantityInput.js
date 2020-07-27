import React, {useState} from 'react'
import axios from 'axios';

function QuantityInput(props) {

    const [quantity, setQuantity] = useState(1)
    
    const quantityHandler = (event) => {
        setQuantity(event.target.value);
    }

    const addProduct = () => {

        let details = {
            id: props.user._id,
            item: props.product._id,
            quantity: quantity
        }

        axios.post("/users/addtocart", details)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))

    }


    return (
        <div className="product-bottom-row">
            <label>Qty</label>
            <input id={props.product._id} type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
            <button onClick={addProduct}>ADD</button>
        </div>
    )
}

export default QuantityInput
