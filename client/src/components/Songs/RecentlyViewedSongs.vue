<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="histories"
    >
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{ props.item.Song.title }}
        </td>
        <td class="text-xs-right">
          {{ props.item.Song.artist }}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
// panel was a global import
import {mapState} from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination:{
        sortBy: 'createdAt',
        descending: true
      },
      histories: []
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user' // cause we passin the user we are not use this.$store.state.user.id but we could use only this.user.id at the mounted
    ])
  },

  async mounted() {
    if (this.isUserLoggedIn) {
      this.histories = (await SongHistoryService.index({
        userId: this.user.id
      })).data
    }
  },
}
</script>

<style scoped>

</style>
