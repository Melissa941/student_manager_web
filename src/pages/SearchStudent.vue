<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="6">
        <v-select
            label="Search By*"
            v-model="searchType"
            :items="searchItems"
            variant="outlined"
            color="primary">
        </v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field
            label="Search Criteria*"
            v-model="searchCriteria"
            variant="outlined"
            color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-btn block color="primary" @click="searchBy">Search</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block variant="tonal" color="primary" @click="clearSearch">Clear</v-btn>
      </v-col>
      <v-col cols="12" v-if="alert.message != null">
        <v-alert
            :text="alert.message"
            :type="alert.type">
        </v-alert>
      </v-col>
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items="students"
              :items-length="totalItems"
              :loading="loading"
              class="elevation-1 mt-10"
              item-value="studentNumber"
              @update:options="loadItems">
            <template v-slot:[`item.fullName`]="{item}">
              {{ item.firstName }} {{ item.lastName }}
            </template>
            <template v-slot:[`item.currentScore`]="{item}">
              {{ item.currentScore }}%
            </template>
            <template v-slot:[`item.averageScore`]="{item}">
              {{ item.averageScore }}%
            </template>
            <template v-slot:[`item.action`]="{item}">
              <v-btn @click="toggleAddScore(item)" color="primary">Add Score</v-btn>
              <v-btn icon="mdi-account" color="primary" variant="text"></v-btn>
              <v-btn icon="mdi-pencil-box-outline" variant="text" color="primary"></v-btn>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
      <v-dialog v-model="addScoreDialog" max-width="600">
        <v-card title="Add Student Score">
          <v-divider></v-divider>
          <v-card-title>
            <v-row>
              <v-col cols="6">
                <span class="text-subtitle-1">Full Name</span>
              </v-col>
              <v-col cols="6">
                <v-text-field
                    v-model="addFullName"
                    disabled
                    color="primary"
                    variant="outlined">
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <span class="text-subtitle-1">Score</span>
              </v-col>
              <v-col cols="6">
                <v-text-field
                    type="number"
                    suffix="%"
                    v-model="score"
                    color="primary"
                    variant="outlined">
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-col cols="6" class="pa-0">
              <v-btn block text="Cancel" variant="tonal" color="primary" @click="addScoreDialog = false"></v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block text="Save" color="primary" @click="addScore(studentNumber,score)" variant="elevated"></v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-col>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";

export default {
  setup() {
    let searchType = ref(null);
    let searchItems = [
      "Student Number",
      "First Name",
      "Last Name",
      "Email Address",
    ];
    let searchCriteria = ref(null);
    const itemsPerPage = 10;
    const headers = [
      {
        title: "Student No.",
        align: "start",
        sortable: true,
        key: "studentNumber",
      },
      {title: "Full Name", key: "fullName", sortable: true, align: "start"},
      {title: "Cellphone Number", key: "cellphoneNumber", align: "start"},
      {title: "Email", key: "email", sortable: true, align: "start"},
      {title: "Current Score", key: "currentScore", sortable: true, align: "start"},
      {title: "Average Score", key: "averageScore", sortable: true, align: "start"},
      {title: "Action", key: "action", align: "start"},
    ];
    let loading = ref(true);
    let students = ref([])
    let totalItems = ref(students.value.length);
    let addScoreDialog = ref(false)
    let alert = ref({
      message: null,
      type: 'success'
    })
    let score = ref(null)
    let addFullName = ref(null)
    let studentNumber = ref(null)

    return {
      searchType,
      searchCriteria,
      searchItems,
      itemsPerPage,
      headers,
      loading,
      totalItems,
      students,
      addScoreDialog,
      alert,
      score,
      studentNumber,
      addFullName
    };
  },
  methods: {

    async getStudents() {
      const response = await axios.get("/api/students");
      this.students = response.data;
      this.loading = false
      this.totalItems = this.students.length
    },

    async searchBy() {
      this.loading = true
      if (this.searchType === "Student Number") {
        await axios.get("/api/students/" + this.searchCriteria)
            .then((response) => {
              this.students = []
              this.students.push(response.data)
            })
      } else if (this.searchType === "First Name") {
        await axios.get("/api/students/get/firstname/" + this.searchCriteria)
            .then((response) => {
              this.students = response.data
            })
      } else if (this.searchType === "Last Name") {
        await axios.get("/api/students/get/lastname/" + this.searchCriteria)
            .then((response) => {
              this.students = response.data
            })
      } else if (this.searchType === "Email Address") {
        await axios.get("/api/students/get/email/" + this.searchCriteria)
            .then((response) => {
              this.students = response.data
            })
      }
      this.loading = false
    },

    clearSearch() {
      this.searchType = null;
      this.searchCriteria = null;
    },

    async addScore(studentNumber, score){
      await axios.post("/api/students/score/" + studentNumber, {score: score})
          .then((response) => {
            console.log(response)
            if(response.data == "Student score successfully Added!"){
              this.alert.type='success'
              this.alert.message="Student score successfully Added!"
            }else{
              this.alert.type='error'
              this.alert.message="Could not add score"
            }
          })
      this.getStudents();
      this.addScoreDialog = false
    },

    toggleAddScore(item) {
      console.log(item)
      this.addFullName = item.firstName + " " + item.lastName
      this.addScoreDialog = true
      this.studentNumber = item.studentNumber
    }
  },

  beforeMount() {
    this.getStudents();
  },
};
</script>

<style scoped>
@primary: #5a4fcf;
</style>