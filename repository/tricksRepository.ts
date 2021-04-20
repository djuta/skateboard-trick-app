import TrickCategory from "../types/TrickCategory";

export const fetchAllTricks = async (): Promise<TrickCategory[]> => {
    const res = await fetch(
        "https://raw.githubusercontent.com/djuta/skateboard-trick-aggregator/master/data/tricks.json"
    );
    return res.json();
};
