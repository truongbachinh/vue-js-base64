<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand mx-4">Lotte HPT</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/employees" class="nav-link">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-employee" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  watch: {
  },
  name: "App",
 
};
</script>

<style>
</style>
