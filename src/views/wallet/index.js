import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import WalletHeader from './WalletHeader'
import WalletTable from './WalletTable'
export default function Wallet() {
    return (
        <div className="wallet">
            <WalletHeader />
            <WalletTable />
            {/* <h1>helloWork</h1>
            <PayPalScriptProvider options={{ "client-id": "ASFJBoswbGhAdkLmPvtYA3tRIOznV9j2qlAIJnkbCKmnIEp41VBKS8oaqXqewADmasSRi5jCjgfdvSFG" }}>
                <PayPalButtons style={{ layout: "horizontal" }} />
            </PayPalScriptProvider> */}
        </div>
    )
}
