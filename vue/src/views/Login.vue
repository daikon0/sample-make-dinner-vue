<template>
  <div class="login">
    <form>
      <div>
        <label for="username">ユーザー名</label>
        <input v-model="username" type="text">
      </div>
      <div>
        <label for="password">パスワード</label>
        <input v-model="password" type="text">
      </div>
      <input type="button" v-on:click="localLogin">
    </form>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    localLogin: async function () {
      try {
        await axios.post('http://localhost:3000/auth/local', {
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
