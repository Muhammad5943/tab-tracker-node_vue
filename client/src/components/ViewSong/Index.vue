<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex xs6 class="ml-2">
        <you-tube :youtubeId="song.youtubeId" />
      </v-flex>
    </v-layout>


    <v-layout class="mt-2">
      <v-flex xs6>
        <tab :song="song" />
      </v-flex>

      <v-flex xs6 class="ml-2 mt-2">
        <lyrics :song="song" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import Lyrics from './Lyrics'
import Tab from './Tab'
import SongsServices from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'
import { mapState } from 'vuex'
// import Panel from '@/components/Panel'

export default {
  data () {
    return {
      song: null
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },

  async mounted() {
    const songId = this.route.params.songId
    // console.log(songId); /* for testing in vuex */
    this.song = (await SongsServices.show(songId)).data /* implement from the backend */
    // console.log(song);

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
        // userId: this.user.id {no need passin it when already used jwt-passport}
      })
    }
  },
  components: {
    // Panel,
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>

</style>
