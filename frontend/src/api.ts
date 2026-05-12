const url = "http://localhost:8081"




/* sends register request to the backend and returns the created user */
export async function registerUser(name: string, email: string, password: string) {
    const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

/* sends login request to the backend and returns the authenticated user */
export async function loginUser(email: string, password: string) {
    const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

/* getting products from the database */
export async function fetchProducts() {
    const res = await fetch(`${url}/products`);
    if (!res.ok) throw await res.json();
    return res.json();
}

/* sends the cart items to the backend to create an order */
export async function checkout(userId: number, items: { productId: number; quantity: number }[]) {
    const res = await fetch(`${url}/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, items }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}
