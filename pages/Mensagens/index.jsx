import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import firestore from '@react-native-firebase/firestore';
import styles from "./style";
import moment from "moment";
import 'moment/locale/pt-br'; 
import getUserID from "../../utils/getUserID";
import { TextTitleBlack, ContainerCenterX } from "../../styled/global.styles";

export default function MensagensScreen({ route }){
    const [ isEnviado, setIsEnviado ] = useState(false);
    const [ text, setText ] = useState('');
    const [ mensagemPar, setMensagemPar ] = useState(null);
    const [ mensagemUsuario, setMensagemUsuario ] = useState('');

    const userId = getUserID();
    const casalId = route.params.casalId;
    const userInfo = route.params.userInfo;
    const userParInfo = route.params.userParInfo;
    const dadosCasal = route.params.dadosCasal;

    const dataAtual = moment().format('YYYYMMDD');
    const dataAtualTitulo = moment().locale('pt-br').format('LL');
    const dataAnterior = moment().subtract(1, 'days').format('YYYYMMDD');
    
    const casalRef = firestore().collection('casais').doc(casalId);
    const mensagemRef = casalRef.collection('mensagens').doc(dataAtual).collection('id').doc(userId);
    const mensagemParRef = casalRef.collection('mensagens').doc(dataAtual).collection('id').doc(userParInfo.uid);

    const mensagemAntigaRef = casalRef.collection('mensagens').doc(dataAnterior).collection('id');

    const enviarTexto = async () => {
        try {
            await mensagemRef.set({
                mensagem: text,
                dt_corrente: firestore.FieldValue.serverTimestamp()
            });

            const mensagemAntigaRef = casalRef.collection('mensagens').doc(dataAnterior).collection('id').doc(userParInfo.uid);
            const mensagemAntigaSnapShot = await mensagemAntigaRef.get();

            if(mensagemPar && mensagemAntigaSnapShot.exists){
                if (dadosCasal) {
                    await casalRef.update({
                        dias_engajados: dadosCasal.dias_engajados + 1
                    });
                } else {
                    console.log('Dados do casal não encontrados');
                }
            } else if(mensagemPar){
                await casalRef.update({
                    dias_engajados: 1
                });
            }
        } catch(error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível enviar a mensagem ou atualizar os dias engajados.');
        }
    };
    

    useEffect(() => {
        const unsubscribe =  mensagemRef.onSnapshot((doc) => {
            if (doc.exists) {
                const mensagemData = doc.data();
                if (mensagemData?.mensagem) {
                    setIsEnviado(true);
                    setMensagemUsuario(mensagemData.mensagem);
                }
            } else {
                setIsEnviado(false);
            }
        }, (error) => {
            console.error("Erro ao observar o documento:", error);
        });
    
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe =  mensagemParRef.onSnapshot((doc) => {
            if (doc.exists) {
                const mensagemParData = doc.data();
                if (mensagemParData?.mensagem) {
                    setMensagemPar(mensagemParData.mensagem)
                }
            } else {
                setMensagemPar(null);
            }
        }, (error) => {
            console.error("Erro ao observar o documento:", error);
        });
    
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if(!mensagemPar && !mensagemUsuario) {
            const unsubscribe = mensagemAntigaRef.onSnapshot(snapshot => {
                if (snapshot.size === 2) {
                    console.log('nada muda, continua engajado')
                } else {
                    casalRef.update({
                        dias_engajados: 0
                    })
                }
            }, (error) => {
                console.error("Erro ao observar a coleção:", error);
            });
        
            return () => unsubscribe();            
        }
    }, []); 

    return(
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <TextTitleBlack>{dataAtualTitulo}</TextTitleBlack>
                <TextTitleBlack>{dadosCasal.dias_engajados}</TextTitleBlack>
            </View>
            {
                isEnviado ?
                <View>
                    {
                        mensagemPar ?
                        <Text>{mensagemPar}</Text>
                        :
                        <Text>{userParInfo.nome} ainda não enviou mensagem!</Text>
                    }
                    <Text>{mensagemUsuario}</Text>
                </View>
                :
                <View>
                    {
                        mensagemPar ?
                        <Text style={{ backgroundColor: '#ebd9d2', color: '#ebd9d2', borderRadius: 20 }}>{mensagemPar}</Text>
                        :
                        <Text>{userParInfo.nome} ainda não enviou mensagem!</Text>
                    }
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Envie sua mensagem do dia..."
                    />
                    <TouchableOpacity onPress={enviarTexto}>
                        <Text>Enviar</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    );
}