import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

// tslint:disable-next-line:no-any
export const NavButton = styled(IconButton as any)`
  height: 32px !important;
  width: 32px !important;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

export const CalTitle = styled.div`
  height: 32px;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  opacity: .54;
`;