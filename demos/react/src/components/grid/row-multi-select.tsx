import { CdsGrid, CdsGridColumn, CdsGridRow, CdsGridCell, CdsGridFooter } from '@cds/react/grid';
import { CdsCheckbox } from '@cds/react/checkbox';
import { getVMData } from '@cds/core/demo';

function RowMultiSelect() {
  const data = getVMData();

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
                  <input type="checkbox" aria-label="select host vm-host-001" />
                </CdsCheckbox>
              </CdsGridCell>
              <CdsGridCell>{item.id}</CdsGridCell>
              <CdsGridCell>{item.status}</CdsGridCell>
              <CdsGridCell>{item.cpu}</CdsGridCell>
              <CdsGridCell>{item.memory}</CdsGridCell>
            </CdsGridRow>
          ))}

          <CdsGridFooter></CdsGridFooter>
        </CdsGrid>
      </div>
    </div>
  );
}

export default RowMultiSelect;
