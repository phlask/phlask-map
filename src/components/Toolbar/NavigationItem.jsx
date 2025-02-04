import { styled, css } from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const NavigationItem = styled(BottomNavigationAction, {
  shouldForwardProp: propName => propName !== 'central'
})`
  ${({ central = false }) =>
    central &&
    css`
      padding-bottom: 48px;
    `}

  & .Mui-selected {
    color: #2d3748;
  }

  & .MuiBottomNavigationAction-label {
    padding-top: ${({ central }) => (central ? 0 : 2)}px;
    color: #2d3748;
  }

  & .MuiBottomNavigationAction-label.Mui-selected {
    font-size: ${({ theme }) => theme.typography.pxToRem(12)};
  }
`;

export default NavigationItem;
