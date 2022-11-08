import create from 'zustand';
import { BandProfileType, UserProfileType } from '../types/types';

export const vacantBandProfile: BandProfileType = {
  id: -1,
  avatarUrl: '',
  name: '',
  bandMembers: [],
  areas: [],
  genres: [],
  days: [],
  description: '',
  bandPractices: [],
  bandGigs: [],
  bandPhotos: [],
  isReaderFrontman: false,
};

export const vacantUserProfile: UserProfileType = {
  id: -1,
  avatarUrl: '',
  name: '',
  birthday: '2000-01-01',
  gender: false,
  positions: [],
  areas: [],
  genres: [],
  description: '',
  userPerformances: [],
};

interface PortfolioStoreType {
  bandPortfolio: BandProfileType;
  setBandPortfolio: (portfolio: BandProfileType) => void;
  userPortfolio: UserProfileType;
  setUserPortfolio: (portfolio: UserProfileType) => void;
}

const usePortfolioStore = create<PortfolioStoreType>((set) => ({
  bandPortfolio: vacantBandProfile,
  setBandPortfolio: (newPortfolio: BandProfileType) =>
    set((state) => ({ ...state, bandPortfolio: newPortfolio })),
  userPortfolio: vacantUserProfile,
  setUserPortfolio: (newPortfolio: UserProfileType) =>
    set((state) => ({ ...state, userPortfolio: newPortfolio })),
}));

export default usePortfolioStore;
