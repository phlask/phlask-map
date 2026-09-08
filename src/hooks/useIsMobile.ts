import useMediaQuery from '@mui/material/useMediaQuery';

const useIsMobile = () => {
  const isMobile = useMediaQuery(theme =>
    theme.breakpoints.down(theme.breakpoints.values.md)
  );

  return isMobile;
};

export default useIsMobile;
