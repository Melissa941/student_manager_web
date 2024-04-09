<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
      <span>Create New Student</span>
    </v-col>
      <v-col cols="12" v-if="alert.message != null">
        <v-alert
        :text="alert.message"
        :type="alert.type">
        </v-alert>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="First Name*"
          v-model="firstName"
          variant="outlined"
          color="primary">
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Last Name*"
          v-model="lastName"
          variant="outlined"
          color="primary">
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Mobile Number*"
          type="number"
          v-model="cellphoneNumber"
          variant="outlined"
          color="primary">
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Email Address*"
          v-model="email"
          variant="outlined"
          color="primary">
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Date of Birth*"
          type="date"
          v-model="dateOfBirth"
          variant="outlined"
          color="primary">
        </v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Current Score"
          suffix="%"
          type="number"
          v-model="currentScore"
          variant="outlined"
          color="primary">
        </v-text-field>
      </v-col>
      <v-col  cols="6">
        <v-btn block color="primary" variant="tonal">
          cancel
        </v-btn>
      </v-col>
      <v-col  cols="6">
        <v-btn block color="primary" @click="createStudent">
          save
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";

export default {
  setup() {
    let firstName = ref(null);
    let lastName = ref(null);
    let cellphoneNumber = ref(null);
    let email = ref(null);
    let dateOfBirth = ref(null);
    let currentScore = ref(null);
    let alert = ref({
      message: null,
      type: 'success'
    })

    return {
      firstName,
      lastName,
      cellphoneNumber,
      email,
      dateOfBirth,
      currentScore,
      alert
    };
  },
  methods: {
    async createStudent() {
      const response = await axios.post("/api/students", {
        studentNumber: "KTL",
        firstName: this.firstName,
        lastName: this.lastName,
        cellphoneNumber: this.cellphoneNumber,
        email: this.email,
        dateOfBirth: this.dateOfBirth,
        currentScore: this.currentScore,
        averageScore: this.currentScore
      });

      this.alert.message = "Student successfully created!"
      this.alert.type = "success"
      console.log(response)
    },
  },
};
</script>

<style scoped>
@primary: #5a4fcf;
</style>
