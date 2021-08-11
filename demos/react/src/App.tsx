import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';

import { CdsNavigation, CdsNavigationItem } from '@cds/react/navigation';
import { CdsAlert, CdsAlertGroup } from '@cds/react/alert';
import { CdsDivider } from '@cds/react/divider';

import Basic from './components/grid/basic';
import RowMultiSelect from './components/grid/row-multi-select';
import RowSingleSelect from './components/grid/row-single-select';

function App() {
  return (
    <main>
      <CdsAlertGroup type="banner" status="warning">
        <CdsAlert>
          This component or utility is offered as a preview. This means we are currently working on it and seeking
          feedback. Please be aware that this component or utility may have breaking changes before we finish working on
          it.
        </CdsAlert>
      </CdsAlertGroup>
      <header className="demo-header" cds-layout="horizontal gap:md align:vertical-center p:md" cds-text="body">
        <img src={logo} alt="logo" />
        <span>Core React Demos</span>
      </header>

      <Router>
        <div className="router-container">
          <CdsNavigation expanded>
            <CdsNavigationItem>
              <Link to="/">Basic</Link>
            </CdsNavigationItem>
            <CdsNavigationItem>
              <Link to="/row-single-select">Row Single Select</Link>
            </CdsNavigationItem>
            <CdsNavigationItem>
              <Link to="/row-multi-select">Row Multi Select</Link>
            </CdsNavigationItem>
          </CdsNavigation>
          <CdsDivider orientation="vertical"></CdsDivider>
          <div cds-layout="align:stretch p-x:md" cds-text="body">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/row-single-select">
                <RowSingleSelect />
              </Route>
              <Route path="/row-multi-select">
                <RowMultiSelect />
              </Route>
              <Route path="/">
                <Basic />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </main>
  );
}

export default App;
