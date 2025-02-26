import useIsMobile from 'hooks/useIsMobile';
import DesktopBathroomIcon from 'icons/BathroomIconChooseResource';
import DesktopFoodIcon from 'icons/FoodIconChooseResource';
import DesktopForagingIcon from 'icons/ForagingIconChooseResource';
import DesktopWaterIcon from 'icons/WaterIconChooseResource';
import MobileWaterIcon from 'icons/WaterIconV2';
import MobileFoodIcon from 'icons/FoodIconV2';
import MobileForagingIcon from 'icons/ForagingIconV2';
import MobileBathroomIcon from 'icons/ToiletIconV2';
import {
  WATER_RESOURCE_TYPE,
  FOOD_RESOURCE_TYPE,
  FORAGE_RESOURCE_TYPE,
  BATHROOM_RESOURCE_TYPE
} from 'types/ResourceEntry';
import DesktopChooseResourceType from './DesktopChooseResourceType';
import MobileChooseResourceType from './MobileChooseResourceType';

const ChooseResourceType = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileChooseResourceType />;
  }

  return <DesktopChooseResourceType />;
};

export default ChooseResourceType;
