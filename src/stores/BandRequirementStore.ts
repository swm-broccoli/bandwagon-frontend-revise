import React from 'react';
import create from 'zustand';
import {devtools} from 'zustand/middleware';
import { PrequisiteElementType } from '../types/types';

interface bandRequirementStoreType {
  currentId: number,
  prequisiteList: {id: number, type: string}[],
  prequisiteCount: number[],
  minStore: number | null,
  maxStore: number | null,
  genderStore: boolean | null,
  areaStore: PrequisiteElementType[] | null,
  genreStore: PrequisiteElementType[] | null,
  positionStore: PrequisiteElementType[] | null,
  addPrequisite: (preqId: number, type: string) => void,
  deletePrequisite: (preqId: number, type: string) => void,
}

export const useBandRequirementStore = create<bandRequirementStoreType>()(devtools((set) => ({
  currentId: 0,
  prequisiteList: [],
  prequisiteCount: [0, 0, 0, 0, 0], // Area, Age, Gender, Position, Genre
  minStore: null,
  maxStore: null,
  genderStore: null,
  areaStore: null,
  genreStore: null,
  positionStore: null,
  addPrequisite: (preqId, type) => {
    if (type == '나이') {
      set((state) => ({
        minStore: 1,
        maxStore: 1
      }))
    } else if (type == '성별') {
      set((state) => ({
        genderStore: true
      }))
    }

    set((state) => ({
      prequisiteList: [...state.prequisiteList, {
        id: preqId,
        type: type}],
      currentId: state.currentId + 1}));
  },
  deletePrequisite: (preqId: number, type: string) => {
    if (type == '나이') {
      set((state) => ({
        minStore: null,
        maxStore: null
      }))
    } else if (type == '성별') {
      set((state) => ({
        genderStore: null
      }))
    }

    set((state) => ({
      prequisiteList: state.prequisiteList.filter(
        (preq) => preq.id !== preqId)
    }))
  }
})));