const ZOOM_LIST = [
  {
    id: 'c121c458-4dd2-4f89-9f79-40155e369b95',
    name: '175%',
    scale: 1.75,
  },
  {
    id: 'bdaeab11-09a5-4fae-b695-3564f33c0872',
    name: '150%',
    scale: 1.5,
  },
  {
    id: 'aa227611-7eba-4389-8d61-62c4c109ea41',
    name: '125%',
    scale: 1.25,
  },
  {
    id: '7e10cd93-f814-45e7-a033-02f774447ed6',
    name: '100%',
    scale: 1,
  },
  {
    id: '18f948f4-0d46-4202-bf27-43f2fc70cf41',
    name: '75%',
    scale: 0.75,
  },
  {
    id: '38795907-a9a9-4826-af89-6f62bedb166c',
    name: '50%',
    scale: 0.5,
  },
  {
    id: '0b665307-f77d-4192-a508-fff358a627d1',
    name: '25%',
    scale: 0.25,
  },
];

export default class Zoom {
  list(): iZoom[] {
    return ZOOM_LIST;
  }

  getByName(name: string): iZoom {
    return ZOOM_LIST.filter((deviceList: any) => deviceList.name == name)[0];
  }

  getById(id: string): iZoom {
    return ZOOM_LIST.filter((deviceList: any) => deviceList.id == id)[0];
  }
}

interface iZoom {
  id: string;
  name: string;
  scale: any;
}
