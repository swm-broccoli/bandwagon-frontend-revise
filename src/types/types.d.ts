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
  name: string | null;
}

export interface RecordURLType {
  siteName: string;
  url: string;
}

export interface PerformanceRecordType {
  id: number;
  musicTitle: string | null;
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
  email: string | null;
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
  id: number;
}

export interface PrequisiteRequestType {
  dtyle: string;
  min: number;
  max: number;
  gender: boolean;
  areas: PrequisiteElementType[];
  genres: PrequisiteElementType[];
  positions: PrequisiteElementType[];
}

export interface SignUpUserInputType {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
  birthday: string;
  gender: string;
}

export interface PostCardType {
  id: number;
  title: string
  body: string,
  dtype: string,
  bandId: number,
  bandName: string,
  bandAvatarUrl: string
}