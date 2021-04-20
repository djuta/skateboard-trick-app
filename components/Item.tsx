import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR, FONT_SIZE, SIZE } from "../constants/styles";
import LearnStatus from "../enums/LearnStatus";
import Props from "../types/Props";
import Trick from "../types/Trick";
import TrickStatusButton from "./TrickStatusButton";

export default ({
    trick,
    status,
    onPress,
    onSetStatus,
}: {
    trick: Trick;
    status: LearnStatus;
    onPress: Props["onPress"];
    onSetStatus: Function;
}) => {
    const isLearning = status === LearnStatus.Learning;
    const isComplete = status === LearnStatus.Learned;

    const onChangeStatus = (newStatus: LearnStatus) => {
        const nextStatus = newStatus === status ? LearnStatus.None : newStatus;
        onSetStatus(trick.id, nextStatus);
    };

    return (
        <View>
            <Text onPress={onPress} style={styles.item}>
                <View style={styles.itemContents}>
                    <Text>{trick.name}</Text>
                    <View style={styles.buttons}>
                        <TrickStatusButton
                            isActive={isLearning}
                            onChangeStatus={onChangeStatus}
                            status={LearnStatus.Learning}
                        />
                        <TrickStatusButton
                            isActive={isComplete}
                            onChangeStatus={onChangeStatus}
                            status={LearnStatus.Learned}
                        />
                    </View>
                </View>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        fontSize: FONT_SIZE.SMALL,
        backgroundColor: COLOR.WHITE,
        padding: SIZE.MEDIUM,
        marginVertical: SIZE.SMALL,
        borderColor: COLOR.GREY,
        borderWidth: 1,
        borderRadius: SIZE.SMALL,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    itemContents: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
    },
    buttons: {
        flexDirection: "row",
        textAlign: "right",
    },
});
