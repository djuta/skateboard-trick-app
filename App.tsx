import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ConfettiCannon, { ExplosionState } from "react-native-confetti-cannon";
import useAppState from "./hooks/useAppState";
import Home from "./components/Home";
import Detail from "./components/Detail";
import LearnStatus from "./enums/LearnStatus";
import { GestureResponderEvent } from "react-native";

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

    const explosion = useRef<any>();
    const [explosionOrigin, setExplosionOrigin] = useState({ x: -1, y: -1 });

    const setTrickStatusWithCelebration = (
        id: string,
        status: LearnStatus,
        e: GestureResponderEvent
    ) => {
        setTrickStatus(id, status);
        if (status === LearnStatus.Learned) {
            setExplosionOrigin({
                x: e?.nativeEvent?.pageX,
                y: e?.nativeEvent?.pageY,
            });
        }
    };

    useEffect(() => {
        const { x, y } = explosionOrigin;
        if (x >= 0 && y >= 0) {
            explosion?.current.start();
        }
    }, [explosionOrigin]);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home">
                        {(props) => (
                            <Home
                                {...props}
                                tricks={tricks}
                                setTrickStatus={setTrickStatusWithCelebration}
                                setSearchQuery={setSearchQuery}
                                updateFilter={updateFilter}
                                filters={filters}
                                learnedTricks={learnedTricks}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Detail"
                        options={({ route }: any) => ({
                            title: route?.params?.trick.name,
                        })}
                    >
                        {(props) => (
                            <Detail
                                {...props}
                                learnedTricks={learnedTricks}
                                setTrickStatus={setTrickStatusWithCelebration}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
            <ConfettiCannon
                count={200}
                origin={explosionOrigin}
                autoStart={false}
                ref={explosion}
                fadeOut
            />
        </>
    );
};
