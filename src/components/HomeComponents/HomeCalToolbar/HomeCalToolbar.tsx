import * as React from 'react';
import * as moment from 'moment';
import { Messages } from 'react-big-calendar';
import { ToolbarWrapper, NavButton, ButtonGroup, CalTitle } from './HomeCalToolbar.style';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import { KeyboardArrowLeft, KeyboardArrowRight } from 'material-ui-icons';

interface Props {
  date: Date;
  label: string;
  messages: Messages;
  onNavigate: (action: string) => void;
  onViewChange: (action: string) => void;
  view: string;
  views: string[];
}

export class HomeCalToolbar extends React.Component<Props, {}> {
  navigate = (action: string) => {
    this.props.onNavigate(action);
  }

  view = (view: string) => {
    this.props.onViewChange(view);
  }

  render() {
    const { messages, label, views, view } = this.props;
    return (
      <ToolbarWrapper>
        <ButtonGroup>
          <Tooltip placement="bottom" title={moment().format('dddd, MMMM D')}>
            <Button onClick={this.navigate.bind(null, 'TODAY')} dense={true}>{messages.today}</Button>
          </Tooltip>
          <NavButton onClick={this.navigate.bind(null, 'PREV')}><KeyboardArrowLeft/></NavButton>
          <NavButton onClick={this.navigate.bind(null, 'NEXT')}><KeyboardArrowRight/></NavButton>
          <CalTitle>{label}</CalTitle>
        </ButtonGroup>

        <ButtonGroup>
          {views.map((v, i) => (
            <Button 
              key={i} 
              dense={true}
              raised={v === view}
              color={v === view ? 'primary' : null}
              onClick={this.view.bind(null, v)} 
            >
              {messages[v]}
            </Button>
          ))}
        </ButtonGroup>
      </ToolbarWrapper>
    );
  }
}