const DEVICE_LIST = [
  {
    id: 'c9f305b6-a844-4a8a-9da3-870df6413b92',
    name: 'Custom',
    size: { width: 400, height: 800 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '5401c7c9-6150-46ab-92e6-d3522e8dd561',
    name: 'Apple iPhone 14 Pro Max',
    size: { width: 390, height: 844 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'b672a830-11a8-44dd-95db-efbab3de24c9',
    name: 'Apple iPhone 13',
    size: { width: 390, height: 814 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '7d2fdce8-ef0d-4c4b-b7d6-535d25ff7420',
    name: 'Apple iPhone SE',
    size: { width: 375, height: 667 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '8c6fc292-b77f-4ee2-a6fd-c0285983e04b',
    name: 'Apple iPhone 4',
    size: { width: 320, height: 480 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'f2c00384-d092-41ee-81ef-da2ef2e8120f',
    name: 'Apple iPhone 5/SE',
    size: { width: 320, height: 568 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'b8471ee0-ad32-43e3-9cd4-4525fbfceede',
    name: 'Apple iPhone 6/7/8',
    size: { width: 375, height: 667 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '71259de1-07a0-4b88-b435-3416b6dd54cd',
    name: 'Apple iPhone 6/7/8 Plus',
    size: { width: 414, height: 736 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'e4fb8327-be6d-40fd-84ac-66a0cda14c2d',
    name: 'Apple iPhone X',
    size: { width: 375, height: 812 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '40eb820e-d2a0-49d3-bded-10755038123e',
    name: 'Apple iPad',
    size: { width: 768, height: 1024 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '7afa1e91-fea4-425d-9a97-af9fe393b990',
    name: 'Apple iPad Pro',
    size: { width: 1024, height: 1366 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'd0f81791-a5e8-4be4-84aa-60e68b907586',
    name: 'Apple iPad Pro 12.9"',
    size: { width: 768, height: 1024 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '7351819d-c2fa-49f8-b5dd-9fbda8d7752a',
    name: 'Apple iPad mini',
    size: { width: 768, height: 820 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '949d3b88-55db-468a-adab-855bad5c29d4',
    name: 'Samsung Galaxy S22 Ultra',
    size: { width: 388, height: 876 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '7bd56f79-c46a-4538-b9d0-8ea073770f7d',
    name: 'Samsung Galaxy S9+',
    size: { width: 320, height: 658 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'fb774c73-c21d-4a2a-a2a9-e8c6fbebbf67',
    name: 'Samsung Galaxy S8+',
    size: { width: 360, height: 740 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '7487be72-1760-4384-88bb-e5a2bd709747',
    name: 'Samsung Galaxy S8',
    size: { width: 360, height: 740 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '864da035-c05b-4a95-939d-4643d54833e9',
    name: 'Samsung Galaxy S5',
    size: { width: 360, height: 640 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '38dbb8c2-6071-448a-8a77-060521dab666',
    name: 'Samsung Galaxy A53',
    size: { width: 360, height: 720 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '224e4534-7712-473c-b756-cf586a4e7f26',
    name: 'Google Nexus 4',
    size: { width: 384, height: 680 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'b2118879-85b7-4014-9da9-ff0f8169f664',
    name: 'Google Nexus 5',
    size: { width: 360, height: 640 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '6703a5d6-8384-4cc6-acba-a60ef1048ea7',
    name: 'Google Nexus 5X',
    size: { width: 412, height: 732 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'b2fb244a-7606-4ea2-bb4c-1c4db00670cb',
    name: 'Google Nexus 6',
    size: { width: 412, height: 732 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '066439de-bd83-4f6c-9e6c-246c3f2b06de',
    name: 'Google Nexus 6P',
    size: { width: 412, height: 732 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '4423fb32-a982-459f-a099-84a3215988d0',
    name: 'Google Nexus 7',
    size: { width: 600, height: 960 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: 'fc98142e-daed-4e85-96a6-2c35304eb83d',
    name: 'Google Pixel 2',
    size: { width: 411, height: 731 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '9e5c09b3-5ea6-4a90-82e8-5ab093277220',
    name: 'Google Pixel 2 XL',
    size: { width: 411, height: 823 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '06d980dc-5840-4393-913c-8c0479bd8136',
    name: 'Google Pixel 3',
    size: { width: 393, height: 786 },
    isVisible: true,
    canRemove: false,
  },
  {
    id: '64f86be4-615f-4ea1-ad6f-e2a0446fdda9',
    name: 'Google Pixel 4',
    size: { width: 353, height: 745 },
    isVisible: true,
    canRemove: false,
  },
];

export default class Devices {
  list(): iDevice[] {
    return DEVICE_LIST;
  }

  listVisible(): iDevice[] {
    return DEVICE_LIST.filter(
      (deviceList: any) => deviceList.isVisible == true
    );
  }

  getByName(name: string): iDevice {
    return DEVICE_LIST.filter((deviceList: any) => deviceList.name == name)[0];
  }

  getById(id: string): iDevice {
    return DEVICE_LIST.filter((deviceList: any) => deviceList.id == id)[0];
  }
}

interface iDevice {
  id: string;
  name: string;
  size: any;
  isVisible: boolean;
  canRemove: boolean;
}
