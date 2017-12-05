import * as React from 'react';
import { Log } from '../../../constants/types';
import { HomeListItem } from '../../../components';
import { ListWrapper } from './HomeList.style';
import Button from 'material-ui/Button';
import { LoadingSpinner } from '../../SharedComponents/LoadingSpinner';

interface HomeListProps {
  loading: boolean;
  logs: Log[];
  getMoreLogs: () => void; 
  deleteLog: (logId: string) => void;
}

export const HomeList = (props: HomeListProps) => {
  if (props.loading) {
    return <LoadingSpinner show={true}/>;
  }
  return (
    <ListWrapper>
      {props.logs.map((log, ind) => (
        <HomeListItem key={ind} {...log} deleteLog={props.deleteLog}/>
      ))}
      <Button 
        raised={true}
        color="primary"
        style={{width: '80%', margin: '8px 0'}} 
        onClick={props.getMoreLogs}
      >
        Get More Logs
      </Button>
    </ListWrapper>
  );
};