import create from 'zustand';
import { BandProfileType, UserProfileType } from '../../types/types';
import { vacantBandProfile } from '../BandProfile/initialBandProfile';
import { vacantUserProfile } from '../UserProfile/initialUserProfile';

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
