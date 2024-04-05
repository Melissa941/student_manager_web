<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-select
          label="Search By*"
          v-model="searchBy"
          :items="searchItems"
          variant="outlined"
          color="primary"
        >
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
        <v-btn block color="primary">Search</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block variant="tonal" color="primary">Clear</v-btn>
      </v-col>
      <v-col>
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="students"
          :items-length="totalItems"
          :loading="loading"
          item-value="studentNumber"
          @update:options="loadItems">
          <template  v-slot:[`item.action`]>
            <v-btn>Add Score</v-btn>
            <v-btn icon="mdi-account" color="primary" variant="text"></v-btn>
            <v-btn icon="mdi-pencil-box-outline" variant="text" color="primary"></v-btn>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    let searchBy = ref(null);
    let searchItems = [
      "Student Number",
      "First Name",
      "Last Name",
      "Email Address",
    ];
    let searchCriteria = ref(null);
    const itemsPerPage = 5;
    const headers = [
      {
        title: "Student No.",
        align: "start",
        sortable: true,
        key: "studentNumber",
      },
      { title: "Full Name", key: "fullName",sortable: true, align: "start" },
      { title: "Cellphone Number", key: "cellphoneNo", align: "start" },
      { title: "Email", key: "email", align: "start" },
      { title: "Current Score", key: "currentScore", sortable: true,align: "start" },
      { title: "Average Score", key: "averageScore", sortable: true, align: "start" },
      { title: "Action", key: "action", align: "start" },
    ];
    let loading = ref(false);
    let students = ref([
      {
        studentNumber: '238111',
        fullName: 'Melisa Ledwaba',
        cellphoneNo: '075 6789 909',
        email: 'melisaledwaba@students.ac.za',
        currentScore: '99%',
        averageScore: '100%'
      },
      {
        studentNumber: '238111',
        fullName: 'Melisa Ledwaba',
        cellphoneNo: '075 6789 909',
        email: 'melisaledwaba@students.ac.za',
        currentScore: '99%',
        averageScore: '100%'
      },
      {
        studentNumber: '238111',
        fullName: 'Melisa Ledwaba',
        cellphoneNo: '075 6789 909',
        email: 'melisaledwaba@students.ac.za',
        currentScore: '99%',
        averageScore: '100%'
      },
      {
        studentNumber: '238111',
        fullName: 'Melisa Ledwaba',
        cellphoneNo: '075 6789 909',
        email: 'melisaledwaba@students.ac.za',
        currentScore: '99%',
        averageScore: '100%'
      }
    ])
    let totalItems = ref(students.value.length);

    return {
      searchBy,
      searchCriteria,
      searchItems,
      itemsPerPage,
      headers,
      loading,
      totalItems,
      students
    };
  },
};
</script>

<style scoped>
@primary: #5a4fcf;
</style>
