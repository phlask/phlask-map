import { useState } from 'react';
import {
  Stack,
  Typography,
  Avatar,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  Box
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { type Provider } from 'types/ResourceEntry';

type ProviderLogoProps = {
  provider: Provider;
  size: number;
  onError: (logoUrl: string) => void;
  failedImages: Set<string>;
};

const ProviderLogo = ({
  provider,
  size,
  onError,
  failedImages
}: ProviderLogoProps) => {
  const logoUrl = provider.logo_url;
  const showImage = logoUrl && !failedImages.has(logoUrl);

  if (showImage) {
    return (
      <Box
        component="img"
        src={logoUrl}
        alt={provider.name}
        sx={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: '4px'
        }}
        onError={() => onError(logoUrl)}
      />
    );
  }

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        bgcolor: '#4A90A4'
      }}
    >
      {provider.name.charAt(0).toUpperCase()}
    </Avatar>
  );
};

type ProviderItemProps = {
  provider: Provider;
  onImageError: (logoUrl: string) => void;
  failedImages: Set<string>;
};

const ProviderItem = ({
  provider,
  onImageError,
  failedImages
}: ProviderItemProps) => {
  const content = (
    <Stack direction="row" alignItems="center" gap={1.5}>
      <ProviderLogo
        provider={provider}
        size={40}
        onError={onImageError}
        failedImages={failedImages}
      />
      <Typography fontSize={14} color="#2D3748">
        {provider.name}
      </Typography>
    </Stack>
  );

  if (provider.url) {
    return (
      <Link
        href={provider.url}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        color="inherit"
        sx={{ '&:hover': { opacity: 0.8 } }}
      >
        {content}
      </Link>
    );
  }

  return content;
};

type ProvidedByProps = {
  providers?: Provider[];
  maxVisible?: number;
};

const ProvidedBy = ({ providers = [], maxVisible = 2 }: ProvidedByProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  if (providers.length === 0) {
    return null;
  }

  const visibleProviders = providers.slice(0, maxVisible);
  const hiddenProviders = providers.slice(maxVisible);
  const hasMore = hiddenProviders.length > 0;

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageError = (logoUrl: string) => {
    setFailedImages(prev => new Set(prev).add(logoUrl));
  };

  return (
    <Stack gap="6px">
      <Stack direction="row" alignItems="center" gap={0.5}>
        <Typography fontSize={14} fontWeight={600}>
          Provided By
        </Typography>
        <Tooltip title="Organizations that contributed this resource to PHLASK">
          <InfoOutlinedIcon
            sx={{ fontSize: 16, color: '#60718C', cursor: 'help' }}
          />
        </Tooltip>
      </Stack>

      <Stack gap={1}>
        {visibleProviders.map((provider, index) => (
          <ProviderItem
            key={`${provider.name}-${index}`}
            provider={provider}
            onImageError={handleImageError}
            failedImages={failedImages}
          />
        ))}

        {hasMore && (
          <>
            <Typography
              fontSize={14}
              color="#4A90A4"
              sx={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
              onClick={handleMoreClick}
            >
              +{hiddenProviders.length} more
            </Typography>

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
            >
              <List dense sx={{ minWidth: 200 }}>
                {hiddenProviders.map((provider, index) => (
                  <ListItem key={`${provider.name}-${index}`}>
                    <ListItemAvatar sx={{ minWidth: 48 }}>
                      <ProviderLogo
                        provider={provider}
                        size={32}
                        onError={handleImageError}
                        failedImages={failedImages}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        provider.url ? (
                          <Link
                            href={provider.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            color="inherit"
                          >
                            {provider.name}
                          </Link>
                        ) : (
                          provider.name
                        )
                      }
                      slotProps={{ primary: { fontSize: 14 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Popover>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default ProvidedBy;
