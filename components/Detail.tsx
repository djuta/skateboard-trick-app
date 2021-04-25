import React, { useState } from "react";
import { StyleSheet, View, Text, GestureResponderEvent } from "react-native";
import { Button } from "react-native-elements";
import YouTube from "react-native-youtube";
import { COLOR, COMMON_STYLES, FONT_SIZE, SIZE } from "../constants/styles";
import LearnedTricks from "../types/LearnedTricks";
import TrickStatusButtonGroup from "./TrickStatusButtonGroup";

export default ({
    route,
    setTrickStatus,
    learnedTricks,
}: {
    route: any;
    setTrickStatus: Function;
    learnedTricks: LearnedTricks;
}) => {
    const { trick } = route.params;
    const { youtubeIds, name, description } = trick;
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const isFirstVideo = currentVideoIndex === 0;
    const isLastVideo = currentVideoIndex === youtubeIds.length - 1;

    const goToNextVideo = () => {
        setCurrentVideoIndex(
            isLastVideo ? currentVideoIndex : currentVideoIndex + 1
        );
    };

    const goToPreviousVideo = () => {
        setCurrentVideoIndex(
            isFirstVideo ? currentVideoIndex : currentVideoIndex - 1
        );
    };

    return (
        <View style={COMMON_STYLES.container}>
            <Text style={styles.title}>{name}</Text>
            <YouTube
                videoId={youtubeIds[currentVideoIndex]}
                style={{ alignSelf: "stretch", height: 300 }}
            />
            <View style={styles.buttonRow}>
                <View style={styles.buttons}>
                    <Button
                        buttonStyle={styles.button}
                        title="Previous"
                        disabled={isFirstVideo}
                        onPress={goToPreviousVideo}
                    />
                    <Button
                        title="Next"
                        disabled={isLastVideo}
                        onPress={goToNextVideo}
                    />
                </View>
                <TrickStatusButtonGroup
                    status={learnedTricks[trick.id]}
                    onSetStatus={setTrickStatus}
                    trick={trick}
                />
            </View>
            <Text>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingVertical: SIZE.SMALL,
        fontSize: FONT_SIZE.LARGE,
    },
    video: {
        alignSelf: "stretch",
        height: 300,
    },
    buttons: {
        paddingVertical: SIZE.SMALL,
        flexDirection: "row",
        fontSize: FONT_SIZE.MEDIUM,
    },
    buttonRow: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        marginRight: SIZE.SMALL,
    },
    description: {
        fontSize: FONT_SIZE.SMALL,
    },
});
