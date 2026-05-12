import "./app.css";
import { Link } from "react-router-dom";

/* mock items, more will be added later*/
const Mock_items = [
    { id: 1, name: "Spiced Mint", price: 9.99, image: "" },
    { id: 2, name: "Sweet Strawberry", price: 9.99, image: "" },
    { id: 3, name: "Cool Blueberries", price: 9.99, image: "" },
    { id: 4, name: "Juicy Lemon", price: 9.99, image: "️" },
];


export default function Catalog() {
    /* main catalog page func*/
    return (
        <div className="catalog">
            <header className="catalog-header">
                <div className="logo">Not-temu</div>
                <div className="search-bar-container">
                    <span className="search-icon">🔍</span>
                    <input type="text" className="search-input" placeholder="Search" />
                </div>
                <div className="header-icons">
                    <img src = {"icons/man.jpg"} alt = "user" />
                    <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                        <img src = {"icons/cart.jpg"} alt = "cart" />
                    </Link>
                </div>
            </header>

            <main className="catalog-main">
                <div className="catalog-title">
                    <h1>
                        Products
                    </h1>
                    <p>
                        Products that you might be interested in
                    </p>
                </div>



                <div className="product-grid">
                    {Mock_items.map((item) => (
                        <div key={item.id} className="product-card">
                            <div className="product-image-container">
                                {item.image}
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">
                                    {item.name}
                                </h3>
                                <div className="product-details">
                                    <span className="stock-status">
                                        in stock
                                    </span>
                                    <span className="price">{item.price.toFixed(2)} €</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}