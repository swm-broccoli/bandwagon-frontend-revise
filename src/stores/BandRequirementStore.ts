import React from 'react';
import create from 'zustand';
import {devtools} from 'zustand/middleware';
import { PrequisiteElementType, PrequisiteRequestType, PrequisiteResponseType } from '../types/types';

interface bandRequirementStoreType {
  currentId: number,
  prequisiteList: {id: number, type: string}[],
  prequisiteRequest: PrequisiteRequestType | undefined,
  dtypeRequest: '',
  minStore: number | null,
  maxStore: number | null,
  genderStore: boolean | null,
  areaStore: PrequisiteElementType[],
  genreStore: PrequisiteElementType[],
  positionStore: PrequisiteElementType[],
  clearStore: () => void,
  setPrequisites: (
    preqList: PrequisiteResponseType[]) => void,
  changeAge: (min: number | null, max: number | null) => void,
  changeGender: (gender: boolean | null) => void,
  changeArea: (preqId: number, areaId: number) => void,
  changeGenre: (preqId: number, genreId: number) => void,
  changePosition: (preqId: number, positonId: number) => void,
  addPrequisite: (preqId: number, type: string) => void,
  deletePrequisite: (preqId: number, type: string) => void,
}

export const useBandRequirementStore = create<bandRequirementStoreType>()(devtools((set) => ({
  currentId: 0,
  prequisiteList: [],
  prequisiteRequest: undefined,
  dtypeRequest: '',
  minStore: 0,
  maxStore: 0,
  genderStore: null,
  areaStore: [],
  genreStore: [],
  positionStore: [],
  clearStore: () => {
    set((state) => ({
      currentId: 0,
      prequisiteList: [],
      prequisiteRequest: undefined,
      dtypeRequest: '',
      minStore: 0,
      maxStore: 0,
      genderStore: null,
      areaStore: [],
      genreStore: [],
      positionStore: [],
    }))
  },
  setPrequisites: (preqList) => {
    preqList.map((preq: PrequisiteResponseType) => {
      switch(preq.dtype) {
        case 'Age': {
          set((state) => ({
            prequisiteList: [...state.prequisiteList, {
              id: state.currentId,
              type: '나이'
            }],
            minStore: preq.min,
            maxStore: preq.max}));
          break;
        }
        case 'Area': {
          preq.areas.map((area) => {
            set((state) => ({
              prequisiteList: [...state.prequisiteList, {
                id: state.currentId,
                type: '지역'
              }],
              areaStore: [...state.areaStore, {
                preqId: state.currentId,
                id: area.id
              }]
            }));
          })
          break;
        }
        case 'Gender': {
          set((state) => ({
            prequisiteList: [...state.prequisiteList, {
              id: state.currentId,
              type: '성별'
            }],
            genderStore: preq.gender}));
          break;
        }
        case 'Genre': {
          preq.genres.map((genre) => {
            set((state) => ({
              prequisiteList: [...state.prequisiteList, {
                id: state.currentId,
                type: '장르'
              }],
              genreStore: [...state.genreStore, {
                preqId: state.currentId,
                id: genre.id
              }]
            }));
          })
          break;
        }
        case 'Position': {
          preq.positions.map((position) => {
            set((state) => ({
              prequisiteList: [...state.prequisiteList, {
                id: state.currentId,
                type: '세션'
              }],
              positionStore: [...state.positionStore, {
                preqId: state.currentId,
                id: position.id
              }]
            }));
          })
          break;
        }
        default: {}
      }
      set((state) => ({currentId: state.currentId + 1}))
    })
  },
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
      genreStore: state.genreStore.map((genre) => {
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
    set((state) => ({
      prequisiteList: [...state.prequisiteList, {
        id: preqId,
        type: type}],
      currentId: state.currentId + 1}));

    switch (type) {
      case '세션': {
        console.log(type, '추가');
        set((state) => ({
          positionStore: [...state.positionStore, {preqId: preqId, id: 0}]
        }));
        break;
      }
      case '나이': {
        console.log(type, '추가');
        set((state) => ({
          minStore: 1,
          maxStore: 1
        }));
        break;
      }
      case '성별': {
        console.log(type, '추가');
        set((state) => ({
          genderStore: true
        }));
        break;
      }
      case '지역': {
        console.log(type, '추가');
        set((state) => ({
          areaStore: [...state.areaStore, {preqId: preqId, id: 0}]
        }));
        break;
      }
      case '장르': {
        console.log(type, '추가');
        set((state) => ({
          genreStore: [...state.genreStore, {preqId: preqId, id: 0}]
        }));
      }
      default:
      }
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