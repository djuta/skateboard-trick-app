import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default ({
    style,
    onValueChange,
}: {
    style: any;
    onValueChange: Function;
}) => {
    const [value, setValue] = useState("");

    useEffect(
        debounce(() => {
            onValueChange(value);
        }, 100),
        [value, onValueChange]
    );

    return (
        <TextInput
            onChangeText={setValue}
            value={value}
            placeholder="Search"
            style={style}
        />
    );
};
