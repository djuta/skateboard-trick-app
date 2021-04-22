import { useState, useEffect, useCallback, useMemo } from "react";
import LearnStatus from "../enums/LearnStatus";
import Trick from "../types/Trick";
import TrickCategory from "../types/TrickCategory";
import { fetchAllTricks } from "../repository/tricksRepository";
import LearnedTricks from "../types/LearnedTricks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LearnStatusFilters from "../types/LearnStatusFilters";

const LEARNED_TRICKS_STORAGE_KEY = "learnedTricks";

export default () => {
    const [tricks, setTricks] = useState<TrickCategory[]>([]);
    const [learnedTricks, setLearnedTricks] = useState<LearnedTricks>({});
    const [searchQuery, setSearchQuery] = useState("");

    const [filters, setFilters] = useState<LearnStatusFilters>({
        [LearnStatus.None]: false,
        [LearnStatus.Learning]: false,
        [LearnStatus.Learned]: false,
    });

    const isFiltered = Object.values(filters).includes(true);

    const setTrickStatus = (id: string, status: LearnStatus) => {
        setLearnedTricks((state) => ({ ...state, [id]: status }));
    };

    const isTrickFiltered = useCallback(
        ({ id }: Trick) => {
            const learnStatus = learnedTricks[id];
            return (
                !isFiltered ||
                (filters[LearnStatus.None] &&
                    [LearnStatus.None, undefined].includes(learnStatus)) ||
                (filters[LearnStatus.Learning] &&
                    learnStatus === LearnStatus.Learning) ||
                (filters[LearnStatus.Learned] &&
                    learnStatus === LearnStatus.Learned)
            );
        },
        [filters, learnedTricks]
    );

    const isTrickMatch = useCallback(
        ({ name }: Trick) =>
            !searchQuery ||
            name.toLowerCase().includes(searchQuery.toLowerCase()),
        [searchQuery]
    );

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

    const filteredTricks = useMemo(() => {
        if (!isFiltered && !searchQuery) {
            return tricks;
        }
        return tricks.reduce(
            (allTricks: TrickCategory[], trickCategory: TrickCategory) => {
                const filteredData = trickCategory.data.filter(
                    (trick) => isTrickMatch(trick) && isTrickFiltered(trick)
                );
                if (filteredData.length > 0) {
                    allTricks.push({
                        ...trickCategory,
                        data: filteredData,
                    });
                }
                return allTricks;
            },
            []
        );
    }, [tricks, searchQuery, tricks, isTrickMatch, isTrickFiltered]);

    useEffect(() => {
        AsyncStorage.getItem(LEARNED_TRICKS_STORAGE_KEY).then((savedTricks) =>
            setLearnedTricks(JSON.parse(savedTricks || "{}"))
        );
        fetchAllTricks().then(setTricks);
    }, []);

    useEffect(() => {
        storeLearnedTricks();
    }, [learnedTricks]);

    const updateFilter = (status: LearnStatus, value: boolean) => {
        setFilters((state) => ({ ...state, [status]: value }));
    };

    return {
        learnedTricks,
        setTrickStatus,
        tricks: filteredTricks,
        updateFilter,
        filters,
        setSearchQuery,
        searchQuery,
    };
};
