export type TripPlanResponseType = {
  day: number;
  startTime: Date;
  endTime: Date;
  details: string;
};

export type APIResponseType = {
  status: number;
  message: string;
  data: TripPlanResponseType[];
};
