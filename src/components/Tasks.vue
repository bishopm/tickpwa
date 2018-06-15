<template>
  <div class="layout-padding">
    <h3 class="text-center">Tasks</h3>
    <q-list no-border>
      <q-item v-if="istasks" v-for="task in tasks" :key="task.id">
        <q-item-main class="text-left">
          <b>{{task.task}}</b>
        </q-item-main>
        <q-item-side class="text-right">
          <q-icon name="check_box_outline_blank"/>
        </q-item-side>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!istasks">No priority tasks at the moment</p>
    <q-btn round color="primary" @click="addTask" class="fixed" icon="add" style="right: 18px; bottom: 68px" />
    <q-modal v-model="modal" position="bottom" :content-css="{padding: '20px'}">
      <p class="text-center caption q-mb-md">Add a new task</p>
      <form>
        <q-field>
          <q-input v-model="newt.task" placeholder="Description" inverted/>
        </q-field>
        <q-field class="q-mt-sm">
          <q-select v-model="newt.project_id" placeholder="Project" inverted :options="projectOptions" label="label" track-by="value"/>
        </q-field>
        <q-field class="q-mt-sm">
          <q-datetime inverted v-model="newt.priority" minimal type="date" />
        </q-field>
      </form>
      <div class="q-mt-lg text-right">
        <q-btn class="q-mr-md" color="red" @click="modal = false" label="Cancel" />
        <q-btn color="green" label="Add" @click="submitTask" />
      </div>
    </q-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tasks: [],
      modal: false,
      newt: {},
      projectOptions: []
    }
  },
  computed: {
    istasks () {
      if (this.tasks.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addTask () {
      this.modal = true
    },
    submitTask () {
      this.$axios.post(this.$store.state.hostname + '/tasks',
        {
          task: this.newt.task,
          project_id: this.newt.project_id,
          priority: this.newt.priority,
          user_id: 1
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.newt.priority = new Date().toISOString().substr(0, 10)
    this.$axios.get(this.$store.state.hostname + '/tasks')
      .then(response => {
        this.tasks = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
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
