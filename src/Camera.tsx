import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
const Camera = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const handleCameraLaunch = async (param: string) => {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);

    if (cameraPermission === RESULTS.GRANTED) {
      const options: any = {
        mediaType: `${param}`,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        saveToPhotos: true,
      };

      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setSelectedImage(imageUri);
          console.log(imageUri);
        }
      });
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    //@ts-ignore
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 35,
          backgroundColor: 'orange',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleCameraLaunch('photo')}>
        <Text>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 35,
          backgroundColor: 'orange',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}
        onPress={() => handleCameraLaunch('video')}>
        <Text>video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 35,
          backgroundColor: 'orange',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}
        onPress={openImagePicker}>
        <Text>Library</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Camera;
