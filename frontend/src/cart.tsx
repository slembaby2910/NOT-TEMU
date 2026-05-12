import './app.css'
import { Link } from "react-router-dom";
import {useState} from "react";


const cart_items = [
    {
        id: 1,
        name: "Spiced Mint",
        price: 9.99,
        quantity: 1,
        image: ""
    }
];
export default function Cart() {

    const [cartItems, setCartItems] = useState(cart_items)

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    }

    const remove = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    let summa = cartItems.reduce(
        (summa, item) =>  summa + item.price * item.quantity, 0

    );

    return(
        <div className="cart">
            <header className="catalog-header">
                <Link to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="logo">Not-temu</div>
                </Link>
                <div className="header-icons">
                    <span>👤</span>
                    <span>🛒</span>
                </div>
            </header>

            <main className="cart-main">
                <h1 className="cart-title">Your cart items</h1>
                <Link to="/catalog" className="back-link">Back to shopping</Link>

                <div className="cart-table">
                    <div className="cart-table-header">
                        <span className="col-product">Product</span>
                        <span className="col-price">Price</span>
                        <span className="col-quantity">Quantity</span>
                        <span className="col-total">Total</span>
                    </div>


                </div>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="col-product cart-item-info">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <button
                                    className="remove-btn"
                                    onClick={() => remove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                        <span className="col-price">€ {item.price.toFixed(2)}</span>
                        <div className="col-quantity">
                            <div className="quantity-selector">
                                <button
                                    className="qty-btn"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                    −
                                </button>
                                <input
                                    type= "number"
                                    min= "1"
                                    value= {item.quantity}
                                    onChange= {(e) =>
                                        handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                                    }
                                />
                                <button
                                    className= "qty-btn"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <span className= "col-total">{ summa = Number((item.price * item.quantity).toFixed(2)) } €</span>
                    </div>
                ))}

                <div className= "cart-summary" >
                    <div className= "summary-totals" >
                        <div className= "subtotal-row">
                            <span className= "subtotal-label">Total cost:</span>
                            <span className= "subtotal-value"> {summa.toFixed(2)} €</span>
                        </div>
                        <p className= "tax-note" >Tax and shipping cost not included</p>
                    </div>
                    <button className="checkout-btn">Check-out</button>
                </div>
            </main>
        </div>
    )
}