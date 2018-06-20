<template>
  <form>
    <q-field class="q-pt-md">
      <q-input v-model="task.task" value="task.task" float-label="Description" inverted color="info"/>
    </q-field>
    <q-field class="q-mt-sm">
      <q-select v-model="users" multiple float-label="Assigned to" color="info" inverted :options="userOptions" label="label" track-by="value"/>
    </q-field>
    <q-field class="q-mt-sm">
      <q-datetime inverted color="info" float-label="Active from" v-model="task.priority" minimal type="date" />
    </q-field>
    <q-field class="q-mt-sm">
      <q-select v-model="task.project_id" float-label="Project" inverted color="info" :options="projectOptions" label="label" track-by="value"/>
    </q-field>
    <div class="text-center q-my-md">
      <q-btn v-if="action === 'edit'" class="q-mr-md" @click="deleteTask" label="Delete" color="negative"/>
      <q-btn v-else class="q-mr-md" color="negative" label="Cancel" />
      <q-btn v-if="action === 'edit'" class="q-mr-md" @click="updateTask" label="Update" color="secondary"/>
      <q-btn v-else color="secondary" label="Add" @click="submitTask" />
    </div>
  </form>
</template>

<script>
export default {
  props: ['task', 'userOptions', 'action', 'projectOptions', 'project_id', 'users'],
  data () {
    return {
      project: null
    }
  },
  created () {
    for (var uu in this.task.users) {
      this.users.push(this.task.users[uu].id)
    }
    this.project = this.project_id
  },
  methods: {
    submitTask () {
      this.$axios.post(this.$store.state.hostname + '/tasks',
        {
          task: this.task.task,
          project_id: this.task.project_id,
          priority: this.task.priority,
          users: this.users
        })
        .then(response => {
          this.$q.notify({ message: 'Task has been added', position: 'top', color: 'secondary' })
          this.$emit('task_added')
        })
        .catch(function (error) {
          console.log(error)
        })
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
          this.$emit('task_added')
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
  }
}
</script>

<style>
</style>
