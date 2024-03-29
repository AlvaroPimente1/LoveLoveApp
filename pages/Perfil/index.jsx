import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import getUserID from "../../utils/getUserID";
import { SafeAreaView, Text, View, Alert, TouchableOpacity, Image, TextInput } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import styles from "./styles";
import getPermission from "../../utils/getPermission";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import uploadImageStorage from "../../utils/uploadStorage";

export default function PerfilScreen(){
    const [ userData, setUserData ] = useState(null);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ nome, setNome ] = useState(userData ? userData.nome : ''); 
    const [ image, setImage ] = useState('');
    const userId = getUserID(); 

    const saveImageUrlToUser = async () => {
        try {
            await firestore().collection('usuarios').doc(userId).update({
                image: image,
            });
        } catch (error) {
            console.error("Erro ao atualizar o documento do usuário:", error);
        }
    };

    const ImageGallery = () => {
        let options = {
            storageOptions: {
                path: 'images',
                skipBackup: true,
                waitUntilSaved: true,
            }, 
            maxWidth: 300, 
            maxHeight: 300, 
        };
    
        if (getPermission()) {
            try {
                launchImageLibrary(options, async response => {
                    if (response.assets && response.assets.length > 0) {
                        const uri = response.assets[0].uri;
                        const url = await uploadImageStorage(uri);
                        setImage(url); 
                        await saveImageUrlToUser();
                    } 
                });
            } catch(error) {
                console.log(error);
            }
        }
    }
    


    const removePhoto = async() => {
        try {
            setImage(null);
            await firestore().collection('usuarios').doc(userId).update({
                image: null,
            });
        } catch (error) {
            console.error("Erro ao atualizar o documento do usuário:", error);
        }

    }

    const handleSetEdit = () => {
        if(isEdit){
            setIsEdit(false);
        } else {
            setIsEdit(true);
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(getUserID());
    };
    
    useEffect(() => {
        const userRef = firestore().collection('usuarios').doc(getUserID());

        const fetchUserData = async () => {
            try {
            const userSnapshot = await userRef.get();
            if (userSnapshot.exists) {
                const userData = userSnapshot.data();
                setUserData(userData);
            } else {
                console.log("Documento de usuário não encontrado.");
            }
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        };
    
        fetchUserData();
        }, [getUserID()]);

    return(
        <SafeAreaView style={styles.container}>
                <View style={styles.containerFoto}>
                    {
                        image || (userData && userData.image) ? 
                        <View style={styles.containerFoto}>
                            <Image style={styles.fotoPerfil} source={{ uri: image || userData.image }}/> 

                            <View style={styles.containerIcons}>
                                <TouchableOpacity style={styles.containerFoto} onPress={() => ImageGallery()}>
                                    <Icon name="camera" size={20} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.containerFoto} onPress={() => removePhoto()}>                            
                                    <Icon name="remove" size={20} color="#fff" />
                                </TouchableOpacity>
                                
{/*                                 <TouchableOpacity onPress={() => saveImageUrlToUser()}>
                                    <Icon name="save" size={20} color="#fff"/>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        : 
                        <View>
                            <TouchableOpacity style={styles.containerFoto} onPress={() => ImageGallery()}>
                                <Text>Adicionar Imagem</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>

                { isEdit ? 
                    <View style={styles.containerInformacoes}>
                        <TextInput
                            onChangeText={setNome}
                            value={nome}
                            placeholder={userData ? nome : 'Nome...'}
                            style={styles.inputText}
                        />
                        <TouchableOpacity style={styles.buttonSave} onPress={handleSetEdit}>
                            <Text style={{ color: '#fff', fontSize: 15 }}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonSave} onPress={handleSetEdit}>
                            <Text style={{ color: '#fff', fontSize: 15 }}>Cancelar</Text>
                        </TouchableOpacity>                        
                    </View>                

                : 

                    <View style={styles.containerInformacoes}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={styles.textData}>{userData ? userData.nome : "Carregando..."}</Text>
                            <TouchableOpacity style={styles.buttonEdit} 
                                onPress={handleSetEdit}
                            >
                                <Image style={styles.iconEdit} source={require('../../assets/images/edit.png')}/>
                            </TouchableOpacity>
                        </View>
                        <Text>{userData ? userData.email : "Carregando..."}</Text>
                        <TouchableOpacity 
                            style={styles.buttonCopy}
                            onPress={copyToClipboard}
                        >
                            <Text style={styles.buttonCopyText}>Copiar UID</Text>
                        </TouchableOpacity>
                    </View>
                }
        </SafeAreaView>
    )
}