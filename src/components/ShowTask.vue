<template>
  <q-item>
    <q-item-main class="text-left">
      <router-link :to="'/tasks/' + task.id" style="text-decoration:none">{{task.task}}</router-link>
    </q-item-main>
    <q-item-side class="text-right">
      <q-checkbox @click.native="taskDone(task.id)" :true-value="1" :false-value="0" color="primary" v-model="task.done" />
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
          console.log('Toggled')
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
