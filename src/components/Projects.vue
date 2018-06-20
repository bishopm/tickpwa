<template>
  <div class="layout-padding">
    <h3 class="text-center">Current Projects</h3>
    <q-list no-border striped>
      <q-item v-if="projects" v-for="project in projects" :key="project.id" :to="'/projects/' + project.id">
        <q-item-main class="text-left">
          {{project.project}}
        </q-item-main>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!projects">No active projects at the moment</p>
    <q-btn round color="primary" @click="addProject" class="fixed" icon="add" style="right: 18px; bottom: 68px" />
    <q-modal v-model="modal" position="bottom" :content-css="{padding: '20px'}">
      <p class="text-center caption q-mb-md">Add a new project</p>
      <projectform :project="newp" :userOptions="userOptions" :users="users" @project_added="refreshProjects" action="add"/>
    </q-modal>
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
        'cacheKey': 'Tick_Projects',
        'saveProperties': ['projects']
      }
    },
    refreshProjects () {
      this.modal = false
      this.$axios.get(this.$store.state.hostname + '/myprojects/' + this.$store.state.user.id)
        .then(response => {
          this.projects = response.data.projects
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
  background-color: #e6f3f7;
}
</style>
