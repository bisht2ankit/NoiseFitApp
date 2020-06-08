import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import { constants } from '../constants/strings';

export const InfoModal = (props) => {
    const { visible, closeModal } = props;
    return (
        <Modal animationType="fade"
            visible={visible}
            transparent={true}
        >
            <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={closeModal}>
                <View style={styles.childContainer}>
                    <Text style={styles.centerText}>{constants.modal.pointsInfo}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

InfoModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
}