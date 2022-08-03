import create from 'zustand';
import initialUserProfile from './initialUserProfile';
import { UserProfileType, AreaType } from '../../types/types';

interface UserProfileStoreType {
  userProfile: UserProfileType;
  setUserProfilePositions: (
    positions: Array<{ id: number; name: string }>,
  ) => void;
  setUserProfileAreas: (areas: Array<AreaType>) => void;
}

const userProfileStore = create<UserProfileStoreType>((set) => ({
  userProfile: initialUserProfile,
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
}));

export default userProfileStore;
