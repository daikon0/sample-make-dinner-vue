<template>
  <div class="register">
    <form action="/register">
      <div>
        <label for="username">ユーザー名</label>
        <input v-model="username" type="text">
      </div>
      <div>
        <label for="password">パスワード</label>
        <input v-model="password" type="text">
      </div>
      <input type="button" v-on:click="userCreate">
    </form>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Register',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    userCreate: async function () {
      try {
        await axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password
        })
      } catch (err) {
        alert(JSON.stringify(err))
      }
    }
  }
}
</script>
