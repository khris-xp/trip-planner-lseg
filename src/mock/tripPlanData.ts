import type { TripPlanResponseType } from '../types/response';

export const mockTripPlan: TripPlanResponseType[] = [
  {
    day: 1,
    startTime: new Date('2024-01-01T08:00:00'),
    endTime: new Date('2024-01-01T20:00:00'),
    details: `Day 1: Cultural Exploration & Local Flavors

Morning
========================================
08:00 - Grand Palace Visit
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et purus ac diam vulputate scelerisque ut eu metus. Nunc in orci id nisl placerat lacunis. Ut dignissim turpis et eros venenatis condimentum.

Etiam eget blandit lectus. Etiam in purus sed lectus ultrices commodo et sit amet nisl. Duis egestas enim eget molestie semper. Nulla vulputate non felis rutrum eleifend. Sed quis ultrices metus. In faucibus, nibh ac bibendum varius, felis ligula dapibus felis, vel euismod ligula dui ac elit.

10:30 - Wat Phra Kaew Temple
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam non tellus sed ex consectetur fringilla. Phasellus eget vulputate lectus. Quisque sit amet elit odio.

Lunch
========================================
12:30 - Traditional Thai Cuisine
Etiam eget blandit lectus. Etiam in purus sed lectus ultrices commodo et sit amet nisl. Duis egestas enim eget molestie semper. Nulla vulputate non felis rutrum eleifend. Sed quis ultrices metus.

In faucibus, nibh ac bibendum varius, felis ligula dapibus felis, vel euismod ligula dui ac elit. Nulla ac erat nibh. Sed accumsan at felis eget sodales. Donec imperdiet molestie tellus eu consequat.

Afternoon
========================================
14:00 - Chao Phraya River Cruise
In faucibus, nibh ac bibendum varius, felis ligula dapibus felis, vel euismod ligula dui ac elit. Nulla ac erat nibh. Sed accumsan at felis eget sodales.

Dinner
========================================
19:00 - Riverside Dining
Donec imperdiet molestie tellus eu consequat. Sed sit amet lacus ut nulla ultrices tincidunt. Aenean nisl tortor, bibendum sed consectetur sed, pharetra id elit. Nullam nulla lacus, interdum sed urna nec.`,
  },
  {
    day: 2,
    startTime: new Date('2024-01-02T07:00:00'),
    endTime: new Date('2024-01-02T18:00:00'),
    details: `Day 2: Adventure & Nature

Morning
========================================
07:00 - Floating Market
Nullam nulla lacus, interdum sed urna nec, efficitur volutpat nulla. Maecenas sed aliquet quam, faucibus gravida turpis. Aliquam rutrum nibh nec odio dapibus.

Etiam eget blandit lectus. Etiam in purus sed lectus ultrices commodo et sit amet nisl. Duis egestas enim eget molestie semper.

Lunch
========================================
12:00 - Local Street Food
Nec interdum nisl facilisis. Ut ut purus lobortis, lobortis neque sed, laoreet ligula. Vivamus auctor lacus in vulputate pellentesque.

Donec imperdiet molestie tellus eu consequat. Sed sit amet lacus ut nulla ultrices tincidunt.`,
  },
];
