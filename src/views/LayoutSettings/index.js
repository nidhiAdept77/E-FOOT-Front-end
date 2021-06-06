import React from 'react'
import { FormattedMessage } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'

export default function LayoutSettings() {
    return (
        <>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="Layout Settings" />} breadCrumbActive={<FormattedMessage id="Layout Settings" />} />
        </>
    )
}
