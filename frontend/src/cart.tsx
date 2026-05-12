import './app.css'
import { Link } from "react-router-dom";

import { useCart } from "./cartholder.tsx";


export default function Cart() {

    const { cartItems, setCartItems } = useCart();

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) {
            return;
        }

        setCartItems((prevItems: any[]) =>

            prevItems.map(item =>
                item.id === id ? {...item, quantity: newQuantity} : item
            )
        );
    }

    const remove = (id: number) =>
        setCartItems((prev: any[]) => prev.filter(item => item.id !== id));

    let summa = cartItems.reduce(
        (summa: number, item: { price: number; quantity: number; }) =>  summa + item.price * item.quantity, 0

    );

    return(
        <div className="cart">
            <header className="cart-header">


                <Link to="/catalog">
                    <img src = {"icons/logo.jpg"} alt = "not-temu" />
                </Link>
            </header>

            <main className="cart-main">
                <h1 className="cart-title">Your cart items</h1>
                <Link to="/catalog" className="back-link">
                    Back to shopping
                </Link>

                <div className="cart-table">
                    <div className="cart-table-header">

                        <span className="col-product">Product</span>
                        <span className="col-price">Price</span>
                        <span className="col-quantity">Quantity</span>
                        <span className="col-total">Total</span>

                    </div>


                </div>
                {cartItems.map((item : any) => (
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
                                <button className= "qty-btn" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                            </div>
                        </div>
                        <span className= "col-total">{
                            summa = Number((item.price * item.quantity).toFixed(2)) } €
                        </span>
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
                    <Link to="/checkout" state= {{total : summa }}>
                        <button className="checkout-btn">Check-out</button>
                    </Link>

                </div>
            </main>
        </div>
    )
}