import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PulsingHeart = () => {
    const scale = useRef(new Animated.Value(1)).current; // Valor inicial para a animação

    const startPulsing = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.3, // Aumenta o tamanho
                    duration: 100, // Tempo da animação
                    useNativeDriver: true, // Melhora a performance
                }),
                Animated.timing(scale, {
                    toValue: 1, // Retorna ao tamanho original
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
            {
                iterations: -1, // Repete indefinidamente
            }
        ).start();
    };

    useEffect(() => {
        startPulsing();
    }, []);

    return (
        <View>
            <Animated.Text style={{ 
                transform: [{ scale }] 
            }}>
                <Icon name="heart" size={150} color="red"/>
            </Animated.Text>
        </View>
    );
}

export default PulsingHeart;
