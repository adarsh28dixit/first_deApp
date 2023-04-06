import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ClassContext} from '../Context';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = () => {
  const {user} = useContext(ClassContext);
  const navigation = useNavigation();
  //console.log(user, '----------');

  const [visible, setViisble] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const [contacts, setContacts] = useState([]);

  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getContacts();
  }, []);
  const handleVisibleModal = () => {
    setViisble(!visible);
    setHideId(null);
  };

  const getContacts = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    let response = await axios.get(
      'https://firsthostedbackend-production.up.railway.app/contacts/all-contacts',
      config,
    );
    if (response) {
      setContacts(response.data);
    }
  };

  const addContact = async e => {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    let response = await axios.post(
      'https://firsthostedbackend-production.up.railway.app/contacts/create-contact',
      {name, contact},
      config,
    );
    if (response) {
      console.log(response,'fghjk')
      setName('');
      setContact('');
      await getContacts();
      setViisble(false);
    } else {
      alert('something went wrong');
    }
  };

  const onChangeName = value => {
    setName(value);
  };
  const onChangeContact = value => {
    setContact(value);
  };

  const handelDetete = async id => {
    let config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    try {
      let response = await axios.delete(
        `https://firsthostedbackend-production.up.railway.app/contacts/delete-contact/${id}`,
        config,
      );

      if (response) {
        await getContacts();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = async id => {
    setHideId(id);
    let config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    try {
      let response = await axios.get(
        `https://firsthostedbackend-production.up.railway.app/contacts/get-contact/${id}`,
        config,
      );

      if (response) {
        //setIsEditing(true)

        setName(response.data[0].name);
        setContact(response.data[0].contact.toString());
        setViisble(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async e => {
    e.preventDefault();
    let config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    let response = await axios.patch(
      `https://firsthostedbackend-production.up.railway.app/contacts/update-contact/${hideId}`,
      {name, contact},
      config,
    );
    if (response) {
      await getContacts();

      setName('');
      setContact('');
      setHideId(null);
      setViisble(false);
    } else {
      alert('something went wrong');
    }
  };

  const handleLogOut = () => {
    //await AsyncStorage.removeItem('userInfo');
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <Text style={styles.txt_main}>Contacts {contacts.length} </Text>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}>
          <Text style={styles.textButton}>Add Contact</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}>Close</Text>
            </TouchableOpacity>
            <TextInput
              value={name}
              style={styles.text_input}
              placeholder="Enter Name"
              onChangeText={onChangeName}
            />
            <TextInput
              value={contact}
              style={styles.text_input}
              placeholder="Enter Contact"
              onChangeText={onChangeContact}
            />

            <TouchableOpacity
              onPress={hideId == null ? addContact : updateContact}
              style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {hideId == null ? 'Save' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {contacts.map((item, index) => {
          return (
            <View style={styles.item_course} key={item._id}>
              <View>
                <Text style={styles.txt_name}>{item.name}</Text>
                <Text style={styles.txt_item}>{item.contact}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handelDetete(item._id)}>
                  <Text style={styles.txt_del}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit(item._id)}>
                  <Text style={styles.txt_edit}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity onPress={handleLogOut} style={styles.btnNewContainer}>
        <Text style={styles.textButton}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 15,
    // backgroundColor : "#e3e3e3",
    marginTop: 10,
  },

  txtClose: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  header_container: {
    padding: 15,
    backgroundColor: '#eeeeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_main: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  item_course: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_name: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
  },
  txt_item: {
    fontSize: 14,
    marginTop: 5,
  },
  txt_enabled: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  txt_disabled: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  txt_del: {
    fontSize: 14,
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  txt_edit: {
    fontSize: 14,
    marginTop: 5,
    color: 'blue',
    fontWeight: 'bold',
  },
  btnContainer: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#000',
    marginTop: 20,
  },
  btnNewContainer: {
    padding: 10,
    backgroundColor: '#000',
  },
  textButton: {
    textAlign: 'center',
    color: '#FFF',
  },
});

export default MainScreen;
