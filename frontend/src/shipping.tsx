import "./app.css"
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "./cartholder.tsx";
import { getUser } from "./auth";
import { checkout } from "./api";

export default function Shipping() {
    const { cartItems, setCartItems } = useCart();
    const navigate = useNavigate();

    const handlePayNow = async () => {
        const user = getUser();


        const items = cartItems.map((i: any) => ({
            productId: i.id,
            quantity: i.quantity,
        }));

        try {
            const order = await checkout(user.id, items);
            setCartItems([]);
            alert(`Order #${order.id} placed!`);
            navigate("/catalog");
        } catch (err: any) {
            alert(err.error || "Checkout failed");
        }
    };


    return (
        <div className="checkout">
            <div className="checkout-container">

                <div className="checkout-main">
                    <header className="checkout-header">
                        <img src={"icons/logo.jpg"} alt="not-temu" />
                        <nav className="breadcrumb">
                            <span>Cart</span> &gt; <span>Details</span> &gt; <b>Shipping</b> &gt; <span>Payment</span>
                        </nav>
                    </header>


                    <div className="info-review-box">
                        <div className="review-row">
                            <span className="label">Contact</span>
                            <span className="value"> </span>
                            <Link to = "/checkout" className="edit-btn">
                                <button className="edit-btn">Edit</button>
                            </Link>

                        </div>
                        <div className="review-row">
                            <span className="label">Ship to</span>
                            <span className="value">   </span>
                            <Link to = "/checkout" className="edit-btn">
                                <button className="edit-btn">Edit</button>
                            </Link>
                        </div>
                        <div className="review-row no-border">
                            <span className="label">Method</span>
                            <span className="value"></span>
                            <button className="edit-btn">Edit</button>
                        </div>
                    </div>

                    <section className="payment-section">
                        <h2>Payment method</h2>

                        <div className="payment-option selected">
                            <label className="option-label">
                                <input type="radio" name="payment" defaultChecked />
                                <div className="option-content">
                                    <span className="option-text">Credit Card</span>
                                </div>
                            </label>

                            <div className="card-details-form">
                                <input type="text" placeholder="Card Number" className="full-width icon-lock" />
                                <input type="text" placeholder="Holder Name" className="full-width" />
                                <div className="form_shipping">
                                    <input type="text" placeholder="Expiration (MM/YY)" />
                                    <input type="text" placeholder="CVV" />
                                </div>
                            </div>
                        </div>

                        <div className="payment-option">
                            <label className="option-label">
                                <input type="radio" name="payment" />
                                <div className="option-content">
                                    <span className="option-text">Mobilepay</span>
                                </div>
                            </label>
                        </div>
                    </section>

                    <div className="form-footer">
                        <Link to="/checkout" className="back-link">Back to shipping</Link>
                        <button className="pay-now-btn" onClick={handlePayNow}>Pay now</button>
                    </div>
                </div>


                <aside className="checkout-sidebar">
                    <div className="cart-item-summary">
                        <div className="item-thumb">
                            <img src=" " alt="item" />
                            <span className="qty-badge">1</span>
                        </div>
                        <span className="item-name"> </span>
                        <span className="item-price"> </span>
                    </div>

                    <div className="coupon-row">
                        <input type="text" placeholder="Coupon code" />
                        <button className="add-code-btn">Add code</button>
                    </div>

                    <div className="price-lines">
                        <div className="line">
                            <span>Subtotal</span>
                            <span>€ 9.99</span>
                        </div>
                        <div className="line">
                            <span>Shipping</span>
                            <span>Free Shipping</span>
                        </div>
                    </div>

                    <div className="total-line">
                        <span>Total</span>
                        <span className="total-amt">€ 9.99</span>
                    </div>
                </aside>
            </div>
        </div>
    )
}