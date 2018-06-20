<template>
  <div v-if="project">
    <q-tabs no-pane-border color="tertiary">
      <q-tab default slot="title" name="show" label="View project" icon="list" />
      <q-tab slot="title" name="edit" label="Edit project" icon="edit" />
      <q-tab-pane name="show">
        <h3 class="text-center">{{project.project}}</h3>
        <div class="text-justify q-px-md"><small>{{project.description}}</small></div>
        <q-list no-border>
          <task v-for="task in project.tasks" :key="task.id" :task="task"></task>
        </q-list>
        <q-btn round color="primary" @click="addTask" class="fixed" icon="add" style="right: 18px; bottom: 68px" />
      </q-tab-pane>
      <q-tab-pane name="edit">
        <projectform @project_added="refreshProject" :project="project" :userOptions="userOptions" :users="users" action="edit"/>
      </q-tab-pane>
      <q-modal v-model="modal" position="bottom" :content-css="{padding: '20px'}">
        <p class="text-center caption q-mb-md">Add a task to this project</p>
        <taskform :task="newt" :userOptions="userOptions" :users="users" action="add" :projectOptions="projectOptions" :project_id="project.id"/>
      </q-modal>
    </q-tabs>
  </div>
</template>

<script>
import projectform from './ProjectForm'
import task from './ShowTask'
import taskform from './TaskForm'
export default {
  data () {
    return {
      project: {},
      newt: {},
      userOptions: [],
      users: [],
      inactive: 0,
      projectOptions: [],
      modal: false
    }
  },
  components: {
    'projectform': projectform,
    'task': task,
    'taskform': taskform
  },
  methods: {
    addTask () {
      this.modal = true
    },
    refreshProject () {
      this.$axios.get(this.$store.state.hostname + '/projects/' + this.$route.params.id)
        .then(response => {
          this.project = response.data
          this.inactive = this.project.inactive
          for (var uu in this.project.users) {
            this.users.push(this.project.users[uu].id)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.userOptions = this.$store.state.teamusers
    this.$axios.get(this.$store.state.hostname + '/myprojects/' + this.$store.state.user.id)
      .then(response => {
        for (var pkey in response.data.projects) {
          var newitem = {
            label: response.data.projects[pkey].project,
            value: response.data.projects[pkey].id
          }
          this.projectOptions.push(newitem)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    this.refreshProject()
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
