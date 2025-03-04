export interface EstimatedDiameter {
  kilometers: {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  };
}

export interface CloseApproachData {
  close_approach_date: string;
  relative_velocity: {
    kilometers_per_hour: string;
  };
  miss_distance: {
    kilometers: string;
  };
  orbiting_body: string;
}

export interface NEO {
  id: string;
  name: string;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}

export interface NEOApiResponse {
  near_earth_objects: {
    [date: string]: NEO[];
  };
}
