import React, { useState } from 'react';
import {
  AlignLeft,
  BarChart2,
  Book,
  CheckSquare,
  Coffee,
  Grid,
  LogIn,
  Map,
  Sliders,
  Square,
  User,
  UserPlus,
} from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const useSidebar = () => {
  const [show, setShow] = useState(true);

  const Sidebar = () => (
    <nav id="sidebar" className="sidebar js-sidebar">
      <SimpleBar style={{ maxHeight: '100vh' }}>
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="index.html">
            <span className="align-middle">AdminKit</span>
          </a>

          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>

            <li className="sidebar-item active">
              <a className="sidebar-link" href="index.html">
                {' '}
                <i className="align-middle">
                  <Sliders />
                </i>{' '}
                <span className="align-middle">Dashboard</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-profile.html">
                {' '}
                <i className="align-middle">
                  <User />
                </i>{' '}
                <span className="align-middle">Profile</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-sign-in.html">
                {' '}
                <i className="align-middle">
                  <LogIn />
                </i>{' '}
                <span className="align-middle">Sign In</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-sign-up.html">
                {' '}
                <i className="align-middle">
                  <UserPlus />
                </i>{' '}
                <span className="align-middle">Sign Up</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-blank.html">
                {' '}
                <i className="align-middle">
                  <Book />
                </i>{' '}
                <span className="align-middle">Blank</span>{' '}
              </a>
            </li>

            <li className="sidebar-header">Tools & Components</li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-buttons.html">
                {' '}
                <i className="align-middle">
                  <Square />
                </i>{' '}
                <span className="align-middle">Buttons</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-forms.html">
                {' '}
                <i className="align-middle">
                  <CheckSquare />
                </i>{' '}
                <span className="align-middle">Forms</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-cards.html">
                {' '}
                <i className="align-middle">
                  <Grid />
                </i>{' '}
                <span className="align-middle">Cards</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-typography.html">
                {' '}
                <i className="align-middle">
                  <AlignLeft />
                </i>{' '}
                <span className="align-middle">Typography</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="icons-feather.html">
                {' '}
                <i className="align-middle">
                  <Coffee />
                </i>{' '}
                <span className="align-middle">Icons</span>{' '}
              </a>
            </li>

            <li className="sidebar-header">Plugins & Addons</li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="charts-chartjs.html">
                {' '}
                <i className="align-middle">
                  <BarChart2 />
                </i>{' '}
                <span className="align-middle">Charts</span>{' '}
              </a>
            </li>

            <li className="sidebar-item">
              <a className="sidebar-link" href="maps-google.html">
                {' '}
                <i className="align-middle">
                  <Map />
                </i>{' '}
                <span className="align-middle">Maps</span>{' '}
              </a>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </nav>
  );

  return {
    Sidebar: show ? Sidebar : null,
    ToggleSidebar: () => {
      console.log('clicked', show);
      setShow(!show);
    },
  };
};

export default useSidebar;
