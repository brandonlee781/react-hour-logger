import * as React from 'react';
import MediaQuery from 'react-responsive';
import { 
  SideNavContainer,
  MenuButton,
  SideNavButton,
  SideNavLink,
  SideNavIcon,
  SideNavLabel
} from './SideNav.style';
import Menu from 'material-ui-icons/Menu';

interface SideNavProps {
  toggleDrawer?: () => void;
}

export class SideNav extends React.Component<SideNavProps, {}> {
  render() {
    return (
      <SideNavContainer style={{borderRight: '2px solid #2196F3'}}>
        <MediaQuery maxWidth={960}>
          <MenuButton 
            raised={true} 
            color="primary"
            onClick={this.props.toggleDrawer}
          >
            <Menu/>Menu
          </MenuButton>
        </MediaQuery>
        <SideNavButton 
          component={(props: {}) => <SideNavLink {...props} exact={true} to="/" activeClassName="nav-item-active"/>}
        >
          <SideNavIcon>home</SideNavIcon>
          <SideNavLabel>Home</SideNavLabel>
        </SideNavButton>

        <SideNavButton 
          component={(props: {}) => <SideNavLink {...props} to="/projects" activeClassName="nav-item-active"/>}
        >
          <SideNavIcon>assignment</SideNavIcon>
          <SideNavLabel>Projects</SideNavLabel>
        </SideNavButton>

        <SideNavButton 
          component={(props: {}) => <SideNavLink {...props} to="/invoices" activeClassName="nav-item-active"/>}
        >
          <SideNavIcon>receipt</SideNavIcon>
          <SideNavLabel>Invoices</SideNavLabel>
        </SideNavButton>
      </SideNavContainer>
    );
  }
}
