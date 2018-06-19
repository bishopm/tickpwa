<template>
  <div class="layout-padding">
    <h3 class="text-center">For the slower day ...</h3>
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
      <form>
        <q-field>
          <q-input v-model="newp.project" placeholder="Project name" inverted/>
        </q-field>
        <q-field class="q-mt-sm">
          <q-input v-model="newp.description" placeholder="Description" inverted/>
        </q-field>
        <q-field class="q-mt-sm">
          <q-select v-model="users" multiple placeholder="Who can see this project?" inverted :options="userOptions" label="label" track-by="value"/>
        </q-field>
      </form>
      <div class="q-mt-lg text-right">
        <q-btn class="q-mr-md" color="red" @click="modal = false" label="Cancel" />
        <q-btn color="green" label="Add" @click="submitProject" />
      </div>
    </q-modal>
  </div>
</template>

<script>
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
  methods: {
    addProject () {
      this.modal = true
    },
    submitProject () {
      this.$axios.post(this.$store.state.hostname + '/projects',
        {
          project: this.newp.project,
          description: this.newp.description,
          users: this.users
        })
        .then(response => {
          this.newp = {}
          this.modal = false
          this.refreshProjects()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    refreshProjects () {
      this.$axios.get(this.$store.state.hostname + '/someday')
        .then(response => {
          this.projects = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.refreshProjects()
    this.$axios.get(this.$store.state.hostname + '/users')
      .then(response => {
        for (var ukey in response.data) {
          var newitem = {
            label: response.data[ukey].username,
            value: response.data[ukey].id
          }
          this.userOptions.push(newitem)
        }
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #e6f3f7;
}
</style>
