import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, COMMON_STYLES, FONT_SIZE, SIZE } from "../constants/styles";
import LearnedTricks from "../types/LearnedTricks";
import LearnStatusFilters from "../types/LearnStatusFilters";
import TrickCategory from "../types/TrickCategory";
import DebouncedInput from "./DebouncedInput";
import Filters from "./Filters";
import NoResults from "./NoResults";
import TrickList from "./TrickList";

export default ({
    tricks,
    navigation,
    setTrickStatus,
    learnedTricks,
    setSearchQuery,
    filters,
    updateFilter,
}: {
    tricks: TrickCategory[];
    navigation: any;
    setTrickStatus: Function;
    learnedTricks: LearnedTricks;
    setSearchQuery: (text: string) => void;
    filters: LearnStatusFilters;
    updateFilter: Function;
}) => (
    <SafeAreaView style={COMMON_STYLES.container}>
        <DebouncedInput onValueChange={setSearchQuery} style={styles.input} />
        <Filters filters={filters} updateFilter={updateFilter} />
        {tricks.length === 0 && <NoResults />}
        <TrickList
            tricks={tricks}
            navigation={navigation}
            setTrickStatus={setTrickStatus}
            learnedTricks={learnedTricks}
        />
    </SafeAreaView>
);

const styles = StyleSheet.create({
    input: {
        marginVertical: SIZE.SMALL,
        borderColor: COLOR.GREY,
        padding: SIZE.SMALL,
        borderWidth: 1,
        fontSize: FONT_SIZE.SMALL,
    },
    filters: {
        flexDirection: "row",
    },
});
