import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, UncontrolledTooltip } from 'reactstrap'
import { HelpCircle } from 'react-feather'
import "./wincards.scss"
const WinsCards = ({ info, data: details }) => {
  const [data, setData] = useState({})
  //   const [data, setData] = useState({
  //     title: "Wins",
  //     statistics: "786",
  //     series: [
  //         {
  //           data: [
  //                 0,
  //                 20,
  //                 5,
  //                 30,
  //                 15,
  //                 45
  //             ]
  //         }
  //     ]
  // })

  useEffect(() => {
    if (details) {
      setData(details)
    }
    //   setData({
    //     title: "Wins",
    //     statistics: "786",
    //     series: [
    //         {
    //           data: [
    //                 0,
    //                 20,
    //                 5,
    //                 30,
    //                 15,
    //                 45
    //             ]
    //         }
    //     ]
    // })
  }, [details])

  // const options = {
  //   chart: {
  //     toolbar: {
  //       show: false
  //     },
  //     zoom: {
  //       enabled: false
  //     }
  //   },
  //   grid: {
  //     borderColor: '#EBEBEB',
  //     strokeDashArray: 5,
  //     xaxis: {
  //       lines: {
  //         show: true
  //       }
  //     },
  //     yaxis: {
  //       lines: {
  //         show: false
  //       }
  //     },
  //     padding: {
  //       top: -30,
  //       bottom: -10
  //     }
  //   },
  //   stroke: {
  //     width: 3
  //   },
  //   colors: [info],
  //   series: [
  //     {
  //       data: [0, 20, 5, 30, 15, 45]
  //     }
  //   ],
  //   markers: {
  //     size: 2,
  //     colors: info,
  //     strokeColors: info,
  //     strokeWidth: 2,
  //     strokeOpacity: 1,
  //     strokeDashArray: 0,
  //     fillOpacity: 1,
  //     discrete: [
  //       {
  //         seriesIndex: 0,
  //         dataPointIndex: 5,
  //         fillColor: '#ffffff',
  //         strokeColor: info,
  //         size: 5
  //       }
  //     ],
  //     shape: 'circle',
  //     radius: 2,
  //     hover: {
  //       size: 3
  //     }
  //   },
  //   xaxis: {
  //     labels: {
  //       show: true,
  //       style: {
  //         fontSize: '0px'
  //       }
  //     },
  //     axisBorder: {
  //       show: false
  //     },
  //     axisTicks: {
  //       show: false
  //     }
  //   },
  //   yaxis: {
  //     show: false
  //   },
  //   tooltip: {
  //     x: {
  //       show: false
  //     }
  //   }
  // }

  const tooltip = "Number of challanges wins by user"
  return Object.keys(data).length ? (
    // <TinyChartStats
    //   height={70}
    //   type='line'
    //   className="overview"
    //   options={options}
    //   title={data.title}
    //   stats={data.statistics}
    //   series={data.series}
    //   tooltip="Number of challanges wins by user"
    // />
    <Card className="overview">
      <CardHeader>
        <CardTitle tag="h4">Last 5 Matches</CardTitle>
        {tooltip && (
          <>
            <HelpCircle
              size={18}
              id="tinyChartStatsHelp"
              className="text-muted cursor-pointer"
            />
            <UncontrolledTooltip placement="auto" target="tinyChartStatsHelp">
              {tooltip}
            </UncontrolledTooltip>
          </>
        )}
      </CardHeader>
      <CardBody className="pb-50">
        <div id='table_matches'>
          <table>

            {data?.lastMatches?.map((match, index) => {
              const { challengerName = "", winLoseScore = "", opponentName = "" } = match
              console.log(match)
              return (
                <>
                  <tr key={index}>
                    <td><small>{challengerName}</small></td>
                    <td><small>{winLoseScore}</small></td>
                    <td><small>{opponentName}</small></td>
                  </tr>


                  {/* <tr style={{ borderBottom: "1px solid black", borderTop: "1px solid black" }}>
                  <td>
                    <small>{challengerName}</small>
                  </td>
                  <td className='text-center' style={{ padding: "0 10px 0 10px" }}>
                    <small>{winLoseScore}</small>
                  </td>
                  <td>
                    <small>{opponentName}</small>
                  </td>
                </tr> */}
                </>
              )
            }) || null}

          </table>
        </div>
        {/* <Chart options={options} series={series} type={type} height={height} /> */}
      </CardBody>
    </Card>
  ) : null
}

export default WinsCards
