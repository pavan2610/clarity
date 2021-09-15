/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { deepClone } from '@cds/core/internal';

export interface DemoData {
  grid: DemoGrid;
}

export interface DemoGrid {
  label: string;
  rowActions: [{ label: string; value: string }, { label: string; value: string }];
  columns: { label: string; suffix?: string }[];
  rows: { id: string; selected?: boolean; cells: { value: string | number; label?: string }[] }[];
}

export class DemoService {
  static get data(): DemoData {
    const key = localStorage.getItem('cds-data-theme');
    return DemoService.getData((key !== 'undefined' ? key : 'infrastructure') as any);
  }

  static get asyncData(): Promise<DemoData> {
    return new Promise(resolve => setTimeout(() => resolve(DemoService.data), 2000));
  }

  static getData(type: 'system' | 'infrastructure' | 'food') {
    const data: DemoData = deepClone((demoData as any)[type]);
    data.grid.rows.forEach(r =>
      r.cells.forEach((c: any, i) => (c.label = `${c.value}${data.grid.columns[i].suffix ?? ''}`))
    );
    return data;
  }
}

export const system: DemoData = {
  grid: {
    label: 'Core Grid',
    rowActions: [
      { label: 'Action 1', value: 'action-1' },
      { label: 'Action 2', value: 'action-2' },
    ],
    columns: [
      { label: 'Column 1' },
      { label: 'Column 2' },
      { label: 'Column 3' },
      { label: 'Column 4' },
      { label: 'Column 5' },
    ],
    rows: [
      {
        id: '',
        cells: [
          { value: 'Cell 0-1' },
          { value: 'Cell 0-2' },
          { value: 'Cell 0-3' },
          { value: 'Cell 0-4' },
          { value: 'Cell 0-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 1-1' },
          { value: 'Cell 1-2' },
          { value: 'Cell 1-3' },
          { value: 'Cell 1-4' },
          { value: 'Cell 1-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 2-1' },
          { value: 'Cell 2-2' },
          { value: 'Cell 2-3' },
          { value: 'Cell 2-4' },
          { value: 'Cell 2-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 3-1' },
          { value: 'Cell 3-2' },
          { value: 'Cell 3-3' },
          { value: 'Cell 3-4' },
          { value: 'Cell 3-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 4-1' },
          { value: 'Cell 4-2' },
          { value: 'Cell 4-3' },
          { value: 'Cell 4-4' },
          { value: 'Cell 4-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 5-1' },
          { value: 'Cell 5-2' },
          { value: 'Cell 5-3' },
          { value: 'Cell 5-4' },
          { value: 'Cell 5-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 6-1' },
          { value: 'Cell 6-2' },
          { value: 'Cell 6-3' },
          { value: 'Cell 6-4' },
          { value: 'Cell 6-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 7-1' },
          { value: 'Cell 7-2' },
          { value: 'Cell 7-3' },
          { value: 'Cell 7-4' },
          { value: 'Cell 7-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 8-1' },
          { value: 'Cell 8-2' },
          { value: 'Cell 8-3' },
          { value: 'Cell 8-4' },
          { value: 'Cell 8-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 9-1' },
          { value: 'Cell 9-2' },
          { value: 'Cell 9-3' },
          { value: 'Cell 9-4' },
          { value: 'Cell 9-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 10-1' },
          { value: 'Cell 10-2' },
          { value: 'Cell 10-3' },
          { value: 'Cell 4' },
          { value: 'Cell 10-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 11-1' },
          { value: 'Cell 11-2' },
          { value: 'Cell 11-3' },
          { value: 'Cell 11-4' },
          { value: 'Cell 11-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 12-1' },
          { value: 'Cell 12-2' },
          { value: 'Cell 12-3' },
          { value: 'Cell 12-4' },
          { value: 'Cell 12-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 13-1' },
          { value: 'Cell 13-2' },
          { value: 'Cell 13-3' },
          { value: 'Cell 13-4' },
          { value: 'Cell 13-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 14-1' },
          { value: 'Cell 14-2' },
          { value: 'Cell 14-3' },
          { value: 'Cell 14-4' },
          { value: 'Cell 14-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 15-1' },
          { value: 'Cell 15-2' },
          { value: 'Cell 15-3' },
          { value: 'Cell 15-4' },
          { value: 'Cell 15-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 16-1' },
          { value: 'Cell 16-2' },
          { value: 'Cell 16-3' },
          { value: 'Cell 16-4' },
          { value: 'Cell 16-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 17-1' },
          { value: 'Cell 17-2' },
          { value: 'Cell 17-3' },
          { value: 'Cell 17-4' },
          { value: 'Cell 17-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 18-1' },
          { value: 'Cell 18-2' },
          { value: 'Cell 18-3' },
          { value: 'Cell 18-4' },
          { value: 'Cell 18-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 19-1' },
          { value: 'Cell 19-2' },
          { value: 'Cell 19-3' },
          { value: 'Cell 18-4' },
          { value: 'Cell 19-5' },
        ],
      },
      {
        id: '',
        cells: [
          { value: 'Cell 20-1' },
          { value: 'Cell 20-2' },
          { value: 'Cell 20-3' },
          { value: 'Cell 18-4' },
          { value: 'Cell 20-5' },
        ],
      },
    ],
  },
};

