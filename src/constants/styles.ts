import {StyleSheet} from 'react-native';
import COLORS from './colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.thirdary,
    color: COLORS.thirdary,
    borderRadius: 3,
    paddingTop: 28,
    paddingBottom: 9,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
  },
});
