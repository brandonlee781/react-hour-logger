import styled from 'styled-components';
import IconButton from 'material-ui/Button';

export const LogEntry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7rem;
  padding: 6px 4em;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  color: #2c3e50;
`;

export const LogWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 500px;
`;

export const LogNote = styled.span`
  width: 100%;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LogDetail = styled.div`
  display: flex;
  /* justify-content: space-between; */
  min-width: 500px;
  max-height: 1.5rem;
  color: rgba(0,0,0,0.54);
  font-size: 14px;
  line-height: 1.5;
  & div {
    display: flex;
    justify-content: center;
    text-align: left;
    margin-right: 10px;
    & span {
      margin-left: 4px;
      margin-top: 2px;
    }
  }
`;

// tslint:disable-next-line:no-any
export const LogButton = styled(IconButton as any)`
  height: 44px !important;
  width: 44px !important;
  border-radius: 50% !important;
  min-width: 44px !important;
  margin: 0 6px;
`;
