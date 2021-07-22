import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import WalletHeader from './WalletHeader'
import WalletTable from './WalletTable'
export default function Wallet() {
    return (
        <div className="wallet">
            <WalletHeader />
            <WalletTable />
        </div>
    )
}
