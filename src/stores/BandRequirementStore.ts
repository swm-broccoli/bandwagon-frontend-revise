import create from 'zustand';
import {devtools} from 'zustand/middleware';

interface bandRequirementStoreType {
  prequisiteList: number[],
}

export const useBandRequirementStore = create<bandRequirementStoreType>()(devtools((set) => ({
  prequisiteList: [0, 0, 0, 0, 0] // Area, Age, Gender, Position, Genre
})));