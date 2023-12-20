<template>
  <q-page>
    <q-header elevated class="bg-header">
      <q-toolbar>
        <q-tabs v-model="tab" no-caps inline-label>
          <q-tab name="runner" icon="play_arrow" label="Runners" />
          <q-tab name="device" icon="devices" label="Devices" />
        </q-tabs>

        <q-space></q-space>

        <!--q-btn
          icon="contrast"
          flat
          size="sm"
          padding="md"
          @click="toggleDarkMode()"
        ></q-btn-->
        <q-btn
          icon="settings"
          flat
          size="sm"
          padding="md"
          @click="openSettings()"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="runner" class="bg-transparent">
        <div v-for="(objWindow, index) in appList" :key="index">
          <div class="row q-pa-sm q-gutter-x-md items-centera justify-around">
            <div class="col-auto">
              <q-btn
                @click="
                  checkIsRunning(objWindow.id)
                    ? stopWindow(objWindow)
                    : startWindow(objWindow)
                "
                :color="checkIsRunning(objWindow.id) ? 'red-8' : 'green-8'"
                :icon="checkIsRunning(objWindow.id) ? 'stop' : 'play_arrow'"
                :disable="objWindow.url?.length < 11"
                :outline="!checkIsRunning(objWindow.id)"
                padding="sm sm"
              >
                <q-tooltip>{{
                  checkIsRunning(objWindow.id) ? 'Stop' : 'Run'
                }}</q-tooltip>
              </q-btn>
            </div>
            <div class="col-4">
              <q-input
                standout="bg-blue text-white"
                dense
                v-model="objWindow.url"
                @update:model-value="(val) => handleUrlChange(index, val)"
                placeholder="https://"
                clearable
              />
            </div>
            <div class="col-3">
              <q-select
                standout="bg-blue text-white"
                dense
                v-model="selectedDevice[index]"
                @update:model-value="(val) => handleDeviceChange(index, val)"
                :options="deviceList"
                option-label="name"
              />
            </div>
            <div class="col-2 row">
              <div class="col-5">
                <q-input
                  standout="bg-blue text-white"
                  dense
                  type="number"
                  maxlength="4"
                  v-model="objWindow.width"
                  @update:model-value="
                    (val) => handleSizeWidthChange(index, val)
                  "
                  :disable="!objWindow.isCustom"
                />
              </div>
              <div class="col-2 text-center q-pt-sm text-grey">x</div>
              <div class="col-5">
                <q-input
                  standout="bg-blue text-white"
                  dense
                  type="number"
                  maxlength="4"
                  v-model="objWindow.height"
                  @update:model-value="
                    (val) => handleSizeHeightChange(index, val)
                  "
                  :disable="!objWindow.isCustom"
                />
              </div>
            </div>
            <!--div class="col-1">
              <q-select
                standout="bg-blue text-white"
                dense
                label="Zoom"
                v-model="selectedZoom[index]"
                @update:model-value="(val) => handleZoomChange(index, val)"
                :options="zoomList"
                :option-label="(size) => size.name"
                :option-value="(size) => size"
              />
            </div-->
            <div class="col-auto q-gutter-sm">
              <q-btn color="grey-7" icon="more_vert" flat padding="sm">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section @click="cloneData(objWindow)"
                        >Clone</q-item-section
                      >
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      :disable="!checkIsRunning(objWindow.id)"
                    >
                      <q-item-section @click="focusWindow(objWindow)"
                        >Focus</q-item-section
                      >
                    </q-item>
                    <q-item clickable v-close-popup class="text-red-9">
                      <q-item-section @click="removeApp(index)"
                        >Remove</q-item-section
                      >
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>

          <div class="q-mx-sm">
            <q-separator color="grey-3"></q-separator>
          </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="blue" @click="addNewWindow()" />
          <q-tooltip anchor="top middle">Runner</q-tooltip>
        </q-page-sticky>
      </q-tab-panel>

      <q-tab-panel name="device">
        <div class="col-12" v-for="(device, index) in deviceList" :key="index">
          <div
            class="row q-pa-sm q-gutter-x-md items-center justify-center"
            v-if="device.id != 'c9f305b6-a844-4a8a-9da3-870df6413b92'"
          >
            <div class="6">
              <q-input
                standout="bg-blue text-white"
                dense
                label="Name"
                v-model="device.name"
              />
            </div>
            <div class="col-2 row">
              <div class="col-5">
                <q-input
                  standout="bg-blue text-white"
                  dense
                  label="Width"
                  type="number"
                  maxlength="4"
                  v-model="device.size.width"
                />
              </div>
              <div class="col-2 text-center q-pt-sm text-grey">x</div>
              <div class="col-5">
                <q-input
                  standout="bg-blue text-white"
                  dense
                  label="Height"
                  type="number"
                  maxlength="4"
                  v-model="device.size.height"
                />
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                flat
                color="grey-8"
                :icon="device.isVisible ? 'visibility' : 'visibility_off'"
                @click="toggleDeviceVisibility(device)"
              ></q-btn>
              <q-btn
                v-if="device.canRemove"
                flat
                color="red-8"
                icon="delete"
                @click="removeDevice(index)"
              ></q-btn>
            </div>
          </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="blue" @click="addNewDevice()" />
          <q-tooltip anchor="top middle">Device</q-tooltip>
        </q-page-sticky>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import StoreService from '../services/store';
