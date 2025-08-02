import * as CustomIcons from './CustomIcons';
import { IconProps, CustomIconType } from './Icons.types';

export const errorMessages = {
  iconError: 'Icon error',
  iconNotFound: (name: string) => `${name}`,
} as const;

export const defaultValues = {
  name: undefined,
  src: '',
  alt: '',
  onClick: undefined,
  className: '',
} as const;

export const customIconComponents: Record<CustomIconType, React.ComponentType<IconProps>> = {
  ufo: CustomIcons.UFOIcon,
  planet: CustomIcons.PlanetIcon,
  trending: CustomIcons.TrendingIcon,
  astronaut: CustomIcons.AstronautIcon,
  satellite: CustomIcons.SatelliteIcon,
  box: CustomIcons.BoxIcon,
  rotate: CustomIcons.RotateIcon,
  graph: CustomIcons.GraphIcon,
  'circle-minus': CustomIcons.CircleMinusIcon,
  return: CustomIcons.ReturnIcon,
  emblaprev: CustomIcons.EmblaPrevIcon,
  emblanext: CustomIcons.EmblaNextIcon,
} as const;
