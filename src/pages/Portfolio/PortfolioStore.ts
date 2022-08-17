import create from 'zustand';
import { BandProfileType } from '../../types/types';
import { vacantBandProfile } from '../BandProfile/initialBandProfile';

interface PortfolioStoreType {
  portfolio: BandProfileType;
  setPortfolio: (portfolio: BandProfileType) => void;
}

const usePortfolioStore = create<PortfolioStoreType>((set) => ({
  portfolio: vacantBandProfile,
  setPortfolio: (newPortfolio: BandProfileType) =>
    set((state) => ({ ...state, portfolio: newPortfolio })),
}));

export default usePortfolioStore;
