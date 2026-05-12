export function saveUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
}

export function clearUser() {
    localStorage.removeItem("user");
}