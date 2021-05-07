import env from "react-dotenv"
export const CONSTANTS = {
    BACKEND_BASE_URL: env.BACKEND_BASE_URL || "http://localhost:9000",
    BACKEND_WS_URL: env.BACKEND_WS_URL ||  "ws://localhost:9000",
    USERS_ROLES: {
        USER: "user",
        ADMIN: "admin"
    }
}