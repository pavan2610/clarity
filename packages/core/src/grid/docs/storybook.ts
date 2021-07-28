export interface TestVM {
  id: string;
  status: VMStatus;
  cpu: number;
  memory: number;
  selected: boolean;
  about: string;
}

export type VMStatus = 'online' | 'disruption' | 'offline' | 'deactivated';

export enum StatusDisplayType {
  online = 'success',
  disruption = 'warning',
  offline = 'danger',
  deactivated = 'neutral',
}

export enum StatusIconType {
  online = 'check-circle',
  disruption = 'exclamation-triangle',
  offline = 'exclamation-circle',
  deactivated = 'disconnect',
}

export function getVMData(): TestVM[] {
  return [
    { id: 'vm-host-001', status: 'online', cpu: 5, memory: 10, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'vm-host-003', status: 'online', cpu: 10, memory: 30, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'vm-host-002', status: 'online', cpu: 20, memory: 30, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'vm-host-011', status: 'online', cpu: 5, memory: 15, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'vm-host-004', status: 'offline', cpu: 90, memory: 80, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'vm-host-016', status: 'online', cpu: 5, memory: 15, selected: false, about: 'Lorem ipsum dolor sit amet' },
    {
      id: 'vm-host-008',
      status: 'disruption',
      cpu: 50,
      memory: 60,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    { id: 'vm-host-018', status: 'offline', cpu: 0, memory: 0, selected: false, about: 'Lorem ipsum dolor sit amet' },
    {
      id: 'vm-host-006',
      status: 'deactivated',
      cpu: 0,
      memory: 0,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    { id: 'vm-host-005', status: 'offline', cpu: 85, memory: 70, selected: false, about: 'Lorem ipsum dolor sit amet' },
    {
      id: 'vm-host-014',
      status: 'disruption',
      cpu: 73,
      memory: 62,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    { id: 'vm-host-017', status: 'offline', cpu: 0, memory: 0, selected: false, about: 'Lorem ipsum dolor sit amet' },
    {
      id: 'vm-host-007',
      status: 'deactivated',
      cpu: 0,
      memory: 0,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 'vm-host-010',
      status: 'disruption',
      cpu: 50,
      memory: 60,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 'vm-host-009',
      status: 'disruption',
      cpu: 65,
      memory: 90,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    { id: 'vm-host-012', status: 'offline', cpu: 85, memory: 70, selected: false, about: 'Lorem ipsum dolor sit amet' },
    {
      id: 'vm-host-020',
      status: 'deactivated',
      cpu: 0,
      memory: 0,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 'vm-host-013',
      status: 'deactivated',
      cpu: 0,
      memory: 0,
      selected: false,
      about: 'Lorem ipsum dolor sit amet',
    },
    { id: 'vm-host-015', status: 'online', cpu: 15, memory: 20, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'vm-host-019', status: 'online', cpu: 34, memory: 28, selected: false, about: 'Lorem ipsum dolor sit amet' },
  ];
}

export function getVMOrderPreference() {
  return getVMData().map(vm => vm.id);
}

export function filter<T>(list: T[], key: string, term: string) {
  return [...list].filter(i => (i as any)[key].toLocaleLowerCase().includes(term.toLocaleLowerCase()));
}

export function sortStrings<T>(list: T[], key: string, sortType: 'none' | 'ascending' | 'descending') {
  if (sortType === 'ascending') {
    return list.sort((a: any, b: any) => a[key].localeCompare(b[key]));
  }

  if (sortType === 'descending') {
    return list.sort((a: any, b: any) => a[key].localeCompare(b[key])).reverse();
  }

  return list;
}

export function sortNumbers(list: any[], key: string, sortType: 'none' | 'ascending' | 'descending') {
  if (sortType === 'ascending') {
    return list.sort((a, b) => a[key] - b[key]);
  }

  if (sortType === 'descending') {
    return list.sort((a, b) => b[key] - a[key]);
  }

  return list;
}

export function swapBetweenLists<T>(
  targetList: (T & { id: string })[],
  fromList: (T & { id: string })[],
  detail: { from: { id: string }; target: { id: string } }
) {
  const item = fromList.splice(fromList.indexOf(fromList.find(i => i.id === detail.from.id)), 1)[0];
  const targetIndex = targetList.indexOf(targetList.find(i => i.id === detail.target.id));
  targetIndex === -1 ? targetList.push(item) : targetList.splice(targetIndex, 0, item);
  return { targetList: [...targetList], fromList: [...fromList] };
}

export function paginate<T>(arr: T[], size: number) {
  return [...arr].reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);
    return acc;
  }, [] as T[][]);
}

export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setRandomValues(valueList: { value: any }[]) {
  return [
    ...valueList.map(d => {
      d.value = randomNum(0, 999);
      return d;
    }),
  ];
}

export function sortList<T>(target: T & { id: any }, src: T & { id: any }, list: { id: any }[]) {
  const data = [...list];
  const srcIndex = data.findIndex(i => i.id === src.id);
  let targetIndex = data.findIndex(i => i.id === target.id);
  const srcItem = data.splice(srcIndex, 1)[0];
  targetIndex === -1 ? data.push(srcItem) : data.splice(targetIndex, 0, srcItem);
  return data;
}

export function groupArray(arr: any[], size: number) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
}
