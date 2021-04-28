import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const SETTINGS_STORAGE_KEY = "settings";

const DEFAULT_SETTINGS = {
    showConfetti: true,
};

export default () => {
    const [settings, setSettings] = useState({});

    const updateSetting = (key: string, value: boolean) => {
        setSettings((state) => ({ ...state, [key]: value }));
    };

    useEffect(() => {
        AsyncStorage.getItem(SETTINGS_STORAGE_KEY).then((savedSettings) =>
            setSettings(
                savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS
            )
        );
    }, []);

    return {
        settings,
        updateSetting,
    };
};
