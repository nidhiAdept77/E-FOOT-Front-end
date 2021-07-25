import env from "react-dotenv"
export const CONSTANTS = {
    BACKEND_BASE_URL: env.BACKEND_BASE_URL || "https://dev.backoffice.efnl.xivdp.com",
    BACKEND_WS_URL: env.BACKEND_WS_URL ||  "wss://dev.backoffice.efnl.xivdp.com",
    USERS_ROLES: {
        USER: "user",
        ADMIN: "admin"
    },
    GOOLE_CLIENT_ID: env.GOOLE_CLIENT_ID || "398599617169-5l4iqfm2gjt37qc6ghpvi68mgdjb4eel.apps.googleusercontent.com",
    FACEBOOK_APP_ID: env.FACEBOOK_APP_ID || "2887719924809264",
    ARRAY_SIZE: 10,
    ROUTES_HIDE_ONLINE_POPUP: ['/dashboard'],
    ENV_TYPE: {
        TESTING: "testing",
        STAGING: "staging",
        LIVE: "live"
    },
    TRANSACTION_TYPE: {
        DEPOSIT: "deposit",
        WITHDRAW: "withdraw",
        WALLET: "wallet", 
        CHALLANGE: "challange"
    },
    ENV: env.ENVIRONMENT || "testing"
}