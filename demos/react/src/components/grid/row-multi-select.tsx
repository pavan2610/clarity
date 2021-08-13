import { useState } from 'react';

import { CdsGrid, CdsGridColumn, CdsGridRow, CdsGridCell, CdsGridFooter } from '@cds/react/grid';
import { CdsCheckbox } from '@cds/react/checkbox';

import { getVMData, TestVM } from '@cds/core/demo';

function RowMultiSelect() {
  const [selectedItems, selected] = useState<TestVM[]>([]);

  const data = getVMData();

  const handleSelectedChange = (checked: boolean, item: TestVM) => {
    if (checked) {
      selected(() => [...selectedItems, item]);
    } else {
      const pos = selectedItems.findIndex(i => i.id === item.id);

      if (pos > -1) {
        selectedItems.splice(pos, 1);
        selected(() => [...selectedItems]);
      }
    }
  };

  return (
    <div className="demo-content">
      <h2>Basic</h2>
      <div className="content">
        <CdsGrid aria-multiselectable="true">
          <CdsGridColumn type="action">
            <CdsCheckbox>
              <input type="checkbox" aria-label="select all hosts" />
            </CdsCheckbox>
          </CdsGridColumn>
          <CdsGridColumn>Host</CdsGridColumn>
          <CdsGridColumn>Status</CdsGridColumn>
          <CdsGridColumn>CPU</CdsGridColumn>
          <CdsGridColumn>Memory</CdsGridColumn>

          {data.map((item: any) => (
            <CdsGridRow key={item.id}>
              <CdsGridCell type="action">
                <CdsCheckbox>
                  <input
                    type="checkbox"
                    aria-label="select host vm-host-001"
                    onChange={event => handleSelectedChange(event.target.checked, item)}
                  />
                </CdsCheckbox>
              </CdsGridCell>
              <CdsGridCell>{item.id}</CdsGridCell>
              <CdsGridCell>{item.status}</CdsGridCell>
              <CdsGridCell>{item.cpu}</CdsGridCell>
              <CdsGridCell>{item.memory}</CdsGridCell>
            </CdsGridRow>
          ))}

          <CdsGridFooter>{selectedItems.length}</CdsGridFooter>
        </CdsGrid>
      </div>
    </div>
  );
}

export default RowMultiSelect;
