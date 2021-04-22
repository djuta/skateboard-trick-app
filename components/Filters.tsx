import React from "react";
import { StyleSheet, View } from "react-native";
import {
    COLOR,
    FONT_SIZE,
    SIZE,
    STATUS_COLOR_MAP,
    STATUS_ICON_MAP,
} from "../constants/styles";
import { Button, Icon } from "react-native-elements";
import LearnStatus from "../enums/LearnStatus";
import LearnStatusFilters from "../types/LearnStatusFilters";

const createButtonStyleProps = (
    filters: LearnStatusFilters,
    status: LearnStatus
): {
    buttonStyle: any;
    titleStyle: any;
    type: "solid" | "outline";
    icon?: JSX.Element;
} => {
    const color = STATUS_COLOR_MAP[status];
    const statusIcon = STATUS_ICON_MAP[status];
    const isActive = filters[status];
    const buttonStyle = {
        borderColor: color,
        backgroundColor: isActive ? color : "none",
        paddingVertical: SIZE.XSMALL,
        borderRadius: SIZE.MEDIUM,
        marginRight: SIZE.SMALL,
    };
    const titleStyle = {
        color: isActive ? COLOR.WHITE : color,
        fontSize: FONT_SIZE.XSMALL,
    };
    const type = isActive ? "solid" : "outline";
    const icon = statusIcon ? (
        <Icon
            name={statusIcon}
            color={isActive || !color ? COLOR.WHITE : color}
            size={FONT_SIZE.SMALL}
            style={styles.icon}
        />
    ) : undefined;
    return { buttonStyle, titleStyle, type, icon };
};

export default ({
    filters,
    updateFilter,
}: {
    filters: LearnStatusFilters;
    updateFilter: Function;
}) => {
    const onUpdateFilter = (status: LearnStatus) =>
        updateFilter(status, !filters[status]);

    return (
        <View style={styles.filters}>
            <Button
                title="Not Learned"
                onPress={() => onUpdateFilter(LearnStatus.None)}
                {...createButtonStyleProps(filters, LearnStatus.None)}
            />
            <Button
                title="Learning"
                onPress={() => onUpdateFilter(LearnStatus.Learning)}
                {...createButtonStyleProps(filters, LearnStatus.Learning)}
            />
            <Button
                title="Learned"
                onPress={() => onUpdateFilter(LearnStatus.Learned)}
                {...createButtonStyleProps(filters, LearnStatus.Learned)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filters: {
        marginTop: SIZE.XSMALL,
        marginBottom: SIZE.SMALL,
        flexDirection: "row",
    },
    icon: {
        marginRight: SIZE.XSMALL,
    },
});
