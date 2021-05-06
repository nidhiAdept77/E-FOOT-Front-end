import env from "react-dotenv"
export const CONSTANTS = {
    BACKEND_BASE_URL: env.BACKEND_BASE_URL || "http://15.207.189.78",
    BACKEND_WS_URL: env.BACKEND_WS_URL ||  "ws://15.207.189.78",
    USERS_ROLES: {
        USER: "user",
        ADMIN: "admin"
    }
}