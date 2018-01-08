import styled, { StyledFunction } from 'styled-components';

const styledDiv: StyledFunction<{ color: string } & React.HTMLProps<HTMLInputElement>> = styled.div;

export const EventWrapper = styledDiv`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 5px;
  background-color: ${p => p.color};
  color: #fff;

  font-size: 14px;
  font-weight: 300;
`;