import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import LearnStatus from "../enums/LearnStatus";
import Trick from "../types/Trick";
import TrickStatusButton from "./TrickStatusButton";

export default ({
    trick,
    status = LearnStatus.None,
    onSetStatus,
}: {
    trick: Trick;
    status: LearnStatus;
    onSetStatus: Function;
}) => {
    const isLearning = status === LearnStatus.Learning;
    const isComplete = status === LearnStatus.Learned;

    const onChangeStatus = (
        newStatus: LearnStatus,
        e: GestureResponderEvent
    ) => {
        const nextStatus = newStatus === status ? LearnStatus.None : newStatus;
        onSetStatus(trick.id, nextStatus, e);
    };
    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});
