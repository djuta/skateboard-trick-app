import { StyleSheet } from "react-native";
import LearnStatus from "../enums/LearnStatus";

export const SIZE = {
    XSMALL: 4,
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 32,
    XLARGE: 64,
};

export const FONT_SIZE = {
    XSMALL: 12,
    SMALL: 15,
    MEDIUM: 18,
    LARGE: 24,
    XLARGE: 32,
};

export const COLOR = {
    WHITE: "white",
    GREY: "#efefef",
    WARNING: "gold",
    SUCCESS: "green",
    DANGER: "red",
    INFO: "blue",
};

export const STATUS_COLOR_MAP = {
    [LearnStatus.None]: COLOR.WARNING,
    [LearnStatus.Learning]: COLOR.INFO,
    [LearnStatus.Learned]: COLOR.SUCCESS,
};

export const STATUS_ICON_MAP = {
    [LearnStatus.None]: "",
    [LearnStatus.Learning]: "star",
    [LearnStatus.Learned]: "check",
};

export const COMMON_STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        paddingHorizontal: SIZE.MEDIUM,
    },
});
