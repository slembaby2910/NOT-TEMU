import "./app.css";
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearUser } from "./auth";
import { useCart } from "./cartholder.tsx";

export default function Profile() {
    const navigate = useNavigate();
    const user = getUser();
    const { cartItems } = useCart();

    const totalItems = cartItems.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
    );

    const handleLogout = () => {
        clearUser();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h1>Profile</h1>
                    <p>You are currently using the shop as a guest.</p>

                    <div className="profile-actions">
                        <Link to="/login">
                            <button className="profile-btn">Login</button>
                        </Link>

                        <Link to="/signup">
                            <button className="profile-btn secondary">Create account</button>
                        </Link>

                        <Link to="/catalog">
                            <button className="profile-btn ghost">Back to catalog</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1>Your profile</h1>

                <div className="profile-avatar">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                </div>

                <div className="profile-info">
                    <div>
                        <span>Name</span>
                        <strong>{user.name || "Unknown user"}</strong>
                    </div>

                    <div>
                        <span>Email</span>
                        <strong>{user.email || "No email"}</strong>
                    </div>

                    <div>
                        <span>User ID</span>
                        <strong>{user.id || "N/A"}</strong>
                    </div>

                    <div>
                        <span>Cart items</span>
                        <strong>{totalItems}</strong>
                    </div>
                </div>

                <div className="profile-actions">
                    <Link to="/catalog">
                        <button className="profile-btn">Continue shopping</button>
                    </Link>

                    <Link to="/cart">
                        <button className="profile-btn secondary">View cart</button>
                    </Link>

                    <button className="profile-btn danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}