import shareFoodLogo from 'assets/logos/share-food-program.png';

const providerLogos: Record<string, string> = {
  'Share Food Program': shareFoodLogo
};

export const getProviderLogo = (name: string): string | undefined => {
  return providerLogos[name];
};
