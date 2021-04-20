import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useAppState from "./hooks/useAppState";
import Home from "./components/Home";
import Detail from "./components/Detail";
import { DetailProps } from "./types/Stack";

const Stack = createStackNavigator();

export default () => {
    const {
        tricks,
        setTrickStatus,
        learnedTricks,
        setSearchQuery,
        updateFilter,
        filters,
    } = useAppState();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home">
                    {(props) => (
                        <Home
                            {...props}
                            tricks={tricks}
                            setTrickStatus={setTrickStatus}
                            setSearchQuery={setSearchQuery}
                            updateFilter={updateFilter}
                            filters={filters}
                            learnedTricks={learnedTricks}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={({ route }: any) => ({
                        title: route?.params?.trick.name,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
