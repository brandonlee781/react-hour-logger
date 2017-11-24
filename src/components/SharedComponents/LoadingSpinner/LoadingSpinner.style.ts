import styled, { StyledFunction } from 'styled-components';

interface LoadingWrapperProps {
  show: boolean;
}
interface LoadingImgProps {
  size?: number;
}
const wrapperDiv: StyledFunction<LoadingWrapperProps & React.HTMLProps<HTMLInputElement>> = styled.div;
const loadingImg: StyledFunction<LoadingImgProps & React.HTMLProps<HTMLInputElement>> = styled.img;

export const LoadingWrapper = wrapperDiv`
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoadingImg = loadingImg`
  height: ${ props => props.size ? props.size : 200 }px;
  width: ${ props => props.size ? props.size : 200 }px;
`;