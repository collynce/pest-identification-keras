<template>
  <div style="margin-top:52px">
    <h1>Reports</h1>
    <section id="charting-demo">
      <DemoChart v-if="loaded" :chart-data="rawData" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import DemoChart from "../../DemoChart.js";

export default {
  name: "charting-demo",
  components: {
    DemoChart
  },
  data() {
    return {
      rawData: [],
      loaded: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      axios.get("http://127.0.0.1:5000/api/reports").then(response => {
        this.rawData = response.data;
        console.log(response);
        this.loaded = true;
      });
    }
  }
};
</script>