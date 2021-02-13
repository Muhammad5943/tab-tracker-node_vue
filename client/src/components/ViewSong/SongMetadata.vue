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
          v-if="isUserLoggedIn"
          dark
          class="cyan"
          @click="Bookmark"
          >
          Bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn"
          dark
          class="cyan"
          @click="Unbookmark"
          >
          Unbookmark
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

export default {
  props: [
    'song'
  ],

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },

  methods: {
    Bookmark () {
      console.log('bookmark');
    },

    Unbookmark () {
      console.log('unbookmark');
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
