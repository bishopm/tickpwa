<template>
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
      <q-select v-if="action === 'edit'" v-model="project.inactive" float-label="Project status" inverted :options="activeOptions" color="secondary" label="label" track-by="value"/>
    </q-field>
    <div class="text-center q-my-md">
      <q-btn v-if="action === 'edit'" class="q-mr-md" label="Delete" color="negative"></q-btn>
      <q-btn v-else class="q-mr-md" @click="$emit('project_added')" color="negative" label="Cancel" />
      <q-btn v-if="action === 'edit'" class="q-mr-md" @click="updateProject" label="Update" color="positive"></q-btn>
      <q-btn v-else color="positive" label="Add" @click="submitProject" />
    </div>
  </form>
</template>

<script>
export default {
  props: ['project', 'userOptions', 'action'],
  data () {
    return {
      activeOptions: [{ label: 'Active', value: 0 }, { label: 'Inactive', value: 1 }],
      users: []
    }
  },
  created () {
    for (var uu in this.project.users) {
      this.users.push(this.project.users[uu].id)
    }
  },
  methods: {
    submitProject () {
      this.$axios.post(this.$store.state.hostname + '/projects',
        {
          project: this.project.project,
          description: this.project.description,
          users: this.users
        })
        .then(response => {
          this.$q.notify({ message: 'Project has been added', position: 'top', color: 'secondary' })
          this.$emit('project_added')
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
          this.$emit('project_added')
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
