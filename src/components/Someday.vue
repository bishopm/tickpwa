<template>
  <div class="layout-padding">
    <h3 class="text-center">For the slower day</h3>
    <q-list no-border striped>
      <q-item v-if="projects" v-for="project in projects" :key="project.id" :to="'/projects/' + project.id">
        <q-item-main class="text-left">
          {{project.project}}
        </q-item-main>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!projects">No archived projects at the moment</p>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import projectform from './ProjectForm'
export default {
  data () {
    return {
      projects: [],
      modal: false,
      newp: {},
      userOptions: [],
      users: []
    }
  },
  components: {
    'projectform': projectform
  },
  mixins: [saveState],
  methods: {
    addProject () {
      this.modal = true
    },
    getSaveStateConfig () {
      return {
        'cacheKey': 'Tick_Archives',
        'saveProperties': ['projects']
      }
    },
    refreshProjects () {
      this.modal = false
      this.$axios.get(this.$store.state.hostname + '/someday/' + this.$store.state.user.id)
        .then(response => {
          this.projects = response.data.inactiveprojects
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.refreshProjects()
    this.userOptions = this.$store.state.teamusers
    this.users.push(this.$store.state.user.id)
    this.newp.inactive = 'no'
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #f0f7e7;
}
</style>
