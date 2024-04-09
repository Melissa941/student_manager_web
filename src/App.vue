<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="12">
        <h1>Student Manager</h1>
      </v-col>
      <v-row>
        <v-col>
          <RouterLink to="/search">Go to Search</RouterLink>
<!--                    <v-btn text="Search" @click="$router.push({path: '/search'})"></v-btn>-->
        </v-col>
        <v-col>
          <RouterLink to="/createstudent">Go to Create Student</RouterLink>
        </v-col>
      </v-row>
      <main>
        <RouterView/>
      </main>
    </v-row>
  </v-col>
</template>
<script>
import {useRoute} from "vue-router";

export default {
  setup() {
    let router = useRoute()
    return {
      router
    }
  },
  methods: {
    // nav(page){
    //   this.$router.push(page)
    // }
  }
}
</script>
