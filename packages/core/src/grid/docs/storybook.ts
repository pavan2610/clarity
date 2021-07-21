export const getData = () => {
  (window as any)._sideEffectTest = '';
  const data: any[] = [
    { id: 'TSLA', value: 0, average: 400, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'MSFT', value: 0, average: 500, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'AAPL', value: 0, average: 1000, selected: false, about: '...' },
    { id: 'VMW', value: 0, average: 200, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'AMAN', value: 0, average: 2000, selected: false, about: '...' },
    { id: 'AMD', value: 0, average: 50, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'GOOG', value: 0, average: 2000, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'INTC', value: 0, average: 50, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'DELL', value: 0, average: 100, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'IBM', value: 0, average: 100, selected: false, about: '...' },
    { id: 'TWTR', value: 0, average: 100, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'NDAQ', value: 0, average: 150, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'SDY', value: 0, average: 400, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'DIS', value: 0, average: 200, selected: false, about: '...' },
    { id: 'NVDA', value: 0, average: 600, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'NFLX', value: 0, average: 500, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'SPYG', value: 0, average: 50, selected: false, about: '...' },
    { id: 'VNQ', value: 0, average: 100, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'SPYV', value: 0, average: 50, selected: false, about: 'Lorem ipsum dolor sit amet' },
    { id: 'VYM', value: 0, average: 100, selected: false, about: 'Lorem ipsum dolor sit amet' },
  ];

  return [...data];
};

export interface TestVM {
  id: string;
  status: VMStatus;
  cpu: number;
  memory: number;
  selected: boolean;
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
    { id: 'vm-host-001', status: 'online', cpu: 5, memory: 10, selected: false },
    { id: 'vm-host-003', status: 'online', cpu: 10, memory: 30, selected: false },
    { id: 'vm-host-002', status: 'online', cpu: 20, memory: 30, selected: false },
    { id: 'vm-host-011', status: 'online', cpu: 5, memory: 15, selected: false },
    { id: 'vm-host-004', status: 'offline', cpu: 90, memory: 80, selected: false },
    { id: 'vm-host-008', status: 'disruption', cpu: 50, memory: 60, selected: false },
    { id: 'vm-host-006', status: 'deactivated', cpu: 0, memory: 0, selected: false },
    { id: 'vm-host-005', status: 'offline', cpu: 85, memory: 70, selected: false },
    { id: 'vm-host-007', status: 'deactivated', cpu: 0, memory: 0, selected: false },
    { id: 'vm-host-010', status: 'disruption', cpu: 50, memory: 60, selected: false },
    { id: 'vm-host-009', status: 'disruption', cpu: 65, memory: 90, selected: false },
    { id: 'vm-host-012', status: 'offline', cpu: 85, memory: 70, selected: false },
    { id: 'vm-host-013', status: 'deactivated', cpu: 0, memory: 0, selected: false },
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
