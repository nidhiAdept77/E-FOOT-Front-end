import { useContext } from 'react'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Row } from 'reactstrap'

import '@styles/react/libs/charts/apex-charts.scss'

const Dashboard = () => {
  const { colors } = useContext(ThemeColors)
  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <h1>Comming Soon...</h1>
      </Row>
    </div>
  )
}

export default Dashboard
