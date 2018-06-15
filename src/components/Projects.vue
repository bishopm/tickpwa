<template>
  <div class="layout-padding">
    <h3 class="text-center">Projects</h3>
    <q-list no-border>
      <q-item v-if="projects" v-for="project in projects" :key="project.id">
        <q-item-main class="text-left">
          <b>{{project.project}}</b>
        </q-item-main>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!projects">No active projects at the moment</p>
    <q-btn round color="primary" @click="addProject" class="fixed" icon="add" style="right: 18px; bottom: 68px" />
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      projects: null
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Tick_Projects'
      }
    },
    addProject () {
      console.log('adding')
    }
  },
  mounted () {
    this.$axios.get(this.$store.state.hostname + '/projects')
      .then(response => {
        this.projects = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }

}
</script>

<style>
.layout-padding {
  padding-top:0;
}
h3 {
  line-height:0px;
}
</style>
