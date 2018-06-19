<template>
  <div class="layout-padding">
    <h4 class="text-center">Settings <small>{{user.name}}</small></h4>
    <q-field>
      <q-select v-model="project" @input="setToolbar" float-label="Toolbar project" inverted color="secondary" :options="projectOptions" label="label" track-by="value"/>
    </q-field>
    <div v-if="user.team" class="q-mt-md">
      <div class="caption text-center">Team members</div>
      <p class="q-my-md text-center" v-for="user in user.team" :key="user.id">
        {{user.name}} <q-btn size="sm" color="tertiary">Remove</q-btn>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      settings: {},
      project: 0,
      projectOptions: []
    }
  },
  methods: {
    setToolbar () {
      localStorage.setItem('Tick_Toolbar', this.project)
      this.$store.commit('setToolbar', JSON.parse(localStorage.getItem('Tick_Toolbar')))
    }
  },
  mounted () {
    this.user = this.$store.state.user
    this.$axios.get(this.$store.state.hostname + '/myprojects/' + this.user.id)
      .then(response => {
        for (var pkey in response.data.projects) {
          var newitem = {
            label: response.data.projects[pkey].project,
            value: response.data.projects[pkey].id
          }
          this.projectOptions.push(newitem)
          if (this.$store.state.toolbar) {
            this.project = this.$store.state.toolbar
          }
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
.q-list-striped > .q-item:nth-child(even) {
  background-color: #e6f3f7;
}
</style>
