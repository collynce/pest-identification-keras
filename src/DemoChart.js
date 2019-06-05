import {
  Pie,
  mixins
} from 'vue-chartjs'

export default {
  extends: Pie,
  mixins: [mixins.reactiveProp],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: ["TOTAL PESTS", "Fall Armyworm", "Mango Seed Weevil", "New Pest"],
      datasets: [{
        label: 'Results',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
        data: [this.chartData.map(entry => entry.title), this.chartData.map(entry => entry.info), this.chartData.map(entry => entry.mango), this.chartData.map(entry => entry.new)]
      }]
    }, this.options)
  }
}