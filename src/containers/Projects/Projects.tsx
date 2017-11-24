import * as React from 'react';
// import { NavDrawer } from '../../components';

export class Projects extends React.Component {
  constructor(props: {}) {
    super(props);
    this.changeSelected = this.changeSelected.bind(this);
  }

  changeSelected() {
    console.log(this);
  }

  render() {
    return (
      <h1>Projects</h1>
      // <NavDrawer header="Projects" links={[]} changeSelected={this.changeSelected}/>
    );
  }
}
