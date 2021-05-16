import { useEffect, useState } from 'react'
import axios from 'axios'
import TinyChartStats from '@components/widgets/stats/TinyChartStats'

const ChallangesCard = ({ warning }) => {
  const [data, setData] = useState({
    title: "Challanges",
    statistics: "1000",
    series: [
        {
            name: "2020",
            data: [
                45,
                85,
                65,
                45,
                65
            ]
        }
    ]
})

  useEffect(() => {
    setData({
      title: "Challanges",
      statistics: "1000",
      series: [
          {
              name: "2020",
              data: [
                  45,
                  85,
                  65,
                  45,
                  65
              ]
          }
      ]
  })
  }, [])

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false
      }
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        top: -15,
        bottom: -15
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: ['#c1c1c1', '#c1c1c1', '#c1c1c1', '#c1c1c1', '#c1c1c1'],
          backgroundBarRadius: 5
        }
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [warning],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      x: {
        show: false
      }
    }
  }

  return data !== null ? (
    <TinyChartStats
      height={70}
      type='bar'
      options={options}
      title={data.title}
      stats={data.statistics}
      series={data.series}
      tooltip="Number of challanges played by user"
    />
  ) : null
}

export default ChallangesCard
