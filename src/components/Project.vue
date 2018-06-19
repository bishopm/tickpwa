<template>
  <div v-if="project">
    <q-tabs no-pane-border color="tertiary">
      <q-tab default slot="title" name="show" label="View project" icon="list" />
      <q-tab slot="title" name="edit" label="Edit project" icon="edit" />
      <q-tab-pane name="show">
        <h3 class="text-center">{{project.project}}</h3>
        <div class="text-justify"><small>{{project.description}}</small></div>
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
      </q-tab-pane>
      <q-tab-pane name="edit">
        <form>
          <q-field>
            <q-input float-label="Project name" v-model="project.project" inverted color="secondary"/>
          </q-field>
          <q-field class="q-mt-sm">
            <q-input v-model="project.description" float-label="Description" inverted color="secondary"/>
          </q-field>
          <q-field class="q-mt-sm">
            <q-select v-model="users" multiple float-label="Who can see this project?" inverted color="secondary" :options="userOptions" label="label" track-by="value"/>
          </q-field>
          <q-field class="q-mt-sm">
            <q-select v-model="project.inactive" float-label="Project status" inverted :options="activeOptions" color="secondary" label="label" track-by="value"/>
          </q-field>
          <div class="text-center q-my-md">
            <q-btn class="q-mr-md" label="Delete" color="negative"></q-btn>
            <q-btn class="q-mr-md" @click="updateProject" label="Update" color="positive"></q-btn>
          </div>
        </form>
      </q-tab-pane>
      <q-modal v-model="modal" position="bottom" :content-css="{padding: '20px'}">
        <p class="text-center caption q-mb-md">Add a task to this project</p>
        <form>
          <q-field>
            <q-input v-model="newt.task" placeholder="Description" inverted/>
          </q-field>
          <q-field class="q-mt-sm">
            <q-select v-model="users" multiple placeholder="Assigned to" inverted :options="userOptions" label="label" track-by="value"/>
          </q-field>
          <q-field class="q-mt-sm">
            <q-datetime inverted v-model="newt.priority" minimal type="date" />
          </q-field>
        </form>
        <div class="q-mt-lg text-right">
          <q-btn class="q-mr-md" color="negative" @click="modal = false" label="Cancel" />
          <q-btn color="positive" label="Add" @click="submitTask" />
        </div>
      </q-modal>
    </q-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      project: {},
      newt: {},
      userOptions: [],
      activeOptions: [{ label: 'Active', value: 0 }, { label: 'Inactive', value: 1 }],
      users: [],
      modal: false
    }
  },
  methods: {
    addTask () {
      this.modal = true
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
    submitTask () {
      this.$axios.post(this.$store.state.hostname + '/tasks',
        {
          task: this.newt.task,
          project_id: this.$route.params.id,
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
    },
    updateProject () {
      this.$axios.post(this.$store.state.hostname + '/projects/' + this.$route.params.id,
        {
          project: this.project.project,
          description: this.project.description,
          users: this.users,
          inactive: this.project.inactive
        })
        .then(response => {
          this.$q.notify({ message: 'Project has been updated', position: 'top', color: 'secondary' })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    refreshProject () {
      this.$axios.get(this.$store.state.hostname + '/projects/' + this.$route.params.id)
        .then(response => {
          this.project = response.data
          for (var uu in this.project.users) {
            this.users.push(this.project.users[uu].id)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.refreshProject()
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
</style>
