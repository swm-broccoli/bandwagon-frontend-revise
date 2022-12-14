import create from 'zustand';
import {devtools} from 'zustand/middleware';
import { AreaType, SelectionType } from '../types/types';

interface searchPostStoreType {
  pageStore: string,
  titleStore: string,
  minAgeStore: string,
  maxAgeStore: string,
  anyPositionStore: boolean,
  anyGenreStore: boolean,
  anyAreaStore: boolean,
  selectStore: {type: string, id: string}[],
  genreArray: SelectionType[],
  areaArray: AreaType[],
  clearStore: () => void,
  changePage: (page: number) => void,
  changeTitle: (title: string) => void,
  changeMinAge: (min: string) => void,
  changeMaxAge: (max: string) => void,
  changeAnyStore: (type: string) => void,
  addSelectStore: (type: string, id: number) => void,
  deleteSelectStore: (type: string, id: number) => void,
  addGender: (type: string, gender: string) => void,
  deleteGender: (type: string, gender: string) => void,
  addGenre: (element: SelectionType) => void,
  deleteGenre: (id: number) => void,
  addArea: (element: AreaType) => void,
  deleteArea: (id: number) => void,
}

export const useSearchPostStore = create<searchPostStoreType>()(
  devtools((set) => ({
    pageStore: '0',
    titleStore: '',
    minAgeStore: '',
    maxAgeStore: '',
    anyPositionStore: false,
    anyGenreStore: false,
    anyAreaStore: false,
    selectStore: [],
    genreArray: [],
    areaArray: [],
    clearStore: () => {
      set((state) => ({
        pageStore: '0',
        titleStore: '',
        minAgeStore: '',
        maxAgeStore: '',
        anyPositionStore: false,
        anyGenreStore: false,
        anyAreaStore: false,
        selectStore: [],
        genreArray: [],
        areaArray: []
      }))
    },
    changePage: (page) => {
      set((state) => ({pageStore: page.toString()}))
    },
    changeTitle: (title) => {
      if (title) {
        set((state) => ({titleStore: title}))
      } else {
        set((state) => ({titleStore: ''}))
      }
    },
    changeMinAge: (min) => {
      if (min) {
        set((state) => ({minAgeStore: min}))
      } else {
        set((state) => ({minAgeStore: ''}))
      }
    },
    changeMaxAge: (max) => {
      if (max) {
        set((state) => ({maxAgeStore: max}))
      } else {
        set((state) => ({maxAgeStore: ''}))
      }
    },
    changeAnyStore: (type) => {
      console.log(type);
      switch (type) {
        case 'session':
          set((state) => ({
            anyPositionStore: !state.anyPositionStore
          }))
          break;
        case 'genre':
          set((state) => ({
            anyGenreStore: !state.anyGenreStore
          }))
          break;
        case 'area':
          set((state) => ({
            anyAreaStore: !state.anyAreaStore
          }))
          break;
      }
    },
    addSelectStore: (type, id) => {
      set((state) => ({
        selectStore: [...state.selectStore, {type: type, id: id.toString()}]}))
    },
    deleteSelectStore: (type, id) => {
      set((state) => ({
        selectStore: state.selectStore.filter(
          (element) => element.type !== type || element.id !== id.toString())
      }))
    },
    addGender: (type, gender) => {
      set((state) => ({
        selectStore: [...state.selectStore, {type: type, id: gender}]}))
    },
    deleteGender: (type, gender) => {
      set((state) => ({
        selectStore: state.selectStore.filter(
          (element) => element.type !== type || element.id !== gender)
      }))
    },
    addGenre: (element) => {
      set((state) => ({genreArray: [...state.genreArray, element]}))
    },
    deleteGenre: (id) => {
      set((state) => ({
        genreArray: state.genreArray.filter((genre) => genre.id !== id)}))
    },
    addArea: (element) => {
      set((state) => ({areaArray: [...state.areaArray, element]}))
    },
    deleteArea: (id) => {
      set((state) => ({
        areaArray: state.areaArray.filter((area) => area.id !== id)}))
    }
})));