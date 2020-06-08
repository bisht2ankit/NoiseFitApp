import { StyleSheet } from "react-native";
import { fontSize } from "../constants/fontSize";

export const styles = StyleSheet.create({
    bigTxt: {
        fontSize: fontSize.bigTitle,
        color: 'white'
    },
    regularTxt: {
        fontSize: fontSize.title,
        color: 'white'
    }
})