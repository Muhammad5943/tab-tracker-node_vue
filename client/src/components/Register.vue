<template>
  <div>
    <h1>Register</h1>

    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email@mail.com"
    />
    <br>

    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"
    />
    <br>

    <button
      @click="register">
      Register
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  /* watch: {
    email(value) {
      console.log('email has changed', value);
    }
  }, */
  methods: {
    register (value){
      console.log('register button was click', this.email, this.password);
    }
  },
  /* mounted() {
    setTimeout(() => {
      this.email = 'hello world'
    }, 2000)
  }, */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
