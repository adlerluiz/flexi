<template>
	<div class="fixed-full column justify-between no-select">
		<div class="q-pa-md">
			<div class="row justify-between items-center">
				<div class="col-auto">Dark Mode</div>
				<div class="col-auto">
					<q-toggle v-model="darkMode" @click="toggleDarkMode()" />
				</div>
			</div>
			<!--div class="row justify-between items-center">
				<div class="col-auto">Another item</div>
				<div class="col-auto">
					<q-toggle v-model="darkMode" @click="anotherFunction()" />
				</div>
			</div-->
		</div>

		<div class="q-pa-md text-center text-grey text-caption">
			v{{ version }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { version } from '../../package.json';

export default defineComponent({
	name: 'SettingsPage',
	setup() {
		window.electron.settingsActions({
			name: 'settings',
			value: true,
		});

		window.electron.settingsActions({
			name: 'get-settings',
			value: true,
		});

		return {
			darkMode: ref(false),
			version,
		};
	},

	data() {
		return {};
	},

	mounted() {
		window.electron.onSettings(
			'response-settings',
			(event: string, data: any) => {
				this.darkMode = data.THEME == 'dark';
			}
		);
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
