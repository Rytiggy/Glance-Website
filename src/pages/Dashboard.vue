<template>
  <q-page
    >Dashboard
    <q-card>{{ totalTreatments }}</q-card>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      iob: null,
      cob: null,
      totalTreatments: null
    };
  },
  async mounted() {
    this.iob = await this.$store.dispatch("treatments/getIOB");
    this.cob = await this.$store.dispatch("treatments/getCOB");
    this.totalTreatments = await this.getTotalTreatments();
  },
  methods: {
    async getTotalTreatments() {
      let iob = this.iob;
      let totalIob = 0;
      let totalIobTwo = 0;
      if (iob) {
        iob = Object.values(iob);
        iob.forEach(value => {
          if (value.user == 1) {
            totalIob += value.iob;
          } else if (value.user == 2) {
            totalIobTwo += value.iob;
          }
        });
      }

      let cob = this.cob;
      let totalCob = 0;
      let totalCobTwo = 0;
      if (cob) {
        cob = Object.values(cob);
        cob.forEach(value => {
          if (value.user == 1) {
            totalCob += value.cob;
          } else if (value.user == 2) {
            totalCobTwo += value.cob;
          }
        });
      }

      // TODO: round to 2nd place here
      return {
        userOne: {
          iob: Math.ceil(totalIob * 100) / 100,
          cob: Math.ceil(totalCob * 100) / 100
        },
        userTwo: {
          iob: Math.ceil(totalIobTwo * 100) / 100,
          cob: Math.ceil(totalCobTwo * 100) / 100
        }
      };
    }
  }
};
</script>
