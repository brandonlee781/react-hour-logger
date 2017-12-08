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
      <SideNavContainer className="no-print">
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
          component={(props: {}) => <SideNavLink 
            {...props} 
            exact={true} 
            to="/work/" 
            activeClassName="nav-item-active"
          />}
        >
          <SideNavIcon>home</SideNavIcon>
          <SideNavLabel>Home</SideNavLabel>
        </SideNavButton>

        <SideNavButton 
          component={(props: {}) => <SideNavLink {...props} to="/work/projects" activeClassName="nav-item-active"/>}
        >
          <SideNavIcon>assignment</SideNavIcon>
          <SideNavLabel>Projects</SideNavLabel>
        </SideNavButton>

        <SideNavButton 
          component={(props: {}) => <SideNavLink {...props} to="/work/invoices" activeClassName="nav-item-active"/>}
        >
          <SideNavIcon>receipt</SideNavIcon>
          <SideNavLabel>Invoices</SideNavLabel>
        </SideNavButton>
      </SideNavContainer>
    );
  }
}
