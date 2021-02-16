<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks">
      <template slot="items" scope="props">
        <td class="text-xs-right">
          {{props.item.Song.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.Song.artist}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
// panel was a global import
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

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
      bookmarks: [
        /* {
          title: 'hello1',
          artist: 'test1'
        },
        {
          title: 'hello2',
          artist: 'test2'
        } */
      ]
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
      this.bookmarks = (await BookmarksService.index(/* {
        userId: this.user.id
      } "when you were implement jwt auth no more need the query userId string passin"*/)).data
    }
  }
}
</script>

<style scoped>

</style>
