import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Breadcrumbs from '@components/breadcrumbs'
import { Row } from 'reactstrap'


function HowToPlay(props) {
    return (
        <Fragment>
            {/* <LoaderComponent loading={loading} /> */}
            <Breadcrumbs breadCrumbTitle='How To Play' breadCrumbActive='How To Play' />
            <Row>
            </Row>
        </Fragment>
    )
}

HowToPlay.propTypes = {

}

export default HowToPlay

