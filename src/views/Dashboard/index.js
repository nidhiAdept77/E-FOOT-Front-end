import { useContext, useEffect, useState } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col } from 'reactstrap'
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


const Dashboard = ({loading}) => {
  const dispatch = useDispatch()
  const {dashboardUserId, userDashboardDetails} = useSelector(state => state.dashboard)
  const [details, setDetails] = useState({})
  const [userId, setUserId] = useState({})

  useEffect(() => {
    dispatch(getDashboardDetails(dashboardUserId))
  }, [userId])

  useEffect(() => {
    setUserId(dashboardUserId)
  }, [dashboardUserId])
  
  useEffect(() => {
    if (dashboardUserId) {
      dispatch(getDashboardDetails(dashboardUserId))
    }
    return () => {
      dispatch(setDashboardUserId(localStorage.getItem("userId")))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(userDashboardDetails).length) {
      setDetails(userDashboardDetails)
    }
    return () => {
    }
  }, [userDashboardDetails])

  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
  return (
    <div id='dashboard-analytics'>
      <LoaderComponent loading={loading} />
      <Breadcrumbs breadCrumbTitle='Dashboard' />
      <Row className='match-height'>
        <Col lg={9} md={8} >
          <Row>
            <Col md={12}>
              <Row className='card-margin'>
                <Col lg={4} md="4" sm="12">
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
                
                <Col lg='8' md='8' sm='12'>
                  <ChallangeOverview data={details} success={colors.primary.main} />
                </Col>

              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg='3' md='4' sm='12'>
          <OnlineUsers showheader={true} colors={colors} trackBgColor={trackBgColor} />
        </Col>
      </Row>
      <Row className='match-height'>
            <Col lg='8' md='8' sm='12' xs='12'>
              <CardUserTimeline />
            </Col>
            <Col lg='4' md='4' sm='12' xs='12'>
              <CardTransactions />
            </Col>
      </Row>
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
