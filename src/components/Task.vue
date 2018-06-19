<template>
  <div v-if="task" class="layout-padding">
    <h3 class="text-center q-mb-md">Edit task</h3>
    <form>
      <q-field class="q-pt-md">
        <q-input v-model="task.task" value="task.task" float-label="Description" inverted color="secondary"/>
      </q-field>
      <q-field class="q-mt-sm">
        <q-select v-model="users" multiple float-label="Assigned to" color="secondary" inverted :options="userOptions" label="label" track-by="value"/>
      </q-field>
      <q-field class="q-mt-sm">
        <q-datetime inverted color="secondary" float-label="Active from" v-model="task.priority" minimal type="date" />
      </q-field>
      <q-field class="q-mt-sm">
        <q-select v-model="task.project_id" float-label="Project" inverted color="secondary" :options="projectOptions" label="label" track-by="value"/>
      </q-field>
      <div class="text-center q-my-md">
        <q-btn class="q-mr-md" @click="deleteTask" label="Delete" color="negative"></q-btn>
        <q-btn class="q-mr-md" @click="updateTask" label="Update" color="positive"></q-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      task: {},
      userOptions: [],
      users: [],
      projectOptions: []
    }
  },
  methods: {
    addTask () {
      console.log('adding')
    },
    updateTask () {
      this.$axios.post(this.$store.state.hostname + '/tasks/' + this.$route.params.id,
        {
          task: this.task.task,
          project_id: this.task.project_id,
          priority: this.task.priority,
          users: this.users
        })
        .then(response => {
          this.$q.notify({ message: 'Task has been updated', position: 'top', color: 'secondary' })
          this.$router.go(-1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteTask () {
      this.$axios.post(this.$store.state.hostname + '/deletetask',
        {
          id: this.$route.params.id
        })
        .then(response => {
          this.$q.notify({ message: 'Task has been deleted', position: 'top', color: 'secondary' })
          this.$router.go(-1)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
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
    this.$axios.get(this.$store.state.hostname + '/tasks/' + this.$route.params.id)
      .then(response => {
        this.task = response.data
        for (var uu in this.task.users) {
          this.users.push(this.task.users[uu].id)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
</style>
