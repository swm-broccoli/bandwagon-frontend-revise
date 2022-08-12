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
  areaStore: PrequisiteElementType[],
  genreStore: PrequisiteElementType[],
  positionStore: PrequisiteElementType[],
  changeAge: (min: number, max: number) => void,
  changeGender: (gender: boolean) => void,
  changeArea: (preqId: number, areaId: number) => void,
  changeGenre: (preqId: number, genreId: number) => void,
  changePosition: (preqId: number, positonId: number) => void,
  addPrequisite: (preqId: number, type: string) => void,
  deletePrequisite: (preqId: number, type: string) => void,
}

export const useBandRequirementStore = create<bandRequirementStoreType>()(devtools((set) => ({
  currentId: 0,
  prequisiteList: [],
  prequisiteCount: [0, 0, 0, 0, 0], // Area, Age, Gender, Position, Genre
  minStore: 0,
  maxStore: 0,
  genderStore: null,
  areaStore: [],
  genreStore: [],
  positionStore: [],
  changeAge: (min, max) => {
    set((state) => ({
      minStore: min,
      maxStore: max
    }));
  },
  changeGender: (gender) => {
    set((state) => ({
      genderStore: gender
    }));
  },
  changeArea: (preqId, areaId) => {
    set((state) => ({
      areaStore: state.areaStore.map((area) => {
          if (area.preqId === preqId) {
            return {
              ...area,
              id: areaId
            };
          }
          return area;
        })
    }));
  },
  changeGenre: (preqId, genreId) => {
    set((state) => ({
      genreStore: state.areaStore.map((genre) => {
          if (genre.preqId === preqId) {
            return {
              ...genre,
              id: genreId
            };
          }
          return genre;
        })
    }));
  },
  changePosition: (preqId, positonId) => {
    set((state) => ({
      positionStore: state.positionStore.map((position) => {
          if (position.preqId === preqId) {
            return {
              ...position,
              id: positonId
            };
          }
          return position;
        })
    }));
  },
  addPrequisite: (preqId, type) => {
    switch (type) {
      case '세션': {
        set((state) => ({
          positionStore: [...state.positionStore, {preqId: preqId, id: 0}]
        }));
        break;
      }
      case '나이': {
        set((state) => ({
          minStore: 1,
          maxStore: 1
        }));
        break;
      }
      case '성별': {
        set((state) => ({
          genderStore: true
        }));
        break;
      }
      case '지역': {
        set((state) => ({
          areaStore: [...state.areaStore, {preqId: preqId, id: 0}]
        }));
        break;
      }
      case '장르':
        set((state) => ({
          genreStore: [...state.genreStore, {preqId: preqId, id: 0}]
        }));
        break;
      default:
    }

    set((state) => ({
      prequisiteList: [...state.prequisiteList, {
        id: preqId,
        type: type}],
      currentId: state.currentId + 1}));
  },
  deletePrequisite: (preqId: number, type: string) => {
    switch (type) {
      case '세션': {
        set((state) => ({
          positionStore: state.positionStore.filter(
            (preq) => preq.id !== preqId)
        }));
        break;
      }
      case '나이': {
        set((state) => ({
          minStore: null,
          maxStore: null
        }));
        break;
      }
      case '성별': {
        set((state) => ({
          genderStore: null
        }));
        break;
      }
      case '지역': {
        set((state) => ({
          areaStore: state.areaStore.filter(
            (preq) => preq.id !== preqId)
        }));
        break;
      }
      case '장르':
        set((state) => ({
          genreStore: state.genreStore.filter(
            (preq) => preq.id !== preqId)
        }));
        break;
      default:
    }

    set((state) => ({
      prequisiteList: state.prequisiteList.filter(
        (preq) => preq.id !== preqId)
    }));
  }
})));