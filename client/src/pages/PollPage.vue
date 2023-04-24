<template>
    <div>
      <h3 class="gt-sm text-center">Job Titles in Demand in New York City 2023</h3>
      <h5 class="lt-md text-center">Job Titles in Demand in New York City 2023</h5>
      <div class="row">
        <div class="col-8" style="margin:auto;">
          <q-card>
            <q-card-section>
              <span class="text-bold">Instructions:</span> The table below shows the jobs most in demand by employers in
              New York City.
              Each entry lists the number of job openings, the number of employers with job openings, the estimated
              average annual wage and the required education.
              If you cannot find your perfect choice pick something that is most similar.
              <br /><br />
              You can sort the table in multiple ways by using the dropbox below.
              <br /><br />
              This is an anonymous poll. Your name will not be visible to others. You can change your choice at any time.
              <br /><br />
              <span class="text-bold">SAVE your choice:</span> Make a selection, then scroll down to the end of the table
              to save your choice.
            </q-card-section>
          </q-card>
          <q-card class="q-mt-sm">
            <q-card-section>
              <div class="q-py-md">
                <q-select outlined v-model="sort" :options="options" label="Sort" />
              </div>
              <q-list bordered separator>
                <q-item v-for="(jobTitle, idx) in jobTitles" :key="idx">
                  <q-item-section avatar>
                    <q-radio v-model="selected" :val="jobTitle.JobTitle" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-bold">{{ jobTitle.JobTitle }}</q-item-label>
                    <q-item-label lines="4">Job Openings: {{ jobTitle.JobCount }} | Employers: {{ jobTitle.EmployerCount
                    }} |
                      Avg Annual Wage: ${{ jobTitle.AvgAnnualWage.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                      }} | required education: <span class="text-bold"
                        :class="jobTitle.RequiredEducation === 'mostly college' ? 'text-red' : 'text-blue'">{{
                            jobTitle.RequiredEducation
                        }}</span></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator dark />
            <q-card-actions align="around">
              <q-btn color="green" @click="saveChoice">Save your choice</q-btn>
              <q-btn color="blue" :to="{ name: 'Results' }">Show poll results</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
   </template>
   <script>
   export default {
    data() {
      return {
        error: false,
        user: null,
        jobTitles: [],
        selected: null,
        options: ['title', 'jobs', 'employers', 'wage'],
        sort: 'title'
      }
    },
    watch: {
      sort() {
        this.sortJobTitles(this.jobTitles)
      }
    },
    methods: {
      sortJobTitles(jobTitles) {
        this.jobTitles = jobTitles.sort((a, b) => {
          switch (this.sort) {
            case 'title':
              if (a.JobTitle > b.JobTitle) return 1;
              if (a.JobTitle < b.JobTitle) return -1;
              return 0
              break
            case 'jobs':
              if (a.JobCount < b.JobCount) return 1;
              if (a.JobCount > b.JobCount) return -1;
              return 0
              break
            case 'employers':
              if (a.EmployerCount < b.EmployerCount) return 1;
              if (a.EmployerCount > b.EmployerCount) return -1;
              return 0
              break
            case 'wage':
              if (a.AvgAnnualWage < b.AvgAnnualWage) return 1;
              if (a.AvgAnnualWage > b.AvgAnnualWage) return -1;
              return 0
              break
   
          }
        })
      },
      async saveChoice() {
        const data = {
          email: this.$route.params.user,
          JobTitle: this.selected,
          CreatorEmail: process.env.CREATOR_EMAIL
        }
        const result = await fetch(process.env.BASE_URL + '/api/poll', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(() => {
           this.$q.notify({
            message: 'Your choice has been recorded. Thank you!',
            color: 'positive'
           })
          })
      }
    },
    mounted() {
      if (typeof this.$route.params.user !== 'undefined') {
        this.user = this.$route.params.user
        fetch(process.env.BASE_URL + '/api/joblist')
          .then(response => response.json())
          .then(jobTitles => {
            this.sortJobTitles(jobTitles)
          })
      }
    }
   }
   </script>
   
   