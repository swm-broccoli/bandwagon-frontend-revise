import create from 'zustand';
import {devtools} from 'zustand/middleware';
import { AreaType, SelectionType } from '../types/types';

interface searchPostStoreType {
  titleStore: string,
  minAgeStore: string,
  maxAgeStore: string,
  selectStore: string[],
  genreArray: SelectionType[],
  areaArray: AreaType[],
  clearStore: () => void,
  changeTitle: (title: string) => void,
  changeMinAge: (min: string) => void,
  changeMaxAge: (max: string) => void,
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
    titleStore: '',
    minAgeStore: '',
    maxAgeStore: '',
    selectStore: [],
    genreArray: [],
    areaArray: [],
    clearStore: () => {
      set((state) => ({
        titleStore: '',
        minAgeStore: '',
        maxAgeStore: '',
        selectStore: [],
        genreArray: [],
        areaArray: []
      }))
    },
    changeTitle: (title) => {
      if (title) {
        set((state) => ({titleStore: '&title=' + title}))
      } else {
        set((state) => ({titleStore: ''}))
      }
    },
    changeMinAge: (min) => {
      if (min) {
        set((state) => ({minAgeStore: '&minAge=' + min}))
      } else {
        set((state) => ({minAgeStore: ''}))
      }
    },
    changeMaxAge: (max) => {
      if (max) {
        set((state) => ({maxAgeStore: '&maxAge=' + max}))
      } else {
        set((state) => ({maxAgeStore: ''}))
      }
    },
    addSelectStore: (type, id) => {
      set((state) => ({
        selectStore: [...state.selectStore, '&' + type + '=' + id.toString()]}))
    },
    deleteSelectStore: (type, id) => {
      set((state) => ({
        selectStore: state.selectStore.filter(
          (todo) => todo !== '&' + type + '=' + id.toString())
      }))
    },
    addGender: (type, gender) => {
      set((state) => ({
        selectStore: [...state.selectStore, '&' + type + '=' + gender]}))
    },
    deleteGender: (type, gender) => {
      set((state) => ({
        selectStore: state.selectStore.filter(
          (todo) => todo !== '&' + type + '=' + gender)
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