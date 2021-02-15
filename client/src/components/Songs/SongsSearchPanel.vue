<template>
  <panel title="Search">
    <v-text-field
      label="Search by song title, artisi, album, or genre"
      v-model="search"
      autocomplete="new-password"
    ></v-text-field>
  </panel>
</template>

<script>
// importing lodash for took time when inputing search query
import _ from 'lodash'
export default {
  data() {
    return {
      search: ''
    }
  },
  watch: {
    // TODO: searching method
    // debounch is took looping query but it hold with lodash
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '' ) {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route).catch((err)=>{
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) {
          // But print any other errors to the console
          logError(err);
        }
      });
      // console.log(value);
    }, 700),
    // to pass the sync query from url to search textbox
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>

</style>
