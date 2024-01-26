import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import { SafeAreaView, View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import verificaCasal from "../../utils/verificaCasal";

export default function LoginScreen({ navigation }){
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');

    const loginUser = async () => {
        try{
            await auth()
            .signInWithEmailAndPassword(email, senha)

            if(await verificaCasal()){
                navigation.navigate('DrawerNavigatorCasal');
            } else {
                navigation.navigate('HomeScreen');
            }
        }
        catch(error){
            if (error.code === 'auth/user-not-found') {
                Alert.alert('Usuário não encontrado!');
            } else if (error.code === 'auth/wrong-password') {
                Alert.alert('Senha incorreta!');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente mais tarde.');
                console.error(error);
            }
        }
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={{ width: '50%' }}>
                <Image source={require('../../assets/images/lovetwin.png')} style={styles.logo}/>
                <TextInput 
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={loginUser}
                    >
                        <Text style={styles.botaoText}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}
                    onPress={() => navigation.navigate('CadastroScreen')}
                >
                    <Text style={styles.cadastroText}>Nao tem conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
