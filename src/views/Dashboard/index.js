import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

import '@styles/react/libs/charts/apex-charts.scss'
import LoaderComponent from '../components/Loader'

const Dashboard = () => {
  const { colors } = useContext(ThemeColors)
  return (
    <div id='dashboard-analytics'>
      {/* <LoaderComponent loading={true} /> */}
      <Row className='match-height'>
        <Col md={12} sm={12}>
          <h1 className="text-center"><FormattedMessage id={"Coming Soon..."} /></h1>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
