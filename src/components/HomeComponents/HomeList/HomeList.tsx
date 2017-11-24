import * as React from 'react';
import { Log } from '../../../constants/types';
import { HomeListItem } from '../../../components';

interface HomeListProps {
  logs: Log[];
}

export const HomeList = (props: HomeListProps) => (
  <div style={{width: '100%'}}>
    {props.logs.map((log, ind) => (
      <HomeListItem key={ind} {...log}/>
    ))}
  </div>
);