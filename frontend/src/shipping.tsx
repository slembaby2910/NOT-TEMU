import "./app.css"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./cartholder.tsx";
import { getUser } from "./auth";
import { checkout } from "./api";

export default function Shipping() {
    const { cartItems, setCartItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const { total } = location.state || { total: 0 };

    const handlePayNow = async () => {
        const user = getUser();

        if (!user) {
            alert("You must be logged in to place an order.");
            navigate("/login");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

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
                            <Link to="/checkout" className="edit-btn">Edit</Link>
                        </div>
                        <div className="review-row">
                            <span className="label">Ship to</span>
                            <span className="value"> </span>
                            <Link to="/checkout" className="edit-btn">Edit</Link>
                        </div>
                        <div className="review-row no-border">
                            <span className="label">Method</span>
                            <span className="value"></span>
                            <Link to="/checkout" className="edit-btn">Edit</Link>
                        </div>
                    </div>

                    <section className="payment-section">
                        <h2>Payment method</h2>
                        <div className="payment-option selected">
                            <label className="option-label">
                                <input type="radio" name="payment" defaultChecked />
                                <span className="option-text">Credit Card</span>
                            </label>
                            <div className="card-details-form">
                                <input type="text" placeholder="Card Number" />
                                <input type="text" placeholder="Holder Name" />
                                <div className="form_shipping">
                                    <input type="text" placeholder="Expiration (MM/YY)" />
                                    <input type="text" placeholder="CVV" />
                                </div>
                            </div>
                        </div>
                        <div className="payment-option">
                            <label className="option-label">
                                <input type="radio" name="payment" />
                                <span className="option-text">Mobilepay</span>
                            </label>
                        </div>
                    </section>

                    <div className="form-footer">
                        <Link to="/checkout" className="back-link">Back to details</Link>
                        <button className="pay-now-btn" onClick={handlePayNow}>Pay now</button>
                    </div>
                </div>

                <aside className="checkout-sidebar">
                    {cartItems.map((item: any) => (
                        <div key={item.id} className="cart-item-summary">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">€ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="coupon-row">
                        <input type="text" placeholder="Coupon code" />
                        <button className="add-code-btn">Add code</button>
                    </div>

                    <div className="price-lines">
                        <div className="line">
                            <span>Subtotal</span>
                            <span>€ {total.toFixed(2)}</span>
                        </div>
                        <div className="line">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>

                    <div className="total-line">
                        <span>Total</span>
                        <span className="total-amt">€ {total.toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}
