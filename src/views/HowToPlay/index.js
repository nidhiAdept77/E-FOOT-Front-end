import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'
import JombotronHowtoPlay from './components/JombotronHowtoPlay'
import HowToPlayContent from './components/HowToPlayContent'

function HowToPlay() {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="How To Play" />} breadCrumbActive={<FormattedMessage id="How To Play" />} />
            <JombotronHowtoPlay />
            <HowToPlayContent />
        </Fragment>
    )
}

export default HowToPlay