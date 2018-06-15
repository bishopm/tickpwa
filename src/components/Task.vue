<template>
  <div v-if="task" class="layout-padding">
    <h3 class="text-center q-mb-md">Edit task</h3>
    <form>
      <q-field class="q-pt-md">
        <q-input v-model="task.task" value="task.task" placeholder="Description" inverted/>
      </q-field>
      <q-field class="q-mt-sm">
        <q-select v-model="task.project_id" placeholder="Project" inverted :options="projectOptions" label="label" track-by="value"/>
      </q-field>
      <q-field class="q-mt-sm">
        <q-select v-model="users" multiple placeholder="Assigned to" inverted :options="userOptions" label="label" track-by="value"/>
      </q-field>
      <q-field class="q-mt-sm">
        <q-datetime inverted v-model="task.priority" minimal type="date" />
      </q-field>
      <div class="text-center q-my-md">
        <q-btn class="q-mr-md" label="Delete" color="red"></q-btn>
        <q-btn class="q-mr-md" label="Update" color="green"></q-btn>
        <q-btn label="Completed" color="orange"></q-btn>
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
    }
  },
  mounted () {
    this.$axios.get(this.$store.state.hostname + '/projects')
      .then(response => {
        for (var pkey in response.data) {
          var newitem = {
            label: response.data[pkey].project,
            value: response.data[pkey].id
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
