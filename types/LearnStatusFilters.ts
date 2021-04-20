import LearnStatus from "../enums/LearnStatus";

type LearnStatusFilters = {
    [key in LearnStatus]: boolean;
};

export default LearnStatusFilters;
