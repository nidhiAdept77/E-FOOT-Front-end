// ** Third Party Components
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import { Card, CardBody, CardHeader, CardTitle, UncontrolledTooltip } from 'reactstrap'
import classnames from 'classnames'
import { HelpCircle } from 'react-feather'

const TinyChartStats = props => {
  // ** Props
  const { title, stats, options, series, type, height, className, tooltip } = props
  const cardClasses = `card-tiny-line-stats ${className}`
  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle tag='h4'>{title}</CardTitle>
        {tooltip && 
          <>
            <HelpCircle size={18} id="tinyChartStatsHelp" className='text-muted cursor-pointer' />
            <UncontrolledTooltip placement='auto' target='tinyChartStatsHelp'>
              {tooltip}
            </UncontrolledTooltip>
          </>
        }
      </CardHeader>
      <CardBody className='pb-50'>
        <h6>{title}</h6>
        <h2 className='font-weight-bolder mb-1'>{stats}</h2>
        <Chart options={options} series={series} type={type} height={height} />
      </CardBody>
    </Card>
  )
}

export default TinyChartStats

// ** PropTypes
TinyChartStats.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  series: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

// ** Default Props
TinyChartStats.defaultProps = {
  height: 100
}
