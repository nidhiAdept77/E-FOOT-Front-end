import { useEffect, useState } from 'react'
import TinyChartStats from '@components/widgets/stats/TinyChartStats'

const ChallangesCard = ({ warning, data: details }) => {
  const [data, setData] = useState({
    title: "E-FOOT Coins",
    statistics: 0,
    series: [
      {
        name: "E-FOOT Coins",
        data: [0, 0, 0]
      }
    ]
  })
  
  useEffect(() => {
    const {wins = 0, loss = 0, lastMatches = [], totalChallenges = 0, totalPlayers = 0, points = 0, position = 0} = details
    setData({
      title: "E-FOOT Coins",
      statistics: points || 0,
      series: [
          {
              name: "E-FOOT Coins",
              data: [
                {
                  x: 'Coins',
                  y: [0, points]
                },
                {
                  x: 'wins',
                  y: [wins]
                },
                {
                  x: 'loss',
                  y: [loss]
                }
              ]
          }
      ]
  })
  }, [details])

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
        top: -30,
        bottom: -14
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '15%',
        startingShape: 'rounded',
        colors: {
          backgroundBarColors: ['#c1c1c1', '#c1c1c1', '#c1c1c1'],
          backgroundBarRadius: 1
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
        show: true
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
      stats={data.statistics.toString()}
      series={data.series}
      tooltip="E-Foot coins based on win/loss Challenges"
    />
  ) : null
}

export default ChallangesCard
