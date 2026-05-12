import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./app.css";
import { loginUser } from "./api";
import { saveUser } from "./auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            saveUser(user);
            navigate("/catalog");
        } catch (err: any) {
            setError(err.error || "Login failed");
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Log in</h2>
                <h3>Welcome back!</h3>
                {error && <p style={{color: "red"}}>{error}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="email"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required />

                    <input type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required />

                    <button type="submit">Login</button>
                </form>
                <p className="register">
                    Not registered? <Link to="/signup">Sign up for free!</Link>
                </p>
            </div>
            <div className="herotext">
                <h1>Epic finds near you</h1>
                <p>Discover millions of products at unbeatable prices.</p>
            </div>
        </div>
    )
}