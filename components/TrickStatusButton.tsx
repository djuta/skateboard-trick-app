import React from "react";
import { Button, Icon } from "react-native-elements";
import {
    COLOR,
    SIZE,
    STATUS_COLOR_MAP,
    STATUS_ICON_MAP,
} from "../constants/styles";
import LearnStatus from "../enums/LearnStatus";

const createButtonStyleProps = (
    isActive: boolean,
    status: LearnStatus
): { buttonStyle: any; type: "solid" | "outline" } => {
    const color = STATUS_COLOR_MAP[status];
    const buttonStyle = {
        borderColor: color,
        backgroundColor: isActive ? color : "none",
        paddingVertical: SIZE.XSMALL,
        height: SIZE.LARGE,
        width: SIZE.LARGE,
        borderRadius: SIZE.LARGE,
        marginRight: status === LearnStatus.Learning ? SIZE.SMALL : 0,
    };
    const type = isActive ? "solid" : "outline";
    return { buttonStyle, type };
};

export default ({
    isActive,
    status,
    onChangeStatus,
}: {
    isActive: boolean;
    status: LearnStatus;
    onChangeStatus: Function;
}) => {
    const color = isActive ? COLOR.WHITE : STATUS_COLOR_MAP[status];
    const icon = STATUS_ICON_MAP[status];
    return (
        <Button
            onPress={() => onChangeStatus(status)}
            icon={<Icon name={icon} size={SIZE.MEDIUM} color={color} />}
            {...createButtonStyleProps(isActive, status)}
        />
    );
};
