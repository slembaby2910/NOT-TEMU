import "./app.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "./api";
import { useCart } from "./cartholder.tsx";

export default function Catalog() {
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const { setCartItems } = useCart();

    useEffect(() => {
        fetchProducts().then(setProducts).catch(console.error);
    }, []);

    const visible = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const addToCart = (item: any) => {
        setCartItems((prev: any[]) => {
            const existing = prev.find((cartItem) => cartItem.id === item.id);

            if (existing) {
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
                <img src="icons/logo.jpg" alt="not-temu" />

                <div className="search-bar-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="header-icons">
                    <img src="icons/man.jpg" alt="user" />
                    <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                        <img src="icons/cart.jpg" alt="cart" />
                    </Link>
                </div>
            </header>

            <main className="catalog-main">
                <div className="catalog-title">
                    <h1>Products</h1>
                    <p>Products that you might be interested in</p>
                </div>

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

                                <div className="product-details">
                                    <span className="stock_status">
                                        {item.stockQuantity > 0 ? "in stock" : "out of stock"}
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
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}