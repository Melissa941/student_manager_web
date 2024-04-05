<template>
  <v-container>
    <v-row>
      <v-col cols="12">
      <span>Create New Student</span>
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
          v-model="mobileNumber"
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
        <v-btn block color="primary">
          save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    let firstName = ref(null);
    let lastName = ref(null);
    let mobileNumber = ref(null);
    let email = ref(null);
    let dateOfBirth = ref(null);
    let currentScore = ref(null);

    return {
      firstName,
      lastName,
      mobileNumber,
      email,
      dateOfBirth,
      currentScore
    };
  },
};
</script>

<style scoped>
@primary: #5a4fcf;
</style>
