<template>
  <div class="fixed-full justify-centera items-centera">
    <div class="q-pa-md">
      <div class="row justify-between items-center">
        <div class="col-auto">Dark Mode</div>
        <div class="col-auto">
          <q-toggle v-model="darkMode" @click="toggleDarkMode()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    window.electron.settingsActions({
      name: 'settings',
      value: true,
    });

    return {
      darkMode: ref(false),
    };
  },

  data() {
    return {};
  },

  methods: {
    toggleDarkMode() {
      window.electron.settingsActions({
        name: 'toggle-darkmode',
        value: this.darkMode,
      });
    },
  },
});
</script>

<style scoped></style>
