import create from 'zustand';
import { BandProfileType } from '../../types/types';
import { vacantBandProfile } from '../BandProfile/initialBandProfile';

interface PortfolioStoreType {
  bandPortfolio: BandProfileType;
  setBandPortfolio: (portfolio: BandProfileType) => void;
}

const usePortfolioStore = create<PortfolioStoreType>((set) => ({
  bandPortfolio: vacantBandProfile,
  setBandPortfolio: (newPortfolio: BandProfileType) =>
    set((state) => ({ ...state, bandPortfolio: newPortfolio })),
}));

export default usePortfolioStore;
