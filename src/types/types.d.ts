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

export interface BandMemberType {
  id: number;
  email: string;
  avatarUrl: string;
  name: string;
  birthday: string;
  positions: SelectionType[];
  avatarUrl: string;
  birthday: Date;
  age: number;
  isFrontman: boolean;
}

export interface BandProfileType {
  id: number;
  avatarUrl: string;
  name: string;
  bandMembers: BandMemberType[];
  areas: AreaType[];
  genres: SelectionType[];
  days: SelectionType[];
  description: string;
  bandPractices: PerformanceRecordType[];
  bandGigs: PerformanceRecordType[];
  bandPhotos: PictureType[];
  isReaderFrontman: boolean;
}

export interface PostType {
  id: number;
  title: string;
  body: string;
  dtype: string;
  userEmail: string;
  bandId: number;
}

export interface PrequisiteElementType {
  preqId: number;
  id: number;
}

export interface PrequisiteRequestType {
  dtype: string;
  min: number;
  max: number;
  gender: boolean;
  areas: PrequisiteElementType[];
  genres: PrequisiteElementType[];
  positions: PrequisiteElementType[];
}
