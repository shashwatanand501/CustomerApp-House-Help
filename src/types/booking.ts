import type { ServiceType } from '@/components/common/CustomButton/CustomButton';

export interface ServiceDetail {
  id: string;
  name: string;
  type: ServiceType;
  baseRatePerHour: number;
  description: string;
  minHours: number;
  maxHours: number;
}

export const AVAILABLE_SERVICES: ServiceDetail[] = [
  {
    id: 'deep-clean',
    name: 'Deep Cleaning',
    type: 'deepcleaning',
    baseRatePerHour: 299,
    description: 'Thorough sanitization of living areas, appliances, and floor scrubbing.',
    minHours: 1,
    maxHours: 6,
  },
  {
    id: 'kitchen-clean',
    name: 'Kitchen Cleaning',
    type: 'kitchencleaning',
    baseRatePerHour: 249,
    description: 'Degreasing stovetops, dish cleaning, slab wiping, and sink disinfection.',
    minHours: 1,
    maxHours: 6,
  },
  {
    id: 'cooking',
    name: 'Cooking',
    type: 'Cooking',
    baseRatePerHour: 219,
    description: 'Fresh home-style breakfast, lunch, or dinner preparation.',
    minHours: 1,
    maxHours: 4,
  },
  {
    id: 'dusting',
    name: 'Dusting',
    type: 'Dusting',
    baseRatePerHour: 189,
    description: 'Dry wiping of surfaces, furniture, windows, and upholstery vacuuming.',
    minHours: 1,
    maxHours: 5,
  },
  {
    id: 'washroom-clean',
    name: 'Washroom Cleaning',
    type: 'WashroomCleaning',
    baseRatePerHour: 229,
    description: 'Tile descaling, toilet disinfection, and chrome fittings polishing.',
    minHours: 1,
    maxHours: 5,
  },
];
export type OrderStatus = 'completed' | 'cancelled';

export interface PastOrder {
  id: string;
  serviceName: string;
  serviceType: ServiceType;
  date: string;
  time: string;
  hours: number;
  ratePerHour: number;
  platformFee: number;
  gst: number;
  total: number;
  helperName: string;
  address: string;
  paymentMethod: string;
  status: OrderStatus;
}

// Placeholder data until order history comes from the API
export const PAST_ORDERS: PastOrder[] = [
  {
    id: 'HH-10421',
    serviceName: 'Kitchen Cleaning',
    serviceType: 'kitchencleaning',
    date: '24 Oct 2026',
    time: '10:00 AM',
    hours: 2,
    ratePerHour: 249,
    platformFee: 29,
    gst: 95,
    total: 622,
    helperName: 'Sunita Devi',
    address: 'Flat 302, Green Residency, Sector 21',
    paymentMethod: 'UPI',
    status: 'completed',
  },
  {
    id: 'HH-10388',
    serviceName: 'Cooking',
    serviceType: 'Cooking',
    date: '19 Oct 2026',
    time: '7:30 PM',
    hours: 1,
    ratePerHour: 219,
    platformFee: 29,
    gst: 45,
    total: 293,
    helperName: 'Meena Kumari',
    address: 'Flat 302, Green Residency, Sector 21',
    paymentMethod: 'Wallet',
    status: 'completed',
  },
  {
    id: 'HH-10352',
    serviceName: 'Washroom Cleaning',
    serviceType: 'WashroomCleaning',
    date: '12 Oct 2026',
    time: '11:00 AM',
    hours: 1,
    ratePerHour: 229,
    platformFee: 29,
    gst: 46,
    total: 304,
    helperName: 'Rekha Sharma',
    address: 'Flat 302, Green Residency, Sector 21',
    paymentMethod: 'Card',
    status: 'cancelled',
  },
];

export type TrackingStepStatus = 'done' | 'active' | 'pending';

export interface TrackingStep {
  id: string;
  title: string;
  subtitle?: string;
  time?: string;
  status: TrackingStepStatus;
}

export interface HelperInfo {
  name: string;
  rating: number;
  jobsCompleted: number;
  phone: string;
}

export interface TrackingInfo {
  orderId: string;
  serviceName: string;
  serviceType: ServiceType;
  statusLabel: string;
  etaText: string;
  etaSubtext?: string;
  otp?: string;
  helper: HelperInfo;
  steps: TrackingStep[];
  scheduledTime: string;
  hours: number;
  address: string;
  total: number;
}

// Placeholder data until live tracking comes from the API
export const ACTIVE_TRACKING: TrackingInfo = {
  orderId: 'HH-10452',
  serviceName: 'Deep Cleaning',
  serviceType: 'deepcleaning',
  statusLabel: 'ON THE WAY',
  etaText: 'Arriving in 12 mins',
  etaSubtext: 'Your helper has left and is heading to your address.',
  otp: '4821',
  helper: {
    name: 'Sunita Devi',
    rating: 4.8,
    jobsCompleted: 214,
    phone: '+919876543210',
  },
  steps: [
    { id: 'booked', title: 'Booking confirmed', time: '3:52 PM', status: 'done' },
    { id: 'assigned', title: 'Helper assigned', subtitle: 'Sunita Devi accepted your request', time: '3:55 PM', status: 'done' },
    { id: 'on-the-way', title: 'On the way', subtitle: 'About 2.4 km away', time: '4:10 PM', status: 'active' },
    { id: 'arrived', title: 'Arrived', subtitle: 'Share the OTP to start the visit', status: 'pending' },
    { id: 'completed', title: 'Service completed', status: 'pending' },
  ],
  scheduledTime: 'Today, 4:30 PM',
  hours: 2,
  address: 'Flat 302, Green Residency, Sector 21',
  total: 760,
};
