import { Container, Paper, Typography, Grid, Button, useTheme } from '@mui/material';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import ChartJsZoomPlugin from "chartjs-plugin-zoom"
import chartjsActions from './lib/chartjs.actions';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { CheckCircle, CloseRounded } from '@mui/icons-material';
import Divider from '@mui/material/Divider';

const App = () => {

  const theme = useTheme()
  const chartRef = useRef<HTMLCanvasElement>(null)

  const [bubbleChart, setBubbleChart] = useState<Chart>()

 

  useEffect(() => {

    if (!chartRef?.current) {
      return () => { }
    }

    Chart.register(ChartJsZoomPlugin)
    Chart.register(ChartDataLabels)

    // Chart.register({
    //   id: 'permanentLabel',
    //   afterDatasetsDraw: function (chart, args, options) {
    //     var ctx = chart.ctx

    //     chart.data.datasets.forEach(function (dataset, i) {
    //       var meta = chart.getDatasetMeta(i)

    //       console.log(meta)
    //       meta.data.forEach(function (element, index) {
    //         // @ts-ignore
    //         if (dataset.data[index]?.label) {
    //           // @ts-ignore
    //           ctx.fillText(dataset.data[index].label.toString(), position.x, position.y - dataset.data[index].r - Chart.defaults.font.size)
    //         }
    //       })
    //     })
    //   },
    // })


    const data = {
      datasets: [{
        label: 'First Dataset',
        data: [{
          x: 20,
          y: 30,
          r: 15
        }
        ],
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    };
    const chart = new Chart(chartRef.current, {
      type: 'bubble',
      data: data,
      options: {
        responsive: true,
        plugins: {
          zoom: {
            pan: {
              enabled: true
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            }
          },
          // @ts-ignore
          datalabels: {
            font: {
              weight: 'bold'
            },
            formatter: function () {
              return 'i';
            },
            // @ts-ignore
            backgroundImage: "https://picsum.photos/150"
          }
        },
      }
    });

    chartjsActions.find(x => x.name === "Randomize")?.handler(chart, 7)

    setBubbleChart(chart)


    return () => {

      chart.destroy()

    }
  }, [])


  return (
    <Grid container component={Container} justifyContent={"space-between"} alignItems={"center"} sx={{ height: "90vh" }}>
      <Grid item xs={12} >
        <Typography variant='h4'>Bubble Chart Example</Typography>
      </Grid>
      <Grid item xs={8} component={Paper} >
        <canvas ref={chartRef} ></canvas>

        <Grid container justifyContent={"space-around"} sx={{ margin: theme.spacing(2, 0) }} >

          {
            chartjsActions && chartjsActions.map((action, i) => {
              return (
                <Button key={i} variant='outlined' onClick={() => {
                  if (bubbleChart) {
                    action.handler(bubbleChart, 15)
                  }
                }}> {action.name} </Button>
              )
            })
          }
        </Grid>
      </Grid>
      <Grid item xs={3} component={Paper} sx={{
        margin: theme.spacing(4, 0),
        padding: theme.spacing(4)
      }}>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircle color="success" sx={{ marginRight: theme.spacing(1) }} />
          <span>BASE) Chart on React.js</span>
        </Typography>


        <Divider sx={{ margin: theme.spacing(2, 0) }} />

        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircle color="success" sx={{ marginRight: theme.spacing(1) }} />
          <span>A) Add Zoom in/out</span>
        </Typography>

        <Divider sx={{ margin: theme.spacing(2, 0) }} />

        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircle color="success" sx={{ marginRight: theme.spacing(1) }} />
          <span>B) Show stock im inside bubbles</span>
        </Typography>

        <Divider sx={{ margin: theme.spacing(2, 0) }} />

        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CloseRounded color="error" sx={{ marginRight: theme.spacing(1) }} />
          <span>C) Merged Bubbles.<br />(not impossible but it'll take too much time) </span>
        </Typography>


        <Divider sx={{ margin: theme.spacing(2, 0) }} />

        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <CloseRounded color="error" sx={{ marginRight: theme.spacing(1) }} />
          <span>D) Draggable chart. <br /> (sorry im tired 👉👈 ) </span>
        </Typography>

      </Grid>
      <Typography>0xselimcan@gmail.com</Typography>
    </Grid>
  )
}

export default App