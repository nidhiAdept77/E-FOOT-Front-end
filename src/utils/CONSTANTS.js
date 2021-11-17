import env from "react-dotenv"
export const CONSTANTS = {
    BACKEND_BASE_URL: env.BACKEND_BASE_URL || "http://localhost:9000",
    BACKEND_WS_URL: env.BACKEND_WS_URL ||  "ws://localhost:9000",
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
    TRANSACTION_STATUS: {
        PENDING: "Pending",
        RECEIVED: "Received",
        INITIATED: "Initiated",
        COMEPLETED: "Completed",
        DECLINED: "Declined",
        CANCLED: "Cancelled",
        PURGE: "Purge"
    },
    ENV: env.ENVIRONMENT || "testing",
    PLATFORM_FEE: env.PLATFORM_FEE ? parseFloat(env.PLATFORM_FEE) : 0,
    STATUS: {
        ACTIVE: "active",
        PENDING: "pending",
        ONLINE: "online",
        OFFLINE: "offline",
        DELETED: "deleted",
        EXPIRED: "expired",
        ACCEPTED: "accepted",
        DENIED: "denied",
        WIN: "win",
        LOSE: "lose",
        DRAW: "draw",
        FINISHED: "finished",
        DISPUTE: "dispute", 
        PRIVATE: "private",
        PUBLIC: "public",
        BOTH: "both"
    },
    GAME_RANK: [
        {
            label: "Elite 1",
            value: "elite1"
        },
        {
            label: "Elite 2",
            value: "elite2"
        },
        {
            label: "Elite 3",
            value: "elite3"
        },
        {
            label: "Gold 1",
            value: "gold1"
        },
        {
            label: "Gold 2",
            value: "gold2"
        },
        {
            label: "Gold 3",
            value: "gold3"
        },
        {
            label: "Silver 1",
            value: "silver1"
        },
        {
            label: "Silver 2",
            value: "silver2"
        },
        {
            label: "Silver 3",
            value: "silver3"
        },
        {
            label: "Bronze 1",
            value: "bronze1"
        },
        {
            label: "Bronze 2",
            value: "bronze2"
        },
        {
            label: "Bronze 3",
            value: "bronze3"
        }
    ]
}