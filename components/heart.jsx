import React from 'react';
import { View, StyleSheet } from 'react-native';

const Heart = () => {
    return (
        <View style={styles.heart}>
            <View style={[styles.heartSide, styles.leftHeart]} />
            <View style={[styles.heartSide, styles.rightHeart]} />
        </View>
    );
};

const styles = StyleSheet.create({
    heart: {
        width: 100,
        height: 100,
        position: 'relative',
    },
    heartSide: {
        width: 60,
        height: 90,
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'red',
    },
    leftHeart: {
        transform: [
            { rotate: '-45deg' },
            { translateX: -5 },
        ],
        left: 20,
    },
    rightHeart: {
        transform: [
            { rotate: '45deg' },
            { translateX: 5 },
        ],
        right: 5,
    }
});

export default Heart;
