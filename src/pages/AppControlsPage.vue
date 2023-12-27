<template>
	<div class="fixed-full">
		<q-btn
			class="full-width drag rotate q-mt-sm"
			icon="drag_indicator"
			size="sm"
			color="grey"
			flat
		></q-btn>
		<q-btn
			title="Close"
			class="full-width"
			icon="power_settings_new"
			size="sm"
			color="red"
			flat
			@click="close()"
		></q-btn>

		<q-btn
			title="Always on Top"
			class="full-width"
			icon="push_pin"
			size="sm"
			:color="isAlwaysOnTop ? 'blue' : ''"
			flat
			@click="alwaysOnTop()"
		></q-btn>
		<q-btn
			title="Open DevTools"
			class="full-width"
			icon="construction"
			size="sm"
			flat
			@click="openDevTools()"
		></q-btn>
		<q-btn
			title="Toggle Resizable"
			class="full-width"
			icon="swap_horiz"
			size="sm"
			:color="isResizable ? 'blue' : ''"
			flat
			@click="toggleResizable()"
		></q-btn>
		<q-btn
			title="Toggle Rotation"
			class="full-width"
			icon="screen_rotation"
			size="sm"
			flat
			:color="isRotated ? 'blue' : ''"
			@click="toggleRotation()"
		></q-btn>

		<div class="q-px-sm">
			<q-separator></q-separator>
		</div>

		<q-btn
			title="Zoom +"
			class="full-width"
			icon="zoom_in"
			size="sm"
			flat
			@click="zoomIn()"
		></q-btn>
		<q-btn
			title="Zoom -"
			class="full-width"
			icon="zoom_out"
			size="sm"
			flat
			@click="zoomOut()"
		></q-btn>
		<q-btn
			title="Snapshot"
			class="full-width"
			icon="photo_camera"
			size="sm"
			flat
			@click="takeSnapshot()"
		></q-btn>

		<div class="q-px-sm">
			<q-separator></q-separator>
		</div>

		<q-btn
			title="Reload"
			class="full-width"
			icon="refresh"
			size="sm"
			flat
			@click="reload()"
		></q-btn>
		<q-btn
			title="Back"
			class="full-width"
			icon="arrow_back"
			size="sm"
			flat
			@click="back()"
		></q-btn>
		<q-btn
			title="Forward"
			class="full-width"
			icon="arrow_forward"
			size="sm"
			flat
			@click="forward()"
		></q-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'AppControlsPage',
	setup() {
		return {
			isOpenedDevtools: ref(false),
			isAlwaysOnTop: ref(false),
			isResizable: ref(false),
			isRotated: ref(false),
		};
	},

	mounted() {
		const { id } = this.$route.query;
		this.windowId = id;

		window.electron.onSettings(
			'response-settings',
			(event: string, data: any) => {
				console.log(data);
			}
		);
	},

	data() {
		return {
			windowId: ref(),
		};
	},

	methods: {
		close() {
			window.electron.windowClose(this.windowId);
		},

		alwaysOnTop() {
			this.isAlwaysOnTop = !this.isAlwaysOnTop;
			window.electron.windowActions(this.windowId, {
				name: 'always-top',
				value: this.isAlwaysOnTop,
			});
		},

		reload() {
			window.electron.windowActions(this.windowId, {
				name: 'reload',
				value: true,
			});
		},

		back() {
			window.electron.windowActions(this.windowId, {
				name: 'back',
				value: true,
			});
		},

		forward() {
			window.electron.windowActions(this.windowId, {
				name: 'forward',
				value: true,
			});
		},

		openDevTools() {
			this.isOpenedDevtools = !this.isOpenedDevtools;
			window.electron.windowActions(this.windowId, {
				name: 'dev-tools',
				value: this.isOpenedDevtools,
			});
		},

		toggleResizable() {
			this.isResizable = !this.isResizable;
			window.electron.windowActions(this.windowId, {
				name: 'is-resizable',
				value: this.isResizable,
			});
		},

		toggleRotation() {
			this.isRotated = !this.isRotated;
			window.electron.windowActions(this.windowId, {
				name: 'rotate',
				value: true,
			});
		},

		zoomIn() {
			window.electron.windowActions(this.windowId, {
				name: 'zoom-in',
				value: 0.25,
			});
		},

		zoomOut() {
			window.electron.windowActions(this.windowId, {
				name: 'zoom-out',
				value: 0.25,
			});
		},

		takeSnapshot() {
			window.electron.windowActions(this.windowId, {
				name: 'snapshot',
				value: true,
			});
		},
	},
});
</script>

<style scoped>
.rotate {
	transform: rotate(90deg);
}
</style>
