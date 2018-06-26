<template>
  <div class="layout-padding">
    <h3 class="text-center">Unallocated tasks</h3>
    <q-list striped v-if="tasks" no-border>
      <showtask v-for="task in tasks" :key="task.id" :task="task" @task_added="refreshTasks"/>
    </q-list>
    <p class="text-center" v-if="!tasks">All tasks have projects</p>
    <q-btn round color="secondary" @click="addTask" class="fixed" icon="add" style="right: 18px; top: 60px" />
  </div>
</template>

<script>
import showtask from './ShowTask'
export default {
  data () {
    return {
      tasks: [],
      modal: false,
      users: []
    }
  },
  components: {
    'showtask': showtask
  },
  methods: {
    addTask () {
      this.modal = true
    }
  },
  mounted () {
    this.modal = false
    this.tasks = []
    this.$axios.get(this.$store.state.hostname + '/myunallocated/' + this.$store.state.user.id)
      .then(response => {
        this.tasks = response.data.unallocatedtasks
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
  background-color: #f0f7e7;
}
</style>
