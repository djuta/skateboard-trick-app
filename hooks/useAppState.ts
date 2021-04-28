import { useState, useEffect, useCallback, useMemo } from "react";
import LearnStatus from "../enums/LearnStatus";
import Trick from "../types/Trick";
import TrickCategory from "../types/TrickCategory";
import { fetchAllTricks } from "../repository/tricksRepository";
import LearnStatusFilters from "../types/LearnStatusFilters";
import useLearnedTricksState from "./useLearnedTricksState";
import useSettingsState from "./useSettingsState";

export default () => {
    const [tricks, setTricks] = useState<TrickCategory[]>([]);
    const { learnedTricks, setTrickStatus } = useLearnedTricksState();
    const [searchQuery, setSearchQuery] = useState("");
    const { settings, updateSetting } = useSettingsState();

    const [filters, setFilters] = useState<LearnStatusFilters>({
        [LearnStatus.None]: false,
        [LearnStatus.Learning]: false,
        [LearnStatus.Learned]: false,
    });

    const isFiltered = Object.values(filters).includes(true);

    const isTrickMatch = useCallback(
        ({ name }: Trick) =>
            !searchQuery ||
            name.toLowerCase().includes(searchQuery.toLowerCase()),
        [searchQuery]
    );

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

    const updateFilter = (status: LearnStatus, value: boolean) => {
        setFilters((state) => ({ ...state, [status]: value }));
    };

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
    }, [tricks, searchQuery, isTrickMatch, isTrickFiltered]);

    useEffect(() => {
        fetchAllTricks().then(setTricks);
    }, []);

    return {
        learnedTricks,
        setTrickStatus,
        tricks: filteredTricks,
        updateFilter,
        filters,
        setSearchQuery,
        searchQuery,
        settings,
        updateSetting,
    };
};
