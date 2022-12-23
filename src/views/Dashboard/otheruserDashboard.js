import { useContext, useEffect, useState } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Media } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

import '@styles/react/libs/charts/apex-charts.scss'
import LoaderComponent from '../components/Loader'
import OnlineUsers from './components/OnlineUsers'
import CardUserTimeline from './components/CardUserTimeline'
import ChallangeOverview from './components/ChallangeOverview'
import WinsCards from './components/WinsCards'
import ChallangesCard from './components/ChallangesCard'
import Breadcrumbs from '@components/breadcrumbs'
import { connect, useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import CardTransactions from './components/CardTransactions'
import { getDashboardDetails, setDashboardUserId } from '../../redux/actions/dashboard'
import Button from 'reactstrap/lib/Button'
const { CONSTANTS } = require('../../utils/CONSTANTS')
const axios = require('axios')
const Dashboard = ({ loading }) => {
    const dispatch = useDispatch()
    const { dashboardUserId, userDashboardDetails } = useSelector(state => state.dashboard)
    const { user: { _id: currentLoggedInUser = "" } = "" } = useSelector(state => state.auth)
    const [details, setDetails] = useState({})
    const [userId, setUserId] = useState({})
    const [loggedInUser, setLoggedInUser] = useState(true)

    const state = useSelector(state => state)
    const whichUser = state.auth?.user._id

    const pathstring = location.pathname.split("/")[2]

    useEffect(() => {
        dispatch(getDashboardDetails(pathstring))
        setLoggedInUser(userId === currentLoggedInUser)
        dispatch(setDashboardUserId(pathstring))
    }, [])
    useEffect(() => {
        setUserId(pathstring)
    }, [])

    // useEffect(() => {
    //     setLoggedInUser(dashboardUserId === currentLoggedInUser)
    // }, [dashboardUserId, currentLoggedInUser])

    useEffect(() => {
        if (pathstring) {
            dispatch(getDashboardDetails(pathstring))
        } else {
            if (dashboardUserId === null) {
                dispatch(setDashboardUserId(pathstring))
            }
        }
        return () => {
            dispatch(setDashboardUserId(pathstring))
            setLoggedInUser(true)
        }
    }, [])

    useEffect(() => {
        if (Object.keys(userDashboardDetails).length) {
            setDetails(userDashboardDetails)
        }
        return () => {
        }
    }, [userDashboardDetails])

    // const handleClick = () => {
    //     dispatch(setDashboardUserId(currentLoggedInUser))
    //     setLoggedInUser(true)
    // }
    const myDash = whichUser !== dashboardUserId
    const userFindUrl = `${CONSTANTS.BACKEND_BASE_URL}/userprofile/${dashboardUserId}`

    const [userProfileData, setuserProfileData] = useState()

    const getUserById = async () => {

        const userProfile = await axios({
            method: "get",
            url: userFindUrl,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        })

        setuserProfileData(userProfile?.data)
    }
    getUserById()
    // if (whichUser != dashboardUserId) {
    //   console.log("my dash")
    // } else {
    //   console.log("others dash")
    // }

    // const userDashboardData = {
    //     lastMatches: userProfileData?.lastMatches,
    //     loss: userProfileData?.loss,
    //     points: userProfileData?.points,
    //     position: userProfileData?.position,
    //     totalChallenges: userProfileData?.totalChallenges,
    //     totalPlayers: userProfileData?.points,
    //     wins: userProfileData?.wins
    // }
    const { colors } = useContext(ThemeColors),
        trackBgColor = '#e9ecef'
    return (
        <div id='dashboard-analytics'>
            <LoaderComponent loading={loading} />

            <Row>

                <Col md={12}>
                    <div className='card p-2' style={{ display: "grid", placeItems: "center" }}>
                        <Media src={userProfileData?.profilePicture} alt='Generic placeholder image' height='80' width='80'></Media>

                        <span><h1 className='mt-1'>{userProfileData?.firstName}  {userProfileData?.lastName}</h1></span>
                    </div>
                </Col>

            </Row>

            <Row className='match-height'>
                <Col lg={loggedInUser ? 9 : 12} md={loggedInUser ? 8 : 12} >
                    <Row>
                        <Col md={12}>
                            <Row className='card-margin'>
                                <Col lg={5} md="4" sm="12">
                                    <Row>
                                        <Col lg='12' md='12' sm='12' xs='12'>
                                            <ChallangesCard data={details} warning={colors.warning.main} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg='12' md='12' sm='12' xs='12'>
                                            <WinsCards data={details} info={colors.primary.main} />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg='7' md='8' sm='12'>
                                    <ChallangeOverview data={details} success={colors.primary.main} />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Col>
                {loggedInUser ? <Col lg='3' md='4' sm='12'>
                    <OnlineUsers showheader={true} colors={colors} trackBgColor={trackBgColor} />
                </Col> : <></>}
            </Row>
            {loggedInUser ? <Row className='match-height'>
                <Col lg='8' md='8' sm='12' xs='12'>
                    <CardUserTimeline />
                </Col>
                <Col lg='4' md='4' sm='12' xs='12'>
                    <CardTransactions />
                </Col>
            </Row> : <></>}
        </div>
    )
}

Dashboard.propTypes = {
    loading: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    loading: state.auth.loading
})
export default connect(mapStateToProps, {})(Dashboard)
