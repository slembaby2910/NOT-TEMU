import "./app.css"
import {Link, useLocation} from "react-router-dom";
import { useCart } from "./cartholder";

export default function Checkout() {
    const location = useLocation();
    const { cartItems } = useCart();
    const { total } = location.state || { total: 0 };

    return(
        <div className="checkout">
            <div className="checkout-container">
                <div className="checkout-main">
                    <header className="checkout-header">
                        <img src = {"icons/logo.jpg"} alt = "not-temu" />
                        <nav className="breadcrumb">
                            <span>Cart</span> &gt; <b>Details</b> &gt; <span>Shipping</span> &gt; <span>Payment</span>
                        </nav>
                    </header>

                    <form className="checkout-form">
                        <section className="checkout-section">
                            <h2>Contact details</h2>
                            <input type="text" placeholder="Email or phone number" required />
                        </section>

                        <section>

                            <h3>Shipping information</h3>
                            <div className = "form_shipping">
                                <input type="text" placeholder="First name" required />
                                <input type="text" placeholder="Last name" required />
                            </div>
                            <input type="text" placeholder="Street address" required />
                            <input type="text" placeholder="Shipping notes (optional)"/>

                            <div className = "cityinfo">
                                <input type="text" placeholder="City" required />
                                <input type="text" placeholder="Zip code" required />
                            </div>
                            <select>
                                <option value ="notyet">Country/Region</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Finland">Finland</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Iceland">Iceland</option>
                                <option value="Norway">Norway</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Åland Islands">Åland Islands</option>
                            </select>

                            <label className="checkbox-container">
                                <input type="checkbox"/>
                                <span>Save my information for other orders</span>
                            </label>

                            <div className="form-footer">
                                <Link to="/cart" className="back-to-cart">Back to cart</Link>
                                <Link to ="/shipping">
                                    <button type="submit" className="continue-btn">Go to shipping</button>
                                </Link>

                            </div>
                        </section>
                    </form>
                </div>

                <aside className="checkout-sidebar">
                    <div className="summary-item">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="summary-details">
                                <span>{item.name}</span>
                                <span>€ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>


                    <div className="coupon-row">
                        <input type="text" placeholder="Coupon code" />
                        <button type="button" className="apply-btn">Add code</button>
                    </div>

                    <div className="price-lines">

                        <div className="line"><span>Subtotal</span> <span>€{total.toFixed(2)}</span></div>
                        <div className="line"><span>Shipping</span> <span></span></div>

                    </div>

                    <div className="total-line">
                        <span>Total</span>
                        <span className="total-amt">€{total.toFixed(2)}</span>
                    </div>
                </aside>
            </div>
        </div>
    )
}