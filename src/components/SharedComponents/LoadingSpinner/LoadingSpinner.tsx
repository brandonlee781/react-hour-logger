import * as React from 'react';
import {
  LoadingWrapper,
  LoadingImg,
} from './LoadingSpinner.style';
const loading = require('../../../assets/Double Ring.svg') as string;

interface LoadingSpinnerProps {
  show: boolean;
  size?: number;
}

export const LoadingSpinner = (props: LoadingSpinnerProps) => (
  <LoadingWrapper show={props.show}>
    <LoadingImg 
      src={loading} 
      size={props.size} 
    />
  </LoadingWrapper>
);