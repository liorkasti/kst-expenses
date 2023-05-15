import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('@user', value)
    } catch (e) {
      // saving error
    }console.log('Done.')
  }

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }console.log('Done.')
  }