import TextField from '@mui/material/TextField';
import { Autocomplete, InputAdornment } from '@mui/material';
import { SearchIcon } from 'icons';
import styles from './SearchBar.module.scss';
import useGooglePlacesAutocomplete from 'hooks/useGooglePlacesAutocomplete';

type SearchBarProps = { search: (location: google.maps.LatLngLiteral) => void };

const SearchBar = ({ search }: SearchBarProps) => {
  const { isSearching, onChange, onSelect, suggestions } =
    useGooglePlacesAutocomplete({ onSearch: search });

  return (
    <Autocomplete
      fullWidth={false}
      onInputChange={(_event, value) => {
        onChange(value);
      }}
      options={suggestions}
      loading={isSearching}
      getOptionKey={option => option.placeId}
      getOptionLabel={option => option.text.text}
      onChange={(_event, value, reason) => {
        if (reason !== 'selectOption') {
          return;
        }

        if (!value) {
          return;
        }

        onSelect(value.toPlace());
      }}
      classes={{ root: styles.root || '' }}
      renderInput={({ InputProps, disabled, fullWidth, id, inputProps }) => (
        <TextField
          id={id}
          autoComplete="off"
          fullWidth={fullWidth}
          disabled={disabled}
          inputMode="search"
          size="small"
          placeholder="Search for Resources near..."
          variant="filled"
          slotProps={{
            input: {
              ...InputProps,
              autoComplete: 'off',
              sx: { paddingBlock: '16px !important' },
              classes: { adornedStart: styles['search-icon'] || '' },
              startAdornment: (
                <InputAdornment
                  classes={{
                    positionStart: styles['search-icon'] || '',
                    hiddenLabel: styles['search-icon'] || ''
                  }}
                  position="start"
                >
                  <SearchIcon height={24} width={24} />
                </InputAdornment>
              ),
              disableUnderline: true
            },

            htmlInput: { ...inputProps }
          }}
        />
      )}
    />
  );
};

export default SearchBar;
