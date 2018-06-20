<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;">Tick</router-link>
          <div slot="subtitle">tasks and projects</div>
        </q-toolbar-title>
        <q-btn flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
          <q-icon name="person" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list no-border link inset-delimiter>
        <q-item to="/settings">
          <q-item-side icon="person_outline" />
          <q-item-main label="Settings" sublabel="user and app settings" />
        </q-item>
        <q-item to="/someday">
          <q-item-side icon="folder" />
          <q-item-main label="Some day" sublabel="inactive projects" />
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <q-toolbar color="tertiary">
        <q-item class="col text-center bottomitem" to="/tasks">
          <q-item-side icon="check_box" color="white"/>
        </q-item>
        <q-item class="col text-center bottomitem" to="/allprojects">
          <q-item-side icon="list" color="white"/>
        </q-item>
        <q-item class="col text-center bottomitem" v-if="toolbar" :to="toolbar">
          <q-item-side :icon="icon" color="white"/>
        </q-item>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    toolbar () {
      if ((this.$store.state.toolbar) || (localStorage.getItem('Tick_Toolbar'))) {
        if (this.$store.state.toolbar) {
          return '/projects/' + this.$store.state.toolbar
        } else {
          return '/projects/' + localStorage.getItem('Tick_Toolbar')
        }
      } else {
        return false
      }
    },
    icon () {
      if ((this.$store.state.icon) || (localStorage.getItem('Tick_Icon'))) {
        if (this.$store.state.icon) {
          return this.$store.state.icon
        } else {
          return localStorage.getItem('Tick_Icon')
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style>
div.col.text-center.bottomitem {
  display:block;
}
</style>
