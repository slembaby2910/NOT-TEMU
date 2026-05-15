import "./app.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "./api";
import { useCart } from "./cartholder.tsx";

export default function Catalog() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { cartItems, setCartItems } = useCart();

    const cartCount = cartItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
    );

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => setError("Failed to load products."))
            .finally(() => setLoading(false));
    }, []);

    const visible = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(search.toLowerCase())
    );

    const addToCart = (item: any) => {
    setCartItems((prev: any[]) => {
        const existing = prev.find((cartItem) => cartItem.id === item.id);
        const stock = Number(item.stockQuantity);

        if (stock <= 0) return prev;

        if (existing) {
            if (existing.quantity >= stock) {
                alert(`Only ${stock} available for ${item.name}.`);
                return prev;
            }

            return prev.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        }

        return [...prev, { ...item, quantity: 1 }];
    });
};

    return (
        <div className="catalog">
            <header className="catalog-header">
                <Link to="/catalog">
                    <img src="icons/logo.jpg" alt="not-temu" />
                </Link>

                <div className="search-bar-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="header-icons">
                    <Link to="/profile">
                        <img src="icons/man.jpg" alt="profile" />
                    </Link>

                    <Link to="/cart" className="cart-icon-link">
                        <img src="icons/cart.jpg" alt="cart" />
                        {cartCount > 0 && (
                            <span className="cart-count">{cartCount}</span>
                        )}
                    </Link>
                </div>
            </header>

            <main className="catalog-main">
                <div className="catalog-title">
                    <h1>Products</h1>
                    <p>Products that you might be interested in</p>
                </div>

                {loading && <p className="status-message">Loading products...</p>}
                {error && <p className="status-message error">{error}</p>}

                {!loading && !error && visible.length === 0 && (
                    <p className="status-message">No products found.</p>
                )}

                <div className="product-grid">
                    {visible.map((item) => (
                        <div key={item.id} className="product-card">
                            <div className="product-image-container">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="product-image"
                                />
                            </div>

                            <div className="product-info">
                                <h3 className="product-name">{item.name}</h3>

                                <p className="product-description">
                                    {item.description || "No description available."}
                                </p>

                                <div className="product-details">
                                    <span
                                        className={
                                            item.stockQuantity > 0
                                                ? "stock_status"
                                                : "stock_status out"
                                        }
                                    >
                                        {item.stockQuantity > 0
                                            ? `${item.stockQuantity} in stock`
                                            : "out of stock"}
                                    </span>

                                    <span className="price">
                                        {Number(item.price).toFixed(2)} €
                                    </span>
                                </div>

                                <button
                                    className="add-cart-btn"
                                    disabled={item.stockQuantity <= 0}
                                    onClick={() => addToCart(item)}
                                >
                                    {item.stockQuantity > 0 ? "Add to cart" : "Unavailable"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
