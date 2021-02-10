<template>
  <div class="white elevation-2">
    <v-toolbar flat dense class="cyan" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>

    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No slot content defined.
      </slot>
      <!-- <slot name="hello">
        No slot content defined.
      </slot>

      <slot name="bye">
        bye bye bye.
      </slot> -->
    </div>
  </div>
</template>

<script>
export default {
  /* when yo wanted to define title with hardcode */
  // data () {
  //   return {
  //     title: 'Hello World'
  //   }
  // }
  props: [
    'title'
  ]

}
</script>

<style scoped>

</style>
