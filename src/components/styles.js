import {StyleSheet} from 'react-native';
import { fontSize } from '../constants/fontSize';
import { colors } from '../constants/colors';

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingBottom: 20
    },
    childContainer: {
        marginHorizontal: 32,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20
    },
    centerText: {
        color: colors.APP_BLACK_THEME,
        fontSize: fontSize.subtitle,
        textAlign: 'center'
    }
})