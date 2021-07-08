import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
export default function Wallet() {
    return (
        <div>
            <h1>helloWork</h1>
            <PayPalScriptProvider options={{ "client-id": "ASFJBoswbGhAdkLmPvtYA3tRIOznV9j2qlAIJnkbCKmnIEp41VBKS8oaqXqewADmasSRi5jCjgfdvSFG" }}>
                <PayPalButtons style={{ layout: "horizontal" }} />
            </PayPalScriptProvider>
        </div>
    )
}
