<template>
    <div>
      <div class="row">
        <div class="col-8 bg-grey-1" style="margin:auto;border:1px solid #dddddd">
          <h3 class="gt-sm text-center q-mt-md q-mb-none">Poll Results</h3>
          <h4 class="lt-md text-center text-bold q-mt-md q-mb-none">Poll Results</h4>
          <h5 class="text-center q-ma-none">for Bronx Academy for Software Engineering</h5>
          <GChart type="BarChart" :data="chartData" :options="chartOptions" :style="chartStyle" />
          <div style="width:100%; text-align: right">
            <q-btn color="secondary" :to="{ name: 'Home' }">Home</q-btn>
          </div>
        </div>
      </div>
    
    </div>
   </template>
   
   <script>
   import { GChart } from 'vue-google-charts'
   export default {
    components: {
      GChart
    },
    data() {
      return {
        error: false,
        chartOptions: {
          backgroundColor: 'transparent',
          legend: { position: 'none' },
          hAxis: { format: '0' }
        },
        chartStyle: 'height: calc(70vh)',
        chartData: []
      }
    },
    mounted() {
      fetch(process.env.BASE_URL + '/api/results')
        .then(response => response.json())
        .then(data => {
          let chartData = []
          chartData.push(['Job Title', 'Students', { role: 'style' }])
          for (const rec of data) {
            chartData.push([
              rec.JobTitle,
              parseInt(rec.studentCount),
              '#0000FF'
            ])
          }
          this.chartData = chartData
        })
    }
   }
   </script>
   
   