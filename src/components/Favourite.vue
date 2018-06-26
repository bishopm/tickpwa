<template>
  <div v-if="project">
    <h3 class="text-center">{{project.project}}</h3>
    <div class="text-justify q-px-md"><small>{{project.description}}</small></div>
    <q-list no-border>
      <task v-for="task in project.tasks" :key="task.id" :task="task"></task>
    </q-list>
    <q-btn round color="secondary" @click="addTask" class="fixed" icon="add" style="right: 18px; top: 60px" />
    <q-modal v-model="modal" position="bottom" :content-css="{padding: '20px'}">
      <p class="text-center caption q-mb-md">Add a task to this project</p>
      <taskform @task_added="refreshProject" :task="newt" :userOptions="userOptions" :users="users" action="add" :projectOptions="projectOptions" :project_id="project.id"/>
    </q-modal>
  </div>
</template>

<script>
import task from './ShowTask'
import taskform from './TaskForm'
export default {
  data () {
    return {
      project: {},
      newt: {},
      userOptions: [],
      users: [],
      projectOptions: [],
      modal: false
    }
  },
  components: {
    'task': task,
    'taskform': taskform
  },
  methods: {
    addTask () {
      this.modal = true
    },
    refreshProject () {
      this.modal = false
      this.$axios.get(this.$store.state.hostname + '/projects/' + this.$store.state.toolbar)
        .then(response => {
          this.project = response.data
          this.newt.project_id = this.project.id
          this.newt.priority = new Date().toISOString().substr(0, 10)
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
        for (var pkey in response.data.activeprojects) {
          var newitem = {
            label: response.data.activeprojects[pkey].project,
            value: response.data.activeprojects[pkey].id
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
