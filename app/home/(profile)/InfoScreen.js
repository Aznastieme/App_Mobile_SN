import React, { useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import fetchUsers from '../../../hook/fetchUsers';
import { ActivityIndicator } from 'react-native-web';
import { CustomInput } from '../../../components';
import { useRouter } from 'expo-router';

const InfoScreen = () => {
  const router = useRouter()
  const { authId } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const {updateAuthToken} = useAuth();

  const { dataUser, isLoading } = fetchUsers(`?id=${authId}&include_receivedNotes=true`, {});

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // TODO ajouter la requete de modification de profil
    setIsEditing(false);
  };

  const logout = async () => {
    await updateAuthToken("")
  }

  return (
    <View>
        {isLoading? (
            null
        ) : (
            <View>
      <Text>Nom :</Text>
      <CustomInput placeholder={dataUser.user.username} value={username} editable={isEditing} onChangeText={setUsername} />

      <Text>Mail :</Text>
      <CustomInput placeholder={dataUser.user.email} value={email} editable={isEditing} onChangeText={setEmail} />

      <Text>Description :</Text>
      <CustomInput placeholder={dataUser.user.bio} value={bio} editable={isEditing} onChangeText={setBio} />

      <Text>Image :</Text>
      <CustomInput placeholder={dataUser.user.picture} value={pictureUrl} editable={isEditing} onChangeText={setPictureUrl} />
      </View>
      )
    }
      {isEditing ? (
        <Button title="Sauvegarder" onPress={handleSaveProfile} />
      ) : (
        <Button title="Modifier le profil" onPress={handleEditProfile} />
      )}

    <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
};

export default InfoScreen;
