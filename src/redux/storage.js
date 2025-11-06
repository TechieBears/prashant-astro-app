import { MMKV } from 'react-native-mmkv';

let storage;
try {
  storage = new MMKV();
} catch (error) {
  console.warn('MMKV not available, using fallback storage');
  storage = null;
}

const fallbackStorage = {
  data: {},
  setItem: (key, value) => {
    this.data[key] = value;
    return Promise.resolve(true);
  },
  getItem: (key) => {
    return Promise.resolve(this.data[key] || null);
  },
  removeItem: (key) => {
    delete this.data[key];
    return Promise.resolve();
  },
};

export const mmkvStorage = {
  setItem: (key, value) => {
    if (storage) {
      storage.set(key, value);
    } else {
      fallbackStorage.data[key] = value;
    }
    return Promise.resolve(true);
  },
  getItem: (key) => {
    if (storage) {
      const value = storage.getString(key);
      return Promise.resolve(value);
    } else {
      return Promise.resolve(fallbackStorage.data[key] || null);
    }
  },
  removeItem: (key) => {
    if (storage) {
      storage.delete(key);
    } else {
      delete fallbackStorage.data[key];
    }
    return Promise.resolve();
  },
};

export default mmkvStorage;