import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import YouTube from "react-native-youtube";
import { COLOR, COMMON_STYLES, FONT_SIZE, SIZE } from "../constants/styles";
import { DetailProps } from "../types/Stack";

export default ({ route }: DetailProps) => {
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
    button: {
        marginRight: SIZE.SMALL,
    },
    description: {
        fontSize: FONT_SIZE.SMALL,
    },
});
