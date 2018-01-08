import styled, { StyledFunction } from 'styled-components';

const bodyDiv: StyledFunction<{ color: string } & React.HTMLProps<HTMLInputElement>> = styled.div;

export const EventWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 12px;
`;

export const ColorCircle = bodyDiv`
  height: 5px;
  width: 5px;
  min-width: 5px;
  border-radius: 50%;
  background-color: ${p => p.color};
  margin-right: 5px;
`;