import React, {FC} from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import closeIcon from '../assets/close.png';
import {HIT_SLOP_10, hightStatusBar} from '../constants';
import {COLORS} from '../utils/constance';

type BottomModalProps = {
  visible?: boolean;
  onClose: () => void;
  children?: any;
  title: string;
};

const BottomModal: FC<BottomModalProps> = ({
  children,
  onClose,
  visible,
  title,
}) => {
  const modalTopPadding: number = //TODO: hook
    title === 'Filters'
      ? Platform.OS === 'ios'
        ? 210
        : 188
      : Platform.OS === 'ios'
      ? 90
      : 60;

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.container,
          {paddingTop: modalTopPadding + hightStatusBar},
        ]}>
        <View style={styles.modalContent}>
          <Text
            style={[
              styles.modalTitle,
              {marginTop: title === 'Filters' ? -20 : 0},
            ]}>
            {title}
          </Text>
          <TouchableOpacity
            hitSlop={HIT_SLOP_10}
            style={styles.closeButton}
            onPress={onClose}>
            <Image source={closeIcon} style={styles.image} />
          </TouchableOpacity>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  modalTitle: {
    color: COLORS.title,
    fontSize: 18,
    fontWeight: '400',
    margin: 26,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.bkg,
    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.text,
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default BottomModal;
