console.log('process.env: ', process.env)
console.log('process.env.BACKEND_BASE_URL: ', process.env.BACKEND_BASE_URL)
export const CONSTANTS = {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || "http://localhost:9000",
    BACKEND_WS_URL: process.env.BACKEND_WS_URL ||  "ws://localhost:9000/graphql"
}