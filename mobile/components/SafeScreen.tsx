import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS} from "@/constants/colors";

type SafeScreenProps = {
    children: React.ReactNode;
};

const SafeScreen: React.FC<SafeScreenProps> = ({ children }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={ { paddingTop: insets.top  , backgroundColor: COLORS.background,   flex: 1}}>
            {children}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, // optional padding
        backgroundColor: '#fff', // optional background
    },
});

export default SafeScreen;
