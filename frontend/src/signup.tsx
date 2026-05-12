import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./app.css";
import { registerUser } from "./api";
import { saveUser } from "./auth";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await registerUser(name, email, password);
            saveUser(user);
            navigate("/catalog");
        } catch (err: any) {
            setError(err.error || "Registration failed");
        }
    };

    return(
        <div className="login-container">
            <div className="login-card">
                <h2>Join us today and explore products!</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <form className="login-form" onSubmit={handleSignup}>
                    <input type="text"
                           placeholder="Username"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required />

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

                    <button type="submit">Sign Up</button>
                </form>
                <p className="register">
                    Already have an account? <Link to= "/login" >Login here!</Link>
                </p>
                <p className= "register" style={{marginTop: "10px"}}>
                    <Link to= "/catalog" >use as a guest</Link>
                </p>
            </div>
            <div className= "herotext" >
                <h1>Epic finds near you</h1>
                <p>Discover millions of products at unbeatable prices.</p>
            </div>
        </div>
    )
}