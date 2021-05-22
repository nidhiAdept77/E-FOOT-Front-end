import React from 'react'
import { FormattedMessage } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'
import JombotronHome from './components/JombotronHome'
import GamesComponent from './components/GamesComponent'


export default function index() {
    return (
        <div>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Home" />} breadCrumbActive={<FormattedMessage id="Home" />} />
            <JombotronHome />
            <GamesComponent />
        </div>
    )
}
