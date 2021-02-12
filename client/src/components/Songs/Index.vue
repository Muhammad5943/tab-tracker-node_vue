<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <songs-search-panel />
      <songs-panel class="mt-2" />
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
import SongsSearchPanel from './SongsSearchPnel'
import SongsPanel from './SongsPanel'
import SongsService from '@/services/SongsService'
// import Panel from '@/components/Panel'

export default {
  components: {
    // Panel,
    SongsPanel,
    SongsSearchPanel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted() {
    this.songs = (await SongsService.index()).data
  }
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
