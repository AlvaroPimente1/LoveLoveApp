import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import { SafeAreaView, View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import styles from "./style";

export default function CadastroScreen({ navigation }){
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ nome, setNome ] = useState('');

    const criaConta = async() => {
        if(email != '' || senha != ''){
            try {
                await auth().createUserWithEmailAndPassword(email, senha);
                Alert.alert('Usuário criado com sucesso!');
                navigation.navigate('LoginScreen');
            
                await firestore()
                    .collection('usuarios')
                    .doc(getUserID())
                    .set({
                        nome: nome,
                        email: email,
                        comprometido: false
                    });
            
                console.log('Sessão de usuário criada');
                } catch (error) {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Esse email já está em uso!');
                    } else if (error.code === 'auth/invalid-email') {
                        Alert.alert('Email inválido!');
                    } else {
                        Alert.alert('Erro', 'Ocorreu um erro durante a criação de conta. Tente novamente mais tarde.');
                        console.error(error);
                    }
                }
        } else {
            Alert.alert('Erro', 'É necessário preencher todos os campos para criar conta.')
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
                <TextInput 
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={criaConta}
                    >
                        <Text style={styles.botaoText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.cadastroText}>Já tem conta? Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
