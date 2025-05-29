import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

const UserLogin = {
    login: async (name, password) => {
        const response = await api.post("/api/login", {
            name,
            password
        });
        if (response.status === 200){
            return response.data;
        } else {
            throw new Error("Login failed")
        }
    }
}

export default UserLogin;