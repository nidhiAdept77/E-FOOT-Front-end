import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap'

import '@styles/react/libs/charts/apex-charts.scss'

const Dashboard = () => {
  const { colors } = useContext(ThemeColors)
  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        Hello World
      </Row>
    </div>
  )
}

export default Dashboard
