import create from 'zustand';
import initialUserProfile from './initialUserProfile';
import { UserProfileType, UserProfileChangeTraceType } from '../../types/types';

interface UserProfileStoreType {
  userProfile: UserProfileType;
  setUserProfilePositions: (
    positions: Array<{ id: number; name: string }>,
  ) => void;
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
}));

export default userProfileStore;
