<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Song">

      </panel>
      <!-- just for learning -->
      <!-- <panel>
        <div slot="hello">
          <h3>YO</h3>
          <p>hello there i am is paragraph tex</p>
        </div>

        <div slot="bye">
          <h3>bye</h3>
          <p>hello there i am is paragraph text</p>
        </div>
      </panel> -->
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
