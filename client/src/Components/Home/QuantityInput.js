import React, {useState, useEffect} from 'react'
import axios from 'axios';

function QuantityInput(props) {

    const [quantity, setQuantity] = useState(1)
    
    const quantityHandler = (event) => {
        setQuantity(event.target.value);
    }

    useEffect(() => {
        if(quantity > 1){
            document.getElementById("add-item").style.display = "none"
            document.getElementById("increase-item").style.display = "block"
            document.getElementById("decrease-item").style.display = "block"
        }
        else{
            document.getElementById("add-item").style.display = "block"
            document.getElementById("increase-item").style.display = "none"
            document.getElementById("decrease-item").style.display = "none"
        }
    }, [quantity])

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

    const decreaseItem = () => {
        setQuantity(quantity - 1)
    }

    const increaseItem = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div className="product-bottom-row">
            <label>Qty</label>
            <button onClick={decreaseItem} id="decrease-item">-</button>
            <input id={props.product._id} type="text" pattern="[0-9]{2}" maxLength="2" title="Maximum quantiy of 99" placeholder="Qty" value={quantity} onChange={quantityHandler}/>
            <button onClick={increaseItem} id="increase-item">+</button>
            <button id="add-item" onClick={addProduct}>ADD</button>
        </div>
    )
}

export default QuantityInput
