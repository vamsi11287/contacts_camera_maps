import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';

import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ContactsPage = () => {
  const [contactsList, setContactsList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    readContacts();
  }, []);
  const readContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        Contacts?.getAll()
          .then((contacts: any) => {
            // work with contacts
            setContactsList(contacts);
            console.log(contacts);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(err => console.log(err));
  };
  const addContact = () => {
    setOpen(true);
  };
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  console.log(contactsList, '___________');

  return (
    <SafeAreaView>
      <Text style={{textAlign:'center',fontSize:24,margin:5,color:'black',fontWeight:'600'}}>All Contacts</Text>
      <View style={{padding: 5}}>
        {contactsList.map(each => (
          <View style={{elevation: 2, borderWidth: 1, padding: 5,borderColor:'white',paddingLeft:12}}>
            <Text style={{color: 'black', fontSize: 24, fontWeight: '600'}}>
              {each?.givenName}
            </Text>

            <Text
              style={{
                color: 'orange',
                fontSize: 20,
                fontWeight: '600',
                margin: 3,
              }}>
              {each?.phoneNumbers[0]?.number}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ContactsPage;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
});
