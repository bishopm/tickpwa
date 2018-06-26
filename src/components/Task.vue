<template>
  <div v-if="task" class="layout-padding">
    <h3 class="text-center q-mb-md">Edit task</h3>
    <taskform :task="task" :userOptions="userOptions" :users="users" action="edit" :projectOptions="projectOptions" :project_id="project_id"/>
  </div>
</template>

<script>
import taskform from './TaskForm'
export default {
  data () {
    return {
      task: {},
      userOptions: [],
      users: [],
      project_id: 0,
      projectOptions: []
    }
  },
  components: {
    'taskform': taskform
  },
  methods: {
    addTask () {
      console.log('adding')
    }
  },
  mounted () {
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
    this.$axios.get(this.$store.state.hostname + '/tasks/' + this.$route.params.id)
      .then(response => {
        for (var uu in response.data.users) {
          this.users.push(response.data.users[uu].id)
        }
        this.project_id = response.data.project_id
        this.task = response.data
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
