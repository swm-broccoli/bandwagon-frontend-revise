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

export interface RecordURLType {
  siteName: string;
  url: string;
}

export interface PerformanceRecordType {
  id: number;
  musicTitle: string;
  performDate: string;
  urls: RecordURLType[];
}

export interface UserProfileType {
  avatarUrl: string;
  name: string;
  birthday: string;
  gender: boolean;
  positions: SelectionType[];
  areas: AreaType[];
  genres: GenreType[];
  description: string;
  userPerformances: PerformanceRecordType[];
}

export interface UserProfileChangeTraceType {
  //유저 프로필에서 변경된 점을 추적해서 변경시 true가 되는 지점 추적
  name: boolean;
  birthday: boolean;
  positions: boolean;
  areas: boolean;
  genres: boolean;
  description: boolean;
  userPerformances: boolean;
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
