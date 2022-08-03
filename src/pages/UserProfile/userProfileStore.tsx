import create from 'zustand';
import initialUserProfile from './initialUserProfile';
import {
  UserProfileType,
  AreaType,
  PerformanceRecordType,
} from '../../types/types';

interface UserProfileStoreType {
  userProfile: UserProfileType;
  setUserProfileByFieldName: (
    fieldName: string,
    value: Partial<UserProfileType>,
  ) => void;

  setUserProfilePositions: (
    positions: Array<{ id: number; name: string }>,
  ) => void;
  setUserProfileAreas: (areas: Array<AreaType>) => void;
  setUserProfileGenres: (genres: Array<{ id: number; name: string }>) => void;
  setUserProfileDescription: (description: string) => void;
  setUserProfilePerformances: (
    performances: Array<PerformanceRecordType>,
  ) => void;
}

const userProfileStore = create<UserProfileStoreType>((set) => ({
  userProfile: initialUserProfile,
  setUserProfileByFieldName: (fieldName, value) => {
    set((state) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        [fieldName]: value,
      },
    }));
  },
  setUserProfilePositions: (positions) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        positions: positions,
      },
    }));
  },
  setUserProfileAreas: (areas) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        areas: areas,
      },
    }));
  },
  setUserProfileGenres: (genres) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        genres: genres,
      },
    }));
  },
  setUserProfileDescription: (description) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        description: description,
      },
    }));
  },
  setUserProfilePerformances: (performances) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        userPerformances: performances,
      },
    }));
  },
}));

export default userProfileStore;
