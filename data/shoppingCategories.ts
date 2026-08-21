import type { ProductCategory } from '../types/shopping';

/**
 * The shopping categories, and the fields each one compares on.
 *
 * compareFields is the useful part: a comparison table for a TV and one for a
 * pair of earbuds have almost nothing in common, and a single fixed set of
 * columns would leave most of them blank. The table reads this list, in this
 * order, and shows only the rows a product actually has a value for.
 *
 * trackingId is left undefined on purpose. Amazon tracking ids have to be
 * created in the Associates dashboard — a site cannot mint its own — so these
 * stay empty until they exist, and links fall back to the account default.
 */
export const SHOPPING_CATEGORIES: ProductCategory[] = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    blurb: 'Phones compared on the things that decide it — chip, camera, battery and how long it keeps updates.',
    compareFields: ['Processor', 'RAM', 'Storage', 'Display', 'Camera', 'Battery', 'Charging', 'Operating system', '5G'],
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    blurb: 'What the spec sheet means in practice, for work, code, study or games.',
    compareFields: ['CPU', 'GPU', 'RAM', 'Storage', 'Display', 'Battery', 'Weight', 'Ports', 'Operating system'],
  },
  {
    slug: 'smart-tvs',
    name: 'Smart TVs',
    blurb: 'Panel type, real refresh rate, and which features are actually on the model you are buying.',
    compareFields: ['Display technology', 'Screen size', 'Resolution', 'Refresh rate', 'HDR', 'Operating system', 'HDMI', 'Gaming features', 'Audio'],
  },
  {
    slug: 'earbuds',
    name: 'Earbuds & Headphones',
    blurb: 'Noise cancellation, codecs and the battery figure with the case included.',
    compareFields: ['Battery', 'ANC', 'Codec', 'Drivers', 'Water resistance', 'Bluetooth', 'Microphones'],
  },
  {
    slug: 'smartwatches',
    name: 'Smartwatches',
    blurb: 'Sensors that work, battery that lasts, and whether it talks to your phone properly.',
    compareFields: ['Display', 'Battery', 'Sensors', 'GPS', 'Water resistance', 'Compatibility', 'Charging'],
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    blurb: 'Consoles, controllers and the accessories that actually change how a game feels.',
    compareFields: ['Platform', 'Storage', 'Resolution', 'Frame rate', 'Connectivity', 'Included'],
  },
  {
    slug: 'cameras',
    name: 'Cameras',
    blurb: 'Sensor, lens mount and video limits — the three that decide what you can shoot.',
    compareFields: ['Sensor', 'Resolution', 'Lens mount', 'Video', 'Stabilisation', 'Autofocus', 'Battery'],
  },
  {
    slug: 'smart-home',
    name: 'Smart Home',
    blurb: 'What each device works with, before you find out it does not work with yours.',
    compareFields: ['Works with', 'Connectivity', 'Power', 'Hub required', 'Features'],
  },
  {
    slug: 'home-appliances',
    name: 'Home Appliances',
    blurb: 'Capacity, running cost and the rating that shows on the electricity bill.',
    compareFields: ['Capacity', 'Energy rating', 'Type', 'Warranty', 'Features'],
  },
  {
    slug: 'computer-accessories',
    name: 'Computer Accessories',
    blurb: 'Keyboards, mice, docks and hubs — the parts you touch all day.',
    compareFields: ['Type', 'Connectivity', 'Compatibility', 'Battery', 'Features'],
  },
  {
    slug: 'power-banks',
    name: 'Power Banks & Chargers',
    blurb: 'Real capacity, real output, and whether it charges the thing you own.',
    compareFields: ['Capacity', 'Output', 'Ports', 'Fast charging', 'Weight'],
  },
  {
    slug: 'monitors',
    name: 'Monitors',
    blurb: 'Panel, refresh rate and colour coverage, separated from the marketing.',
    compareFields: ['Screen size', 'Resolution', 'Panel type', 'Refresh rate', 'Response time', 'Colour coverage', 'Ports', 'Adjustability'],
  },
  {
    slug: 'tablets',
    name: 'Tablets',
    blurb: 'Screen, chip and whether the accessories you need are included or extra.',
    compareFields: ['Display', 'Processor', 'RAM', 'Storage', 'Battery', 'Stylus support', 'Operating system'],
  },
  {
    slug: 'printers',
    name: 'Printers',
    blurb: 'Running cost per page matters more than the price on the box.',
    compareFields: ['Type', 'Print speed', 'Connectivity', 'Duplex', 'Ink type', 'Cost per page'],
  },
  {
    slug: 'networking',
    name: 'Networking',
    blurb: 'Routers and mesh, judged on coverage and what happens when everyone is online.',
    compareFields: ['Standard', 'Bands', 'Speed', 'Coverage', 'Ports', 'Mesh support'],
  },
];

export const getShoppingCategory = (slug: string): ProductCategory | undefined =>
  SHOPPING_CATEGORIES.find((c) => c.slug === slug);

export const SHOPPING_CATEGORY_COUNT = SHOPPING_CATEGORIES.length;
