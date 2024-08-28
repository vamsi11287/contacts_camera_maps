import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ContactsPage from './Contacts';
import Maps from './Maps';
const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Contacts')}
        style={{
          width: '100%',
          backgroundColor: 'orange',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Open Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Maps')}
        style={{
          width: '100%',
          backgroundColor: 'orange',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{color: 'white'}}>Open Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

export const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{headerShown: false}}
        component={HomeScreen}
      />

      <Stack.Screen
        name="Contacts"
        options={{headerShown: false}}
        component={ContactsPage}
      />
      <Stack.Screen
        name="Maps"
        options={{headerShown: false}}
        component={Maps}
      />
    </Stack.Navigator>
  );
};
