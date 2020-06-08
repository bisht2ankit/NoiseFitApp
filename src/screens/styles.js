import { StyleSheet } from "react-native";
import { fontSize } from "../constants/fontSize";

export const styles = StyleSheet.create({
    bigTxt: {
        fontSize: fontSize.bigTitle,
        color: 'white',
        textAlign: 'center'
    },
    regularTxt: {
        fontSize: fontSize.title,
        color: 'white',
        textAlign: 'center'
    },
    txt: {
        fontSize: fontSize.title,
        color: 'white',
        marginBottom: 5
    },
    icon: {
        width: 18,
        height: 18,
        marginLeft: 10,
        marginTop: 10
    },
    dateView: {
        alignSelf: 'center',
        marginBottom: 10
    }
})