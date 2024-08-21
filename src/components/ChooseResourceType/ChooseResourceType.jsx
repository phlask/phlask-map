import useIsMobile from 'hooks/useIsMobile';
import DesktopChooseResourceType from './DesktopChooseResourceType';
import MobileChooseResourceType from './MobileChooseResourceType';
import DesktopBathroomIcon from '../icons/BathroomIconChooseResource.svg?react';
import DesktopFoodIcon from '../icons/FoodIconChooseResource.svg?react';
import DesktopForagingIcon from '../icons/ForagingIconChooseResource.svg?react';
import DesktopWaterIcon from '../icons/WaterIconChooseResource.svg?react';
import MobileWaterIcon from '../icons/WaterIconV2.svg?react';
import MobileFoodIcon from '../icons/FoodIconV2.svg?react';
import MobileForagingIcon from '../icons/ForagingIconV2.svg?react';
import MobileBathroomIcon from '../icons/ToiletIconV2.svg?react';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from '../../types/ResourceEntry';

const resourceTypeInfo = [
  {
    type: WATER_RESOURCE_TYPE,
    textLabel: 'Water',
    color: '#5286E9',
    desktopIcon: DesktopWaterIcon,
    mobileIcon: MobileWaterIcon
  },
  {
    type: FOOD_RESOURCE_TYPE,
    textLabel: 'Food',
    color: '#FF9A55',
    desktopIcon: DesktopFoodIcon,
    mobileIcon: MobileFoodIcon
  },
  {
    type: FORAGE_RESOURCE_TYPE,
    textLabel: 'Foraging',
    color: '#5DA694',
    desktopIcon: DesktopForagingIcon,
    mobileIcon: MobileForagingIcon
  },
  {
    type: BATHROOM_RESOURCE_TYPE,
    textLabel: 'Bathroom',
    color: '#9E9E9E',
    desktopIcon: DesktopBathroomIcon,
    mobileIcon: MobileBathroomIcon
  }
];

const ChooseResourceType = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile ? (
        <DesktopChooseResourceType resourceTypeInfo={resourceTypeInfo} />
      ) : (
        <MobileChooseResourceType resourceTypeInfo={resourceTypeInfo} />
      )}
    </>
  );
};

export default ChooseResourceType;
