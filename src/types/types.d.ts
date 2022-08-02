export interface PositionType {
  id: number;
  name: string;
}

export interface AreaType {
  id: number;
  city: string;
  district: string;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface SelectionType {
  id: number;
  name: string;
}

export interface PictureType {
  id: number;
  name: string;
}

export interface PerformanceType {
  id: number;
  musicTitle: string;
  performDate: string;
  videoUrl: string;
  audioUrl: string;
}

export interface UserProfileType {
  name: string;
  birthday: string;
  positions: PositionType[];
  areas: AreaType[];
  genres: GenreType[];
  description: string;
  userPerformances: PerformanceType[];
}

export interface BandProfileType {
  id: number;
  name: string;
  bandMembers: string[];
  areas: AreaType[];
  genres: SelectionType[];
  description: string;
  bandPractices: PerformanceType[];
  bandGigs: PerformanceType[];
  bandPhotos: PictureType[];
}
