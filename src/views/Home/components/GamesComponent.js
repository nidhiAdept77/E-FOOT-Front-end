import React from 'react'
import { IoLogoGameControllerB } from 'react-icons/io'
import { Card, CardHeader } from 'reactstrap'
import LoaderComponent from '../../components/Loader'
import { FormattedMessage } from 'react-intl'

export default function GamesComponent() {

    return (
        <Card className='chat-widget'>
            <LoaderComponent loading={false} />
            <CardHeader>
                <div className='d-flex align-items-center'>
                    <IoLogoGameControllerB size="25" className='mr-2'/>
                    <h5 className='mb-0'><FormattedMessage id="Game Available" /></h5>
                </div>
            </CardHeader>
            <div className='chat-app-window'>
            </div>
        </Card>
    )
}
