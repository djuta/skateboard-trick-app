import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default ({
    style,
    onValueChange,
}: {
    style: any;
    onValueChange: Function;
}) => {
    const [value, setValue] = useState("");

    const debouncedHandler = useCallback(
        debounce((value) => onValueChange(value), 250),
        [onValueChange]
    );

    useEffect(() => debouncedHandler(value), [value, debouncedHandler]);

    return (
        <TextInput
            onChangeText={setValue}
            value={value}
            placeholder="Search"
            style={style}
        />
    );
};
