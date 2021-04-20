import React from "react";
import { SectionList, StyleSheet, Text } from "react-native";
import { COLOR, FONT_SIZE, SIZE } from "../constants/styles";
import LearnStatus from "../enums/LearnStatus";
import LearnedTricks from "../types/LearnedTricks";
import Trick from "../types/Trick";
import TrickCategory from "../types/TrickCategory";
import Item from "./Item";

export default ({
    tricks,
    navigation,
    setTrickStatus,
    learnedTricks,
}: {
    tricks: TrickCategory[];
    navigation: any;
    setTrickStatus: Function;
    learnedTricks: LearnedTricks;
}) => (
    <SectionList
        sections={tricks}
        keyExtractor={({ id }: { id: string }) => id}
        renderItem={({ item: trick }: { item: Trick }) => (
            <Item
                trick={trick}
                onPress={() => navigation.navigate("Detail", { trick })}
                onSetStatus={setTrickStatus}
                status={learnedTricks[trick.id] || LearnStatus.None}
            />
        )}
        renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
        )}
    />
);

const styles = StyleSheet.create({
    header: {
        fontSize: FONT_SIZE.LARGE,
        backgroundColor: COLOR.WHITE,
    },
});
