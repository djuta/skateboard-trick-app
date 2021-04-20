import { useState, useEffect } from "react";
import LearnStatus from "../enums/LearnStatus";
import Trick from "../types/Trick";
import TrickCategory from "../types/TrickCategory";
import { fetchAllTricks } from "../repository/tricksRepository";
import LearnedTricks from "../types/LearnedTricks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LearnStatusFilters from "../types/LearnStatusFilters";

const storeLearnedTricks = async (learnedTricks: LearnedTricks) => {
    try {
        await AsyncStorage.setItem(
            "learnedTricks",
            JSON.stringify(learnedTricks)
        );
    } catch (e) {
        // do something
    }
};

const isTrickFiltered = (
    filters: LearnStatusFilters,
    learnedTricks: LearnedTricks,
    { id }: Trick
) => {
    const learnStatus = learnedTricks[id];
    return (
        (filters[LearnStatus.None] &&
            [LearnStatus.None, undefined].includes(learnStatus)) ||
        (filters[LearnStatus.Learning] &&
            learnStatus === LearnStatus.Learning) ||
        (filters[LearnStatus.Learned] && learnStatus === LearnStatus.Learned)
    );
};

export default () => {
    const [tricks, setTricks] = useState<TrickCategory[]>([]);
    const [learnedTricks, setLearnedTricks] = useState<LearnedTricks>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTricks, setFilteredTricks] = useState<TrickCategory[]>([]);
    const [filters, setFilters] = useState<LearnStatusFilters>({
        [LearnStatus.None]: false,
        [LearnStatus.Learning]: false,
        [LearnStatus.Learned]: false,
    });

    const setTrickStatus = (id: string, status: LearnStatus) => {
        setLearnedTricks((state) => ({ ...state, [id]: status }));
    };

    useEffect(() => {
        AsyncStorage.getItem("learnedTricks").then((savedTricks) =>
            setLearnedTricks(JSON.parse(savedTricks || "{}"))
        );
        fetchAllTricks().then(setTricks);
    }, []);

    useEffect(() => {
        storeLearnedTricks(learnedTricks);
    }, [learnedTricks]);

    useEffect(() => {
        const isFiltered = Object.values(filters).includes(true);
        const modTricks: TrickCategory[] = [];
        tricks.forEach((trickCategory) => {
            const filteredData =
                searchQuery || isFiltered
                    ? trickCategory.data.filter(
                          (trick) =>
                              trick.name
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase()) &&
                              (isFiltered
                                  ? isTrickFiltered(
                                        filters,
                                        learnedTricks,
                                        trick
                                    )
                                  : true)
                      )
                    : trickCategory.data;
            if (filteredData.length === 0) {
                return;
            }
            modTricks.push({ ...trickCategory, data: filteredData });
        });
        setFilteredTricks(modTricks);
    }, [tricks, searchQuery, filters]);

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