export const infrastructure: DemoData = {
  grid: {
    label: 'VM Hosts',
    rowActions: [
      { label: 'Restart', value: 'restart' },
      { label: 'Shutdown', value: 'shutdown' },
    ],
    columns: [
      { label: 'Host' },
      { label: 'Status' },
      { label: 'Region' },
      { label: 'CPU', suffix: '%' },
      { label: 'Memory', suffix: '%' },
    ],
    rows: [
      {
        id: 'vm-host-001',
        cells: [{ value: 'vm-host-001' }, { value: 'online' }, { value: 'US West' }, { value: 5 }, { value: 10 }],
      },
      {
        id: 'vm-host-003',
        cells: [{ value: 'vm-host-003' }, { value: 'online' }, { value: 'US East' }, { value: 10 }, { value: 30 }],
      },
      {
        id: 'vm-host-002',
        cells: [{ value: 'vm-host-002' }, { value: 'online' }, { value: 'Europe' }, { value: 20 }, { value: 30 }],
      },
      {
        id: 'vm-host-011',
        cells: [{ value: 'vm-host-011' }, { value: 'online' }, { value: 'Asia Pacific' }, { value: 5 }, { value: 15 }],
      },
      {
        id: 'vm-host-004',
        cells: [
          { value: 'vm-host-004' },
          { value: 'offline' },
          { value: 'Asia Pacific' },
          { value: 90 },
          { value: 80 },
        ],
      },
      {
        id: 'vm-host-016',
        cells: [{ value: 'vm-host-016' }, { value: 'online' }, { value: 'Europe' }, { value: 5 }, { value: 15 }],
      },
      {
        id: 'vm-host-008',
        cells: [{ value: 'vm-host-008' }, { value: 'disruption' }, { value: 'US West' }, { value: 50 }, { value: 60 }],
      },
      {
        id: 'vm-host-018',
        cells: [{ value: 'vm-host-018' }, { value: 'offline' }, { value: 'US West' }, { value: 0 }, { value: 0 }],
      },
      {
        id: 'vm-host-006',
        cells: [{ value: 'vm-host-006' }, { value: 'deactivated' }, { value: 'Europe' }, { value: 0 }, { value: 0 }],
      },
      {
        id: 'vm-host-005',
        cells: [
          { value: 'vm-host-005' },
          { value: 'offline' },
          { value: 'Asia Pacific' },
          { value: 85 },
          { value: 70 },
        ],
      },
      {
        id: 'vm-host-014',
        cells: [{ value: 'vm-host-014' }, { value: 'disruption' }, { value: 'US East' }, { value: 73 }, { value: 62 }],
      },
      {
        id: 'vm-host-017',
        cells: [{ value: 'vm-host-017' }, { value: 'offline' }, { value: 'Europe' }, { value: 0 }, { value: 0 }],
      },
      {
        id: 'vm-host-007',
        cells: [{ value: 'vm-host-007' }, { value: 'deactivated' }, { value: 'Europe' }, { value: 0 }, { value: 0 }],
      },
      {
        id: 'vm-host-010',
        cells: [{ value: 'vm-host-010' }, { value: 'disruption' }, { value: 'Europe' }, { value: 50 }, { value: 60 }],
      },
      {
        id: 'vm-host-009',
        cells: [
          { value: 'vm-host-009' },
          { value: 'disruption' },
          { value: 'Asia Pacific' },
          { value: 65 },
          { value: 90 },
        ],
      },
      {
        id: 'vm-host-012',
        cells: [
          { value: 'vm-host-012' },
          { value: 'offline' },
          { value: 'Asia Pacific' },
          { value: 85 },
          { value: 75 },
        ],
      },
      {
        id: 'vm-host-020',
        cells: [{ value: 'vm-host-020' }, { value: 'deactivated' }, { value: 'US East' }, { value: 0 }, { value: 0 }],
      },
      {
        id: 'vm-host-013',
        cells: [{ value: 'vm-host-013' }, { value: 'deactivated' }, { value: 'US East' }, { value: 0 }, { value: 0 }],
      },
      {
        id: 'vm-host-015',
        cells: [{ value: 'vm-host-015' }, { value: 'online' }, { value: 'US West' }, { value: 15 }, { value: 20 }],
      },
      {
        id: 'vm-host-019',
        cells: [{ value: 'vm-host-019' }, { value: 'online' }, { value: 'Asia Pacific' }, { value: 35 }, { value: 30 }],
      },
    ],
  },
};

