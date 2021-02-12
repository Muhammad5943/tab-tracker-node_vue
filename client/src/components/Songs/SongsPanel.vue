<template>
  <panel title="Song">
    <v-btn
      slot="action"
      :to="{
        name: 'songs-create'
      }"
      class="cyan accent-2"
      light
      medium
      absolute
      right
      middle
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>

    <div
      v-for="song in songs"
      class="song"
      :key="song.id">

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
                name: 'song',
                params: {
                  songId: song.id
                }
            }"
          >
            View
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img :src="song.albumImageUrl" class="album-image">
        </v-flex>
      </v-layout>
    </div>
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
</template>

<script>
import SongsService from '@/services/SongsService'
// import Panel from '@/components/Panel'

export default {
  /* components: {
    Panel
  }, */
  data () {
    return {
      songs: null
    }
  },
  watch: {
    // TODO: methode to execute search value which past in url and find the data
    '$route.query.search': {
      immediate: true, // immediate can do the same thing with mounted
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
  /* async mounted() {
    this.songs = (await SongsService.index()).data
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
