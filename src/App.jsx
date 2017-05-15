/**
 * Created by Afaci on 08/05/2017.
 */
import React from 'react';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import transitions from 'material-ui/styles/transitions';
import MenuItem from 'material-ui/MenuItem';
import PlaylistIcon from 'material-ui/svg-icons/av/playlist-play';
import StationIcon from 'material-ui/svg-icons/av/radio';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import InfoIcon from 'material-ui/svg-icons/action/info';

import Program from './routes/Program.jsx';
import Stations from './routes/Stations.jsx';
import Settings from './routes/Settings.jsx';
import About from './routes/About.jsx';
import MenuHeader from './components/MenuHeader.jsx';
import MediaBar from './components/MediaBar.jsx';

const headerHeight = 160;

const styles = {
  content: {
    padding: 16,
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
    marginTop: headerHeight,
  },
  menuLink: {
    textDecoration: 'none',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    title: 'Programm',
    component: Program,
    icon: <PlaylistIcon/>,
  },
  {
    link: '/Stations',
    exact: true,
    title: 'Sender',
    component: Stations,
    icon: <StationIcon/>,
  },
  {
    link: '/Settings',
    exact: true,
    title: 'Einstellungen',
    component: Settings,
    icon: <SettingsIcon/>,
  },
  {
    link: '/About',
    exact: true,
    title: 'Info',
    component: About,
    icon: <InfoIcon/>,
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: {
        open: false,
        docked: false,
      },
      station: {
        name: 'Kronehit Radio Austria',
        url: 'http://raj.krone.at:80/kronehit.mp3',
        shortName: 'kronehit',
        broadcast: 'johnny',
      },
    };
  }

  toggleDrawer() {
    this.setState({
      drawer: {
        ...this.state.drawer,
        open: !this.state.drawer.open,
      },
    });
  }

  closeDrawer() {
    if (!this.state.drawer.docked) {
      this.toggleDrawer();
    }
  }
  componentWillMount() {
    const mql = window.matchMedia('(min-width: 640px)');
    mql.addListener(() => {
      this.mqlChange(mql.matches);
    });
    this.mqlChange(mql.matches);
  }
  mqlChange(matches) {
    this.setState({
      drawer: {
        open: matches,
        docked: matches,
      },
    });
  }

  render() {
    const paddingLeft = (this.state.drawer.docked ? 256 : 0) + 16;
    return <MultiThemeProvider>
      <Router>
        <div>
            <MediaBar station={this.state.station}
                    style={{ paddingLeft }}
                    iconStyleLeft={{ display: this.state.drawer.docked ? 'none' : 'block' }}
                    onLeftIconButtonTouchTap={() => (this.toggleDrawer())}
                      height={headerHeight}
            />
            <Drawer open={this.state.drawer.open}
                    docked={this.state.drawer.docked}
                    onRequestChange={() => this.toggleDrawer()}>
              <MenuHeader station={this.state.station.shortName}/>
              { routes.map(route =>
                  <Link to={ route.link } key= { route.link } style={styles.menuLink}>
                    <MenuItem primaryText={route.title}
                              leftIcon={route.icon}
                              onTouchTap={ () => this.closeDrawer() }/>
                  </Link>,
              ) }
            </Drawer>
            <div style={{ ...styles.content, paddingLeft }}>
              { routes.map(route => (
                <Route exact={ route.exact }
                       key={ route.link }
                       path={ route.link }
                       component={ route.component }
                />
              ))}
            </div>
        </div>
      </Router>
    </MultiThemeProvider>;
  }
}
