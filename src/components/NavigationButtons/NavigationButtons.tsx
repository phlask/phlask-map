import { Button, Collapse, Stack } from '@mui/material';
import PhlaskNoTextIcon from 'icons/PhlaskNoText';
import UsersIcon from 'icons/UsersIcon';
import IDIcon from 'icons/ModalIdRequired';
import type { HeaderMenuPage } from 'contexts/HeaderContext';

const buttonStyles = {
  color: '#2D3748',
  backgroundColor: 'transparent',
  width: 'fit-content',
  textDecoration: 'none',
  margin: '10px 10px',
  borderRadius: '24px',
  padding: '0 20px',
  fontSize: '16px'
};

type NavigationButtonsProps = {
  onItemClick: (item: HeaderMenuPage) => void;
  isOpen: boolean;
};

const NavigationButtons = ({ onItemClick, isOpen }: NavigationButtonsProps) => (
  <Collapse in={isOpen} timeout="auto">
    <Stack>
      <Button
        sx={buttonStyles}
        onClick={() => onItemClick('about')}
        startIcon={<PhlaskNoTextIcon height="36" width="36" />}
        data-cy="sidebar-about-button"
      >
        About
      </Button>
      <Button
        sx={buttonStyles}
        onClick={() => onItemClick('join')}
        startIcon={<UsersIcon height="36" width="36" />}
        data-cy="sidebar-jointeam-button"
      >
        Join the team
      </Button>
      <Button
        sx={buttonStyles}
        onClick={() => onItemClick('contact')}
        startIcon={<IDIcon height="36" width="36" />}
        data-cy="sidebar-contact-button"
      >
        Contact
      </Button>
    </Stack>
  </Collapse>
);

export default NavigationButtons;
