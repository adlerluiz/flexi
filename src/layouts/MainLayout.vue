<template>
	<q-layout view="lHh Lpr lFf" class="no-select">
		<q-page-container class="bg-content">
			<router-view />
		</q-page-container>

		<q-footer class="bg-footer">
			<q-toolbar>
				<div>
					<!--q-icon name="double_arrow" size="sm"></q-icon-->
					<q-icon name="bolt" size="sm"></q-icon>
					{{ runningList.length }}
					<q-tooltip>Running</q-tooltip>
				</div>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

declare global {
	interface Window {
		electron: {
			mainWindow: (params: any) => void;
			settingsActions: (params: any) => void;
			windowOpen: (params: any) => void;
			windowClose: (id: any) => void;
			windowActions: (id: string, params: any) => void;
			runningList: () => void;
			on: (eventName: string, callback: any) => void;
			onSettings: (eventName: string, callback: any) => void;
		};
	}
}

export default defineComponent({
	name: 'MainLayout',

	setup() {
		return {
			runningList: ref([]),
		};
	},

	mounted() {
		window.electron.on(
			'window-is-running-response',
			(event: string, data: any) => {
				if (this.runningList.length != data.length) {
					this.runningList = data;
				}
			}
		);

		setInterval(() => {
			window.electron.runningList();
		}, 900);
	},
});
</script>
