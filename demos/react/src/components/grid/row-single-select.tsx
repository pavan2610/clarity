import { CdsGrid, CdsGridColumn, CdsGridRow, CdsGridCell, CdsGridFooter } from '@cds/react/grid';
import { CdsRadio } from '@cds/react/radio';
import { getVMData } from '@cds/core/demo';

function RowSingleSelect() {
  const data = getVMData();

  return (
    <div className="demo-content">
      <h2>Basic</h2>
      <div className="content">
        <CdsGrid>
          <CdsGridColumn type="action" aria-label="select column"></CdsGridColumn>
          <CdsGridColumn>Host</CdsGridColumn>
          <CdsGridColumn>Status</CdsGridColumn>
          <CdsGridColumn>CPU</CdsGridColumn>
          <CdsGridColumn>Memory</CdsGridColumn>

          {data.map((item: any) => (
            <CdsGridRow key={item.id}>
              <CdsGridCell type="action">
                <CdsRadio>
                  <input type="radio" name="hosts" aria-label="select host vm-host-001" />
                </CdsRadio>
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

export default RowSingleSelect;