export const food: DemoData = {
  grid: {
    label: 'Menu Options',
    rowActions: [
      { label: 'Order', value: 'order' },
      { label: 'Prepare', value: 'prepare' },
    ],
    columns: [
      { label: 'Type' },
      { label: 'Origin' },
      { label: 'Primary' },
      { label: 'Calories', suffix: 'c' },
      { label: 'Rating' },
    ],
    rows: [
      {
        id: 'Bakmi',
        cells: [{ value: 'Bakmi' }, { value: 'Indonesia' }, { value: 'Wheat' }, { value: 360 }, { value: 8 }],
      },
      {
        id: 'Chūka men',
        cells: [{ value: 'Chūka men' }, { value: 'Japan' }, { value: 'Wheat' }, { value: 369 }, { value: 9 }],
      },
      {
        id: 'Kesme',
        cells: [{ value: 'Kesme' }, { value: 'Central Asia' }, { value: 'Wheat' }, { value: 180 }, { value: 7 }],
      },
      {
        id: 'Kalguksu',
        cells: [{ value: 'Kalguksu' }, { value: 'Korea' }, { value: 'Wheat' }, { value: 395 }, { value: 7 }],
      },
      {
        id: 'Lamian',
        cells: [{ value: 'Lamian' }, { value: 'China' }, { value: 'Wheat' }, { value: 350 }, { value: 9 }],
      },
      {
        id: 'Mee pok',
        cells: [{ value: 'Mee pok' }, { value: 'Southeast Asia' }, { value: 'Wheat' }, { value: 383 }, { value: 8 }],
      },
      {
        id: 'Pasta',
        cells: [{ value: 'Pasta' }, { value: 'Italy' }, { value: 'Wheat' }, { value: 212 }, { value: 9 }],
      },
      {
        id: 'Reshte',
        cells: [{ value: 'Reshte' }, { value: 'Central Asia' }, { value: 'Wheat' }, { value: 389 }, { value: 8 }],
      },
      {
        id: 'Sōmen',
        cells: [{ value: 'Sōmen' }, { value: 'Japan' }, { value: 'Wheat' }, { value: 203 }, { value: 8 }],
      },
      {
        id: 'Thukpa',
        cells: [{ value: 'Thukpa' }, { value: 'Tibet' }, { value: 'Wheat' }, { value: 439 }, { value: 9 }],
      },
      { id: 'Udon', cells: [{ value: 'Udon' }, { value: 'Japan' }, { value: 'Wheat' }, { value: 190 }, { value: 8 }] },
      {
        id: 'Kishimen',
        cells: [{ value: 'Kishimen' }, { value: 'Japan' }, { value: 'Wheat' }, { value: 190 }, { value: 7 }],
      },
      {
        id: 'Bánh phở',
        cells: [{ value: 'Bánh phở' }, { value: 'Vietnam' }, { value: 'Rice' }, { value: 141 }, { value: 7 }],
      },
      {
        id: 'Hé fěn',
        cells: [{ value: 'Hé fěn' }, { value: 'South Asia' }, { value: 'Rice' }, { value: 110 }, { value: 8 }],
      },
      {
        id: 'Bee hoon',
        cells: [{ value: 'Bee hoon' }, { value: 'Indonesia' }, { value: 'Rice' }, { value: 294 }, { value: 9 }],
      },
      { id: 'Sevai', cells: [{ value: 'Sevai' }, { value: 'India' }, { value: 'Rice' }, { value: 221 }, { value: 8 }] },
      {
        id: 'Idiyappam',
        cells: [{ value: 'Idiyappam' }, { value: 'India' }, { value: 'Rice' }, { value: 130 }, { value: 6 }],
      },
      {
        id: 'Mixian',
        cells: [{ value: 'Mixian' }, { value: 'China' }, { value: 'Rice' }, { value: 117 }, { value: 7 }],
      },
      {
        id: 'Khanom chin',
        cells: [{ value: 'Khanom chin' }, { value: 'Thailand' }, { value: 'Rice' }, { value: 220 }, { value: 8 }],
      },
      { id: 'Makguksu', cells: [{ value: 'Makguksu' }, { value: 'Korea' }, { value: 'Buckwheat' }, { value: 198 }] },
      {
        id: 'Naengmyeon',
        cells: [{ value: 'Naengmyeon' }, { value: 'Korea' }, { value: 'Buckwheat' }, { value: 500 }, { value: 9 }],
      },
      {
        id: 'Soba',
        cells: [{ value: 'Soba' }, { value: 'Japan' }, { value: 'Buckwheat' }, { value: 113 }, { value: 7 }],
      },
      {
        id: 'Pizzoccheri',
        cells: [{ value: 'Pizzoccheri' }, { value: 'Italy' }, { value: 'Buckwheat' }, { value: 342 }, { value: 8 }],
      },
      { id: 'Youmian', cells: [{ value: 'Youmian' }, { value: 'China' }, { value: 'Egg' }, { value: 475 }] },
      {
        id: 'Lochshen',
        cells: [{ value: 'Lochshen' }, { value: 'Eastern Europe' }, { value: 'Egg' }, { value: 330 }, { value: 8 }],
      },
      { id: 'Kesme', cells: [{ value: 'Kesme' }, { value: 'Turkey' }, { value: 'Egg' }, { value: 172 }, { value: 9 }] },
      {
        id: 'Spätzle',
        cells: [{ value: 'Spätzle' }, { value: 'Germany' }, { value: 'Egg' }, { value: 206 }, { value: 8 }],
      },
      {
        id: 'Acorn',
        cells: [{ value: 'Acorn' }, { value: 'Korea' }, { value: 'Acorn' }, { value: 390 }, { value: 9 }],
      },
      {
        id: 'Olchaeng-i guksu',
        cells: [{ value: 'Olchaeng-i guksu' }, { value: 'Korea' }, { value: 'Corn' }, { value: 475 }, { value: 7 }],
      },
      {
        id: 'Cellophane',
        cells: [{ value: 'Cellophane' }, { value: 'China' }, { value: 'Mung bean' }, { value: 161 }, { value: 7 }],
      },
      {
        id: 'Chilk naengmyeon',
        cells: [
          { value: 'Chilk naengmyeon' },
          { value: 'Japan' },
          { value: 'Kudzu root' },
          { value: 542 },
          { value: 6 },
        ],
      },
      {
        id: 'Shirataki',
        cells: [{ value: 'Shirataki' }, { value: 'Japan' }, { value: 'Konjac' }, { value: 20 }, { value: 7 }],
      },
      { id: 'Kelp', cells: [{ value: 'Kelp' }, { value: 'Japan' }, { value: 'Seaweed' }, { value: 6 }, { value: 8 }] },
      {
        id: 'Spaghetti',
        cells: [{ value: 'Spaghetti' }, { value: 'Italy' }, { value: 'Wheat' }, { value: 212 }, { value: 7 }],
      },
      {
        id: 'Linguine',
        cells: [{ value: 'Linguine' }, { value: 'Italy' }, { value: 'Wheat' }, { value: 212 }, { value: 7 }],
      },
      {
        id: 'Fettucini',
        cells: [{ value: 'Fettucini' }, { value: 'Italy' }, { value: 'Wheat' }, { value: 212 }, { value: 6 }],
      },
      {
        id: 'Lasagne',
        cells: [{ value: 'Lasagne' }, { value: 'Italy' }, { value: 'Wheat' }, { value: 212 }, { value: 7 }],
      },
      {
        id: 'Farfalle',
        cells: [{ value: 'Farfalle' }, { value: 'Italy' }, { value: 'Wheat' }, { value: 212 }, { value: 8 }],
      },
    ],
  },
};

const demoData = {
  system,
  infrastructure,
  food,
};
