<script>
import { Bar } from 'vue-chartjs'

export default{
   
    extends: Bar,

    props(){
      return {


        chartData: {
            type: Array,
            required: false
        },
        chartLabels: {
            type: Array,
            required: true
        }
      }
    },
   
    data(){
        return {
            options : {
                scales: {
                    yAxes: [{
                        ticks: {
                            begintAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                responsive : true,
                maintainAspectRatio: false
            }
        }
    },

    mounted() {
        this.renderChart({
            labels: this.chartLabels,
            datasets: [
                {
                    label: 'wydatki',
                    backgroundColor: 'blue',
                    data: this.chartData,
                    borderWidth: 1
                }
            ]
        },this.options)
    }
}
</script>