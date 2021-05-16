import React from 'react'
import { Row } from 'reactstrap'
import PlayNowCard from './contentCardComponents/PlayNowCard'
import HowToPlayCard from './contentCardComponents/HowToPlayCard'
import ReportingCard from './contentCardComponents/ReportingCard'
import WithdrawalsCard from './contentCardComponents/WithdrawalsCard'
import PlatformFessCards from './contentCardComponents/PlatformFessCards'
import HowToStart from './contentCardComponents/HowToStart'


export default function HowToPlayContent() {
    return (
        <Row className='match-height'>
            <HowToPlayCard />
            <PlayNowCard />
            <ReportingCard />
            <WithdrawalsCard />
            <PlatformFessCards />
            <HowToStart />
        </Row>
    )
}
