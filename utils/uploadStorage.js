import storage from '@react-native-firebase/storage';

const uploadImageStorage = async (imageUri) => {
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    
    try {
        await storage().ref(filename).putFile(uploadUri);
        const url = await storage().ref(filename).getDownloadURL();
        return url;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export default uploadImageStorage;