import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  View,
  theme,
  Input,
  Modal,
  ScrollView,
} from 'native-base';
import {Button, Dimensions, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');
export default function AddFriend(props) {
  const {navigation} = props;

  const [userDetailsObj, setUserDetailsObj] = useState({
    firstName: '',
    lastName: '',
  });

  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('friendslist').then(val => {
      if (val) {
        setFriendsList(JSON.parse(val));
      }
    });
  }, []);

  const handleChange = (type, val) => {
    const uObj = userDetailsObj;
    switch (type) {
      case 'fname':
        uObj.firstName = val;
        break;
      case 'lname':
        uObj.lastName = val;
        break;

      default:
        break;
    }
    setUserDetailsObj({...uObj});
  };

  const handleSubmit = () => {
    let list = friendsList;
    list.push(userDetailsObj);
    setFriendsList([...list]);
    AsyncStorage.setItem('friendslist', JSON.stringify(list));
    navigation.goBack();
  };

  return (
    <View flex={1}>
      <KeyboardAwareScrollView>
        <View mt={2} mx="3">
          <Text>First Name:</Text>
          <Input
            placeholder="Enter First Name"
            borderColor={theme.colors.black}
            borderWidth={0.5}
            backgroundColor={'white'}
            value={userDetailsObj.firstName}
            selectTextOnFocus
            selectionColor={theme.colors.gray[400]}
            onChangeText={val => {
              handleChange('fname', val);
            }}
          />
        </View>
        <View mt={2} mx="3">
          <Text>Last Name:</Text>
          <Input
            placeholder="Enter Last Name"
            borderColor={theme.colors.black}
            borderWidth={0.5}
            backgroundColor={'white'}
            value={userDetailsObj.lastName}
            selectTextOnFocus
            selectionColor={theme.colors.gray[400]}
            onChangeText={val => {
              handleChange('lname', val);
            }}
          />
        </View>
      </KeyboardAwareScrollView>

      <View flexDirection={'row'} m={2}>
        <View flex={0.4}>
          <Button
            onPress={() => navigation.goBack()}
            title="Cancel"
            color={theme.colors.gray[400]}
          />
        </View>
        <View flex={0.6} ml={2}>
          <Button onPress={() => handleSubmit()} title="Save" color="#87ceeb" />
        </View>
      </View>
    </View>
  );
}
