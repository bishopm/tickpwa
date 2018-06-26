<template>
  <div class="layout-padding">
    <h4 class="text-center">Settings <small>{{user.name}}</small></h4>
    <q-field>
      <q-select v-model="project" @input="setToolbar" float-label="Toolbar project" inverted color="secondary" :options="projectOptions" label="label" track-by="value"/>
    </q-field>
    <q-field v-if="project">
      <q-select v-model="icon" @input="setIcon" float-label="Project icon" inverted color="secondary" :options="iconOptions" label="label" track-by="value"/>
    </q-field>
    <div class="q-my-lg caption text-center">When tasks are completed:
      <q-btn-toggle @input="setDeletes" class="q-mt-md" v-model="deletes" toggle-color="secondary" :options="[{label: 'Delete them', value: true}, {label: 'Leave them', value: false}]"></q-btn-toggle>
    </div>
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
      deletes: '',
      icon: '',
      projectOptions: [],
      iconOptions: []
    }
  },
  methods: {
    setToolbar () {
      localStorage.setItem('Tick_Toolbar', this.project)
      this.$store.commit('setToolbar', localStorage.getItem('Tick_Toolbar'))
    },
    setIcon () {
      localStorage.setItem('Tick_Icon', this.icon)
      this.$store.commit('setIcon', localStorage.getItem('Tick_Toolbar'))
    },
    setDeletes () {
      localStorage.setItem('Tick_Deletes', this.deletes)
      this.$store.commit('setDeletes', localStorage.getItem('Tick_Deletes'))
    }
  },
  mounted () {
    this.user = this.$store.state.user
    if (this.$store.state.deletes === 'true') {
      this.deletes = true
    } else {
      this.deletes = false
    }
    this.$axios.get(this.$store.state.hostname + '/myprojects/' + this.user.id)
      .then(response => {
        for (var pkey in response.data.activeprojects) {
          var newitem = {
            label: response.data.activeprojects[pkey].project,
            value: response.data.activeprojects[pkey].id
          }
          this.projectOptions.push(newitem)
          if (this.$store.state.toolbar) {
            this.project = Number(this.$store.state.toolbar)
          }
          this.iconOptions = [
            { label: 'Alarm', icon: 'alarm', value: 'alarm' },
            { label: 'Book', icon: 'book', value: 'book' },
            { label: 'Heart', icon: 'favorite', value: 'favorite' },
            { label: 'PC', icon: 'laptop', value: 'laptop' },
            { label: 'People', icon: 'supervised_user_circle', value: 'supervised_user_circle' },
            { label: 'Phone', icon: 'phone_android', value: 'phone_android' },
            { label: 'Shopping cart', icon: 'shopping_cart', value: 'shopping_cart' },
            { label: 'Spanner', icon: 'build', value: 'build' }
          ]
          if (this.$store.state.icon) {
            this.icon = this.$store.state.icon
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