import DevicesService from '../services/devices';
import ZoomService from '../services/zoom';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = new StoreService();
    const devicesService = new DevicesService();
    const zoomService = new ZoomService();

    let selectedDevice: any = ref([]);
    let selectedZoom: any = ref([]);
    let appList: any = ref([]);
    let runningList: any = ref([]);

    return {
      tab: ref('runner'),
      selectedDevice,
      selectedZoom,
      appList,
      runningList,
      zoomList: ref(zoomService.list()),
      deviceList: ref(devicesService.list()),
      store,
      devicesService,
      zoomService,
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

    /*setInterval(() => {
      this.getRunningList();
    }, 900);*/

    const list: any = this.store.get('list');

    if (list != null) {
      this.appList = list;
      list.forEach((element: any, index: number) => {
        this.selectedDevice[index] = this.devicesService.getById(
          element.device
        );
        //this.selectedZoom[index] = this.zoomService.getById(element.zoom);
      });
    }
  },

  methods: {
    addNewWindow() {
      this.appList.push({
        id: uuidv4(),
        url: '',
        device: 'c9f305b6-a844-4a8a-9da3-870df6413b92',
        zoom: '7e10cd93-f814-45e7-a033-02f774447ed6',
        isCustom: true,
        width: 390,
        height: 844,
      });

      this.selectedDevice[this.appList.length - 1] =
        this.devicesService.getById('c9f305b6-a844-4a8a-9da3-870df6413b92');

      /*this.selectedZoom[this.appList.length - 1] = this.zoomService.getById(
        '7e10cd93-f814-45e7-a033-02f774447ed6'
      );*/
    },

    addNewDevice() {
      this.deviceList.push({
        id: uuidv4(),
        name: '',
        size: { width: 0, height: 0 },
        isVisible: true,
        canRemove: true,
      });

      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    },

    cloneData(objWindow: ObjWindow) {
      const newVal = Object.assign({}, objWindow);
      newVal.id = uuidv4();
      this.appList.push(newVal);
      this.selectedDevice[this.appList.length - 1] =
        this.devicesService.getById(objWindow.device);
    },

    startWindow(objWindow: ObjWindow) {
      if (!this.checkIsRunning(objWindow.id)) {
        if (typeof objWindow.width === 'string') {
          objWindow.width = parseInt(objWindow.width);
        }
        if (typeof objWindow.height === 'string') {
          objWindow.height = parseInt(objWindow.height);
        }

        this.store.set('list', this.appList);

        window.electron.windowOpen(Object.assign({}, objWindow));

        setTimeout(() => {
          window.electron.windowActions(objWindow.id, {
            name: 'zoom',
            value: this.zoomService.getById(objWindow.zoom).scale,
          });
        }, 500);
      }
    },

    stopWindow(objWindow: ObjWindow) {
      if (this.checkIsRunning(objWindow.id)) {
        window.electron.windowClose(objWindow.id);
      }
    },

    removeApp(index: number) {
      window.electron.windowClose(this.appList[index].id);
      this.appList.splice(index, 1);

      this.store.set('list', this.appList);
    },

    focusWindow(objWindow: ObjWindow) {
      window.electron.windowActions(objWindow.id, {
        name: 'focus',
        value: true,
      });
    },

    handleUrlChange(index: number, data: any) {
      if (data.length > 0) {
        window.electron.windowActions(this.appList[index].id, {
          name: 'update-url',
          value: data,
        });
      }
    },

    handleDeviceChange(index: number, data: any) {
      this.appList[index].device = data.id;
      this.appList[index].isCustom =
        data.id === 'c9f305b6-a844-4a8a-9da3-870df6413b92' ? true : false;
      this.appList[index].width = parseInt(data.size.width);
      this.appList[index].height = parseInt(data.size.height);

      window.electron.windowActions(this.appList[index].id, {
        name: 'update-device',
        value: {
          width: this.appList[index].width,
          height: this.appList[index].height,
        },
      });
    },

    handleZoomChange(index: number, data: any) {
      this.appList[index].zoom = data.id;

      window.electron.windowActions(this.appList[index].id, {
        name: 'zoom',
        value: data.scale,
      });
    },

    handleSizeWidthChange(index: number, data: any) {
      data = parseInt(data);
      if (data > 0) {
        this.appList[index].width = data;
        this.appList[index].isCustom = true;

        window.electron.windowActions(this.appList[index].id, {
          name: 'update-size-width',
          value: data,
        });
      }
    },

    handleSizeHeightChange(index: number, data: any) {
      data = parseInt(data);
      if (data > 0) {
        this.appList[index].height = data;
        this.appList[index].isCustom = true;

        window.electron.windowActions(this.appList[index].id, {
          name: 'update-size-height',
          value: data,
        });
      }
    },

    isVisibleFilter(val: any, update: any) {
      console.log(val);
      console.log(update);
      /*if (val === '') {
        update(() => {
          options.value = deviceList;
        });
        return;
      }*/
      /*update(() => {
        const needle = val.toLowerCase();
        deviceList.value = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });*/
    },

    indexOfRunningApp(id: string) {
      return this.runningList.indexOf(id);
    },

    checkIsRunning(id: string) {
      return this.runningList.includes(id);
    },

    getRunningList() {
      window.electron.runningList();
    },

    toggleDeviceVisibility(device: any) {
      device.isVisible = !device.isVisible;
    },

    removeDevice(index: number) {
      this.deviceList.splice(index, 1);
    },

    /*toggleDarkMode() {
      window.electron.mainWindow('dark-mode:system');
    },*/

    openSettings() {
      window.electron.settingsActions({
        name: 'open',
        value: true,
      });
    },
  },
});

interface ObjWindow {
  id: string;
  url: string;
  device: string;
  zoom: string;
  isCustom: boolean;
  width: number;
  height: number;
}
</script>
