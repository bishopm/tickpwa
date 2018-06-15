<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;">Tick</router-link>
          <div slot="subtitle">tasks and projects</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <q-toolbar>
        <q-item to="/tasks">
          <q-item-side icon="check_box" color="white"/>
        </q-item>
        <q-item to="/shopping">
          <q-item-side icon="shopping_cart" color="white"/>
        </q-item>
        <q-item to="/projects">
          <q-item-side icon="list" color="white"/>
        </q-item>
        <q-item to="/someday">
          <q-item-side icon="folder" color="white"/>
        </q-item>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {

}
</script>

<style>
</style>
