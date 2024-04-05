<template>
  <h1>Student Manager</h1>
  <v-row>
    <v-col>
    <RouterLink to="/search">Go to Search</RouterLink>
    </v-col>
    <v-col>
    <RouterLink to="/createstudent">Go to Create Student</RouterLink>
  </v-col>
  </v-row>
  <main>
    <RouterView />
  </main>
</template>

<script>
</script>
