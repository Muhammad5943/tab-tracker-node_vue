<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
        ></v-text-field>

        <v-text-field
          label="Artist"
          v-model="song.artist"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="Genre"
          v-model="song.genre"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="Album"
          v-model="song.album"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="Album Image URL"
          v-model="song.albumImageUrl"
          required
          :rules="[required]"
        ></v-text-field>

        <v-text-field
          label="YouTube ID"
          v-model="song.youtubeId"
          required
          :rules="[required]"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="Tab"
          multi-line
          required
          :rules="[required]"
          v-model="song.tab"
        ></v-text-field>

        <v-text-field
          label="Lyrics"
          multi-line
          required
          :rules="[required]"
          v-model="song.lyrics"
        ></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="cyan"
        @click="save()"
      >
        Save
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
// import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required'
    }
  },

  methods: {
    async save() {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }

      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (error) {
        console.log(err)
      }
    }
  },

  async mounted() {
    try {
        const songId = this.$store.state.route.params.songId
        this.song = (await SongsService.show(songId)).data
      } catch (error) {
        console.log(error)
      }
  },

  /* components: {
    Panel
  } */
}
</script>

<style scoped>

</style>
