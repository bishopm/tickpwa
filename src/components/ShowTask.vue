<template>
  <q-item>
    <q-item-main class="text-left">
      <router-link :to="'/tasks/' + task.id" style="text-decoration:none">{{task.task}}</router-link>
    </q-item-main>
    <q-item-side class="text-right">
      <q-checkbox @click.native="taskDone(task.id)" true-value="yes" false-value="no" color="primary" v-model="task.done" />
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return { }
  },
  methods: {
    taskDone (id) {
      this.$axios.get(this.$store.state.hostname + '/tasks/' + id + '/toggle')
        .then(response => {
          if (this.$store.state.deletes === 'true') {
            this.$axios.post(this.$store.state.hostname + '/deletetask',
              {
                id: this.task.id
              })
            this.$emit('task_added')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.q-checkbox-icon {
  opacity: 1;
}
</style>
