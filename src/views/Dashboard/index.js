import { useContext } from 'react'
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

const Dashboard = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
  return (
    <div id='dashboard-analytics'>
      {/* <LoaderComponent loading={true} /> */}
      <Row className='match-height'>
      </Row>
      <Row className='match-height'>
        <Col md={8} >
          <Row>
            <Col md={12}>
              <Row className='card-margin'>
                <Col lg={4}>
                  <Row>
                    <Col lg='12'>
                      <ChallangesCard warning={colors.warning.main} />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg='12'>
                      <WinsCards info={colors.primary.main} />
                    </Col>
                  </Row>
                </Col>
                
                <Col lg='8' sm='12'>
                  <ChallangeOverview success={colors.primary.main} />
                </Col>

              </Row>
            </Col>
            <Col lg='12'>
              <CardUserTimeline />
            </Col>  
          </Row>
        </Col>
        <Col lg='4' md='6' sm='12'>
          <OnlineUsers colors={colors} trackBgColor={trackBgColor} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
