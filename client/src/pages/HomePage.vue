<template>
    <div>
      <div class="lt-md" style="width:100%; height:200px;overflow: hidden;">
        <q-img src="~assets/BASESchool.jpg" />
      </div>
      <div class="gt-sm" style="width:100%; height:400px;overflow: hidden;">
        <q-img src="~assets/BASESchool.jpg" />
      </div>
      <div class="row text-center">
        <div class="col-12 col-md-4">
            <div class="row">
              <div class="col">
                <q-img src="~assets/BASELogo.jpg" width="80%" />
              </div>
              <div class="col">
                <p class="q-ma-none q-mt-md">created by:</p>
              <p class="q-mb-none text-bold">{{ creatorName }}</p>
              <p class="q-mb-md">visit me on <a :href="linkedIn"
                  target="_blank">LinkedIn</a></p>
              <q-img
                :src="linkedIn_pic"
                style="border-radius:50%;" width="50%" />
              </div>
            </div>
        </div>
        <div class="col-12 col-md-8">
          <h2 class="gt-sm text-center q-mb-md">Job Interest Poll</h2>
          <h3 class="lt-md text-center q-mb-md">Job Interest Poll</h3>
          <div class="container">
            <p>Welcome to the BASE job interest poll!
              The purpose of this poll is to obtain information about what job you may be interested interested when you
              enter your work life.
              This will help us to allocate resources for your education.</p>
            <h6 class="q-ma-none">Enter your school email to get started.</h6>
            <div class="row">
              <q-input outlined v-model="email" label="Email" style="width:80%" @focus="error = false" />
              <q-btn color="primary" class="q-ml-md" @click="go">Go</q-btn>
            </div>
            <p v-if="error" class="text-red text-bold">Email address is invalid.</p>
          </div>
        </div>
      </div>
    </div>
   </template>
   
   <script>
   export default {
    data() {
      return {
        error: false,
        email: ''
      }
    },
    computed: {
      creatorName () {
        return process.env.CREATOR_NAME
      },
      linkedIn () {
        return process.env.LINKEDIN
      },
      linkedIn_pic () {
        return process.env.LINKEDIN_PIC
      }
    },
    methods: {
      go() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          this.$router.push({ name: 'Poll', params: { user: this.email } })
        } else {
          this.error = true
        }
      }
    }
   }
   </script>
   
   <style>
   .container {
    width: 70%;
    margin: auto;
   }
   </style>
   
   