<template>
  <panel title="Song Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{song.title}}
        </div>
        <div class="song-artist">
          {{song.artist}}
        </div>
        <div class="song-genre">
          {{song.genre}}
        </div>

        <v-btn
          v-if="isUserLoggedIn"
          dark
          class="cyan"
          :to="{
              name: 'song-edit',
              params () {
                return  {
                  songId: song.id
                }
              }
          }">
          Edit
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && !bookmark"
          dark
          class="cyan"
          @click="setAsBookmark"
          >
          Set As bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn && bookmark"
          dark
          class="cyan"
          @click="unsetAsBookmark"
          >
          Unset As Bookmark
        </v-btn>
      </v-flex>


      <v-flex xs6>
        <img :src="song.albumImageUrl" class="album-image">
        <br>
        {{song.album}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
// import Panel from '@/components/Panel', you can get rid something like $store.state.{{ something }}

// we could make shortcut the route of permission that allow
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  props: [
    'song'
  ],

  data() {
    return {
      bookmark: null
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },

  /* watch: {
    async song() {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id,
          userId: this.user.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
        // this.isBookmarked = !!bookmark
        // console.log('bookmark', this.isBookmarked);
      } catch (error) {
        console.log(error);
      }
    }
  }, */

  async mounted() {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
          // userId: this.user.id (because we already used jwtStrategy)
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
        // this.isBookmarked = !!bookmark
        // console.log('bookmark', this.isBookmarked);
      } catch (error) {
        console.log(error);
      }
  },

  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
          // userId: this.user.id (because we already used jwtStrategy
        })).data
      } catch (error) {
        console.log(error);
      }
    },

    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (error) {
        console.log(error);
      }
    }
  },

  /* components: {
    Panel
  } */
}
</script>

<style scoped>
  .song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
  }

  .song-title{
    font-size: 30px;
  }

  .song-artist{
    font-size: 24px;
  }

  .song-genre{
    font-size: 18px;
  }

  .album-image {
    width: 70%;
    margin: 0 auto;
  }
</style>
