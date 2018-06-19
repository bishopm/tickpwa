<template>
  <div class="layout-padding">
    <h3 class="text-center">Tasks</h3>
    <q-list striped v-if="tasks" no-border>
      <q-item v-for="task in tasks" :key="task.id">
        <q-item-main class="text-left">
          <router-link :to="'/tasks/' + task.id" style="text-decoration:none">{{task.task}}</router-link>
        </q-item-main>
        <q-item-side class="text-right">
          <q-icon @click.native="taskDone(task.id)" size="24px" class="cursor-pointer" :name="task.done === 1 ? 'check_box' : 'check_box_outline_blank'"/>
        </q-item-side>
      </q-item>
    </q-list>
    <p class="text-center" v-if="!tasks">All current tasks are done!</p>
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
          <q-select v-model="users" multiple placeholder="Assigned to" inverted :options="userOptions" label="label" track-by="value"/>
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
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      tasks: [],
      modal: false,
      users: [],
      newt: {},
      projectOptions: [],
      userOptions: []
    }
  },
  mixins: [saveState],
  methods: {
    addTask () {
      this.modal = true
    },
    getSaveStateConfig () {
      return {
        'cacheKey': 'Tick_Tasks',
        'saveProperties': ['tasks']
      }
    },
    refreshTasks () {
      this.$axios.get(this.$store.state.hostname + '/mytasks/' + this.$store.state.user.id)
        .then(response => {
          this.tasks = response.data.activetasks
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    taskDone (id) {
      this.$axios.get(this.$store.state.hostname + '/tasks/' + id + '/toggle')
        .then(response => {
          this.refreshTasks()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submitTask () {
      this.$axios.post(this.$store.state.hostname + '/tasks',
        {
          task: this.newt.task,
          project_id: this.newt.project_id,
          priority: this.newt.priority,
          users: this.users
        })
        .then(response => {
          this.newt = {}
          this.modal = false
          this.refreshTasks()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    if (!localStorage.getItem('Tick_User')) {
      this.$router.push({name: 'login'})
    } else {
      this.$store.commit('setUser', JSON.parse(localStorage.getItem('Tick_User')))
    }
    if (localStorage.getItem('Tick_Toolbar')) {
      this.$store.commit('setToolbar', JSON.parse(localStorage.getItem('Tick_Toolbar')))
    }
    this.newt.priority = new Date().toISOString().substr(0, 10)
    this.refreshTasks()
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
    this.userOptions.push({ label: this.$store.state.user.username, value: this.$store.state.user.id })
    for (var ukey in this.$store.state.user.team) {
      var newitem = {
        label: this.$store.state.user.team[ukey].username,
        value: this.$store.state.user.team[ukey].id
      }
      this.userOptions.push(newitem)
      this.users.push(this.$store.state.user.id)
    }
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
  background-color: #e6f3f7;
}
</style>
