// Data for desktop and mobile ChooseResource components
import ReactGA from 'react-ga4';

import {
    PHLASK_TYPE_BATHROOM,
    PHLASK_TYPE_FOOD,
    PHLASK_TYPE_FORAGING,
    PHLASK_TYPE_WATER
} from '../../actions/actions';

import { ReactComponent as BathroomIcon } from '../icons/BathroomIconChooseResource.svg';
import { ReactComponent as FoodIcon } from '../icons/FoodIconChooseResource.svg';
import { ReactComponent as ForagingIcon } from '../icons/ForagingIconChooseResource.svg';
import { ReactComponent as WaterIcon } from '../icons/WaterIconChooseResource.svg';

import { ReactComponent as BathroomIconSmall } from '../icons/ToiletIconV2.svg';
import { ReactComponent as FoodIconSmall } from '../icons/FoodIconV2.svg';
import { ReactComponent as ForagingIconSmall } from '../icons/ForagingIconV2.svg';
import { ReactComponent as WaterIconSmall } from '../icons/WaterIconV2.svg';


const resourceTypeInfo = [
    {
        resourceType: 'Water',
        largeIcon: WaterIcon,
        smallIcon: WaterIconSmall,
        actionLabel: PHLASK_TYPE_WATER,
        color: "#5286E9"
    },
    {
        resourceType: 'Foraging',
        largeIcon: ForagingIcon,
        smallIcon: ForagingIconSmall,
        actionLabel: PHLASK_TYPE_FORAGING,
        color: "#5DA694"
    },
    {
        resourceType: 'Food',
        largeIcon: FoodIcon,
        smallIcon: FoodIconSmall,
        actionLabel: PHLASK_TYPE_FOOD,
        color: "#FF9A55"
    },
    {
        resourceType: 'Bathroom',
        largeIcon: BathroomIcon,
        smallIcon: BathroomIconSmall,
        actionLabel: PHLASK_TYPE_BATHROOM,
        color: "#9E9E9E"
    }
];

function handleGA(type) {
    // ReactGA.event({
    //   category: `ResourceMenu`,
    //   action: 'MapChangedTo',
    //   label: `${type}`
    // });
}

export { resourceTypeInfo, handleGA };
