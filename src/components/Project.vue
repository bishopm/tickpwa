<template>
  <div v-if="project" class="layout-padding">
    <h3 class="text-center">{{project.project}}</h3>
    <div class="layout-padding text-justify"><small>{{project.description}}</small></div>
    <q-list no-border>
      <q-item v-if="project.tasks" v-for="task in project.tasks" :key="task.id">
        <q-item-main class="text-left">
          <router-link :to="'/tasks/' + task.id" style="text-decoration:none">{{task.task}}</router-link>
        </q-item-main>
        <q-item-side class="text-right">
          <q-icon @click.native="taskDone(task.id)" size="24px" class="cursor-pointer" :name="task.done ? 'check_box' : 'check_box_outline_blank'"/>
        </q-item-side>
      </q-item>
    </q-list>
    <q-btn round color="primary" @click="addTask" class="fixed" icon="add" style="right: 18px; bottom: 68px" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      project: {}
    }
  },
  methods: {
    addTask () {
      console.log('adding')
    },
    taskDone (id) {
      this.$axios.get(this.$store.state.hostname + '/tasks/' + id + '/toggle')
        .then(response => {
          this.refreshProject()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    refreshProject () {
      this.$axios.get(this.$store.state.hostname + '/projects/' + this.$route.params.id)
        .then(response => {
          this.project = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
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
