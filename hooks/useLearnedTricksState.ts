import { useState, useEffect, useCallback } from "react";
import LearnStatus from "../enums/LearnStatus";
import LearnedTricks from "../types/LearnedTricks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LEARNED_TRICKS_STORAGE_KEY = "learnedTricks";

export default () => {
    const [learnedTricks, setLearnedTricks] = useState<LearnedTricks>({});
    const setTrickStatus = (id: string, status: LearnStatus) => {
        setLearnedTricks((state) => ({ ...state, [id]: status }));
    };

    const storeLearnedTricks = useCallback(async () => {
        try {
            await AsyncStorage.setItem(
                LEARNED_TRICKS_STORAGE_KEY,
                JSON.stringify(learnedTricks)
            );
        } catch (e) {
            // do something
        }
    }, [learnedTricks]);

    useEffect(() => {
        AsyncStorage.getItem(LEARNED_TRICKS_STORAGE_KEY).then((savedTricks) =>
            setLearnedTricks(JSON.parse(savedTricks || "{}"))
        );
    }, []);

    useEffect(() => {
        storeLearnedTricks();
    }, [storeLearnedTricks]);

    return {
        learnedTricks,
        setTrickStatus,
    };
};
