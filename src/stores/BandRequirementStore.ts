import React from 'react';
import create from 'zustand';
import {devtools} from 'zustand/middleware';
import { PrequisiteElementType, PrequisiteRequestType, PrequisiteResponseType } from '../types/types';

interface bandRequirementStoreType {
  currentId: number,
  preqId: {
    age: number,
    area: number,
    gender: number,
    genre: number,
    position: number},
  prequisiteList: {id: number, type: string}[],
  prequisiteRequest: PrequisiteRequestType | undefined,
  dtypeRequest: '',
  minStore: number | null,
  maxStore: number | null,
  genderStore: boolean | null,
  areaStore: PrequisiteElementType[],
  genreStore: PrequisiteElementType[],
  positionStore: PrequisiteElementType[],
  setPreqId: (type: string, id: number) => void,
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
  preqId: {age: 0, area: 0, gender: 0, genre: 0, position: 0},
  prequisiteList: [],
  prequisiteRequest: undefined,
  dtypeRequest: '',
  minStore: 0,
  maxStore: 0,
  genderStore: null,
  areaStore: [],
  genreStore: [],
  positionStore: [],
  setPreqId: (type, id) => {
    switch (type) {
      case 'Age': {
        set((state) => ({
          preqId: {
            age: id,
            area: state.preqId.area,
            gender: state.preqId.gender,
            genre: state.preqId.genre,
            position: state.preqId.position,
          }
        }))
        break;
      }
      case 'Area': {
        set((state) => ({
          preqId: {
            age: state.preqId.age,
            area: id,
            gender: state.preqId.gender,
            genre: state.preqId.genre,
            position: state.preqId.position,
          }
        }))
        break;
      }
      case 'Gender': {
        set((state) => ({
          preqId: {
            age: state.preqId.age,
            area: state.preqId.area,
            gender: id,
            genre: state.preqId.genre,
            position: state.preqId.position,
          }
        }))
        break;
      }
      case 'Genre': {
        set((state) => ({
          preqId: {
            age: state.preqId.age,
            area: state.preqId.area,
            gender: state.preqId.gender,
            genre: id,
            position: state.preqId.position,
          }
        }))
        break;
      }
      case 'Position': {
        set((state) => ({
          preqId: {
            age: state.preqId.age,
            area: state.preqId.area,
            gender: state.preqId.gender,
            genre: state.preqId.genre,
            position: id,
          }
        }))
        break;
      }
      default:
    }
  },
  clearStore: () => {
    console.log('clear');
    set((state) => ({
      currentId: 0,
      preqId: {age: 0, area: 0, gender: 0, genre: 0, position: 0},
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
              type: '??????'
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
                type: '??????'
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
              type: '??????'
            }],
            genderStore: preq.gender}));
          break;
        }
        case 'Genre': {
          preq.genres.map((genre) => {
            set((state) => ({
              prequisiteList: [...state.prequisiteList, {
                id: state.currentId,
                type: '??????'
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
                type: '??????'
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
              id: areaId,
            };
          }
          return area;
        }),
      }));
    },
    changeGenre: (preqId, genreId) => {
      set((state) => ({
        genreStore: state.genreStore.map((genre) => {
          if (genre.preqId === preqId) {
            return {
              ...genre,
              id: genreId,
            };
          }
          return genre;
        }),
      }));
    },
    changePosition: (preqId, positonId) => {
      set((state) => ({
        positionStore: state.positionStore.map((position) => {
          if (position.preqId === preqId) {
            return {
              ...position,
              id: positonId,
            };
          }
          return position;
        }),
      }));
    },
    addPrequisite: (preqId, type) => {
      set((state) => ({
        prequisiteList: [
          ...state.prequisiteList,
          {
            id: preqId,
            type: type,
          },
        ],
        currentId: state.currentId + 1,
      }));

      switch (type) {
        case '??????': {
          console.log(type, '??????');
          set((state) => ({
            positionStore: [...state.positionStore, { preqId: preqId, id: 0 }],
          }));
          break;
        }
        case '??????': {
          console.log(type, '??????');
          set((state) => ({
            minStore: 1,
            maxStore: 1,
          }));
          break;
        }
        case '??????': {
          console.log(type, '??????');
          set((state) => ({
            genderStore: true,
          }));
          break;
        }
        case '??????': {
          console.log(type, '??????');
          set((state) => ({
            areaStore: [...state.areaStore, { preqId: preqId, id: 0 }],
          }));
          break;
        }
        case '??????': {
          console.log(type, '??????');
          set((state) => ({
            genreStore: [...state.genreStore, { preqId: preqId, id: 0 }],
          }));
        }
        default:
      }
    },
    deletePrequisite: (preqId: number, type: string) => {
      switch (type) {
        case '??????': {
          set((state) => ({
            positionStore: state.positionStore.filter(
              (preq) => preq.id !== preqId,
            ),
          }));
          break;
        }
        case '??????': {
          set((state) => ({
            minStore: null,
            maxStore: null,
          }));
          break;
        }
        case '??????': {
          set((state) => ({
            genderStore: null,
          }));
          break;
        }
        case '??????': {
          set((state) => ({
            areaStore: state.areaStore.filter((preq) => preq.id !== preqId),
          }));
          break;
        }
        case '??????':
          set((state) => ({
            genreStore: state.genreStore.filter((preq) => preq.id !== preqId),
          }));
          break;
        default:
      }

      set((state) => ({
        prequisiteList: state.prequisiteList.filter(
          (preq) => preq.id !== preqId,
        ),
      }));
    },
  })),
);
