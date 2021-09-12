import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import WalletHeader from './WalletHeader'
import WalletTable from './WalletTable'
import LoaderComponent from '../components/Loader'
import { useSelector } from 'react-redux'
export default function Wallet() {
    const {loading} = useSelector(state => state.wallet)
    return (
        <div className="wallet">
            <LoaderComponent loading={loading} />
            <WalletHeader />
            <WalletTable />
        </div>
    )
}
