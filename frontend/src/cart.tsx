import "./app.css";
import { Link } from "react-router-dom";
import { useCart } from "./cartholder.tsx";

export default function Cart() {
    const { cartItems, setCartItems } = useCart();

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setCartItems((prevItems: any[]) =>
            prevItems.map((item) => {
                if (item.id !== id) return item;

                const maxStock = Number(item.stockQuantity) || 1;
                const safeQuantity = Math.max(1, Math.min(newQuantity, maxStock));

                return { ...item, quantity: safeQuantity };
            })
        );
    };

    const remove = (id: number) => {
        setCartItems((prev: any[]) => prev.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce(
        (sum: number, item: any) => sum + Number(item.price) * item.quantity,
        0
    );

    const hasStockProblem = cartItems.some(
        (item: any) => item.quantity > Number(item.stockQuantity)
    );

    return (
        <div className="cart-page">
            <header className="cart-header">
                <Link to="/catalog">
                    <img src="icons/logo.jpg" alt="not-temu" />
                </Link>
            </header>

            <main className="cart-main">
                <h1 className="cart-title">Your cart items</h1>

                <Link to="/catalog" className="back-link">
                    Back to shopping
                </Link>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className="cart-table">
                            <div className="cart-table-header">
                                <span className="col-product">Product</span>
                                <span className="col-price">Price</span>
                                <span className="col-quantity">Quantity</span>
                                <span className="col-total">Total</span>
                            </div>

                            {cartItems.map((item: any) => {
                                const lineTotal = Number(item.price) * item.quantity;
                                const maxStock = Number(item.stockQuantity);

                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="col-product cart-item-info">
                                            <div className="cart-item-image">
                                                <img src={item.imageUrl} alt={item.name} />
                                            </div>

                                            <div className="cart-item-details">
                                                <h3>{item.name}</h3>
                                                <p className="cart-stock-note">
                                                    Available: {maxStock}
                                                </p>

                                                <button
                                                    className="remove-btn"
                                                    onClick={() => remove(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <span className="col-price">
                                            € {Number(item.price).toFixed(2)}
                                        </span>

                                        <div className="col-quantity">
                                            <div className="quantity-selector">
                                                <button
                                                    className="qty-btn"
                                                    disabled={item.quantity <= 1}
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={maxStock}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            parseInt(e.target.value) || 1
                                                        )
                                                    }
                                                />

                                                <button
                                                    className="qty-btn"
                                                    disabled={item.quantity >= maxStock}
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <span className="col-total">
                                            € {lineTotal.toFixed(2)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {hasStockProblem && (
                            <p className="cart-warning">
                                Some items exceed available stock. Please update your cart.
                            </p>
                        )}

                        <div className="cart-summary">
                            <div className="summary-totals">
                                <div className="subtotal-row">
                                    <span className="subtotal-label">Total cost:</span>
                                    <span className="subtotal-value">
                                        € {total.toFixed(2)}
                                    </span>
                                </div>

                                <p className="tax-note">
                                    Tax and shipping cost not included
                                </p>
                            </div>

                            <Link
                                to="/checkout"
                                state={{ total }}
                                className={hasStockProblem ? "disabled-link" : ""}
                            >
                                <button
                                    className="checkout-btn"
                                    disabled={hasStockProblem}
                                >
                                    Check-out
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
