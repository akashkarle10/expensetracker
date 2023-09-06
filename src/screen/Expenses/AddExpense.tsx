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
  Checkbox,
} from 'native-base';
import {Button, Dimensions, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');
export default function AddExpense(props) {
  const {navigation} = props;

  const [expenseObj, setExpenseObj] = useState({
    amount: 0,
    description: '',
    sendTo: '',
    addedDate: new Date().toDateString(),
    transactionType: '',
    split: false,
    selectedMembers: [],
  });

  const [expObjList, setExpObjList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const [date, setDate] = useState(new Date());
  const [isCalensderOpen, setCalenderOpen] = useState(false);
  const [descArray, setDescArray] = useState([
    'Breakfast',
    'Lunch',
    'Diner',
    'Other',
  ]);
  const [creditDescArray, setCreditDescArray] = useState(['Salary', 'Other']);

  const [selDesc, setSelDesc] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [showSplitMOdal, setShowSpliModal] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('ExpenseObj').then(val => {
      if (val) {
        setExpObjList(JSON.parse(val));
      }
    });
    AsyncStorage.getItem('friendslist').then(val => {
      if (val) {
        setFriendsList(JSON.parse(val));
      }
    });
  }, []);

  const handleSelectedDesc = desc => {};

  const handleChange = (type, val) => {
    const expObj = expenseObj;
    switch (type) {
      case 'amount':
        expObj.amount = val;
        break;
      case 'desc':
        expObj.description = val;
        break;
      case 'type':
        expObj.transactionType = val;
        break;
      default:
        break;
    }
    setExpenseObj({...expObj});
  };

  const handleSubmit = expObj => {
    let list = expObjList;
    list.unshift(expObj);

    setExpObjList([...list]);
    AsyncStorage.setItem('ExpenseObj', JSON.stringify(list));
    console.log(expObj);
    navigation.goBack();
  };

  const renderCreditDebit = () => {
    return (
      <View flexDirection={'row'} mx={2} mt={2}>
        <View flex={1}>
          <TouchableOpacity
            onPress={() => {
              setTransactionType('debit');
              handleChange('type', 'debit');
            }}>
            <View
              p={2}
              px={4}
              m={1}
              alignItems={'center'}
              borderColor={
                transactionType === 'debit' ? theme.colors.red[400] : 'black'
              }
              borderWidth={0.5}
              borderRadius={12}
              backgroundColor={
                transactionType === 'debit' ? theme.colors.red[400] : 'white'
              }>
              <Text>Debit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View flex={1}>
          <TouchableOpacity
            onPress={() => {
              setTransactionType('credit');
              handleChange('type', 'credit');
            }}>
            <View
              p={2}
              px={4}
              m={1}
              alignItems={'center'}
              borderColor={
                transactionType === 'credit' ? theme.colors.green[400] : 'black'
              }
              borderWidth={0.5}
              borderRadius={12}
              backgroundColor={
                transactionType === 'credit' ? theme.colors.green[400] : 'white'
              }>
              <Text>Credit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDefaultDescription = descArr => {
    return (
      <View flexDirection={'row'} mx={2} mt={2}>
        {descArr.map(itm => (
          <TouchableOpacity
            onPress={() => {
              setSelDesc(itm);
              handleChange('desc', itm);
            }}>
            <View
              p={2}
              m={1}
              borderColor={
                selDesc === itm ? theme.colors.primary[400] : 'black'
              }
              borderWidth={0.5}
              borderRadius={12}
              backgroundColor={
                selDesc === itm ? theme.colors.primary[400] : 'white'
              }>
              <Text>{itm}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderUserDetails = item => {
    return (
      <View flexDirection={'row'}>
        <Checkbox value={item.firstName} size="md" />
        <Text fontSize={18} ml={2}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
    );
  };
  return (
    <View flex={1}>
      <KeyboardAwareScrollView>
        <View flex={1}>
          <View mt={2} mx="3">
            <Text>Enter Amount:</Text>
            <Input
              placeholder="Enter Amount"
              borderColor={theme.colors.black}
              borderWidth={0.5}
              backgroundColor={'white'}
              keyboardType={'number-pad'}
              value={expenseObj.amount.toString()}
              selectTextOnFocus
              selectionColor={theme.colors.gray[400]}
              onChangeText={val => {
                handleChange('amount', val);
              }}
            />
          </View>
          <View mt={2} mx="3">
            <Text>Select Date:</Text>
            <TouchableOpacity
              onPress={() => {
                setCalenderOpen(true);
              }}>
              <View
                width={'40%'}
                borderRadius={6}
                p={2}
                borderColor={theme.colors.black}
                backgroundColor={'white'}
                borderWidth={0.5}>
                <Text>{expenseObj.addedDate}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {renderCreditDebit()}
          {transactionType === 'debit' && renderDefaultDescription(descArray)}
          {transactionType === 'credit' &&
            renderDefaultDescription(creditDescArray)}

          {selDesc === 'Other' && (
            <View mt={2} mx="3">
              <Text>Add Description:</Text>
              <Input
                placeholder="Add Description"
                backgroundColor={'white'}
                borderColor={theme.colors.black}
                borderWidth={0.5}
                value={expenseObj.description}
                selectTextOnFocus
                selectionColor={theme.colors.white}
                onChangeText={val => {
                  handleChange('desc', val);
                  console.log('val', val);
                }}
              />
            </View>
          )}

          {expenseObj.transactionType === 'debit' && (
            <View mt={4} mx={2}>
              <TouchableOpacity
                onPress={() => {
                  let expObj = expenseObj;
                  expObj.split = !expObj.split;
                  expObj.split && setShowSpliModal(true);
                  setExpenseObj({...expObj});
                }}>
                <View
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderRadius={6}
                  p={2}
                  borderColor={
                    expenseObj.split
                      ? theme.colors.primary[400]
                      : theme.colors.black
                  }
                  backgroundColor={
                    expenseObj.split ? theme.colors.primary[400] : 'white'
                  }
                  borderWidth={0.5}>
                  <Text>Split With Friends</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
          <Button
            onPress={() => handleSubmit(expenseObj)}
            title="Save"
            color="#87ceeb"
          />
        </View>
      </View>
      <DatePicker
        modal
        open={isCalensderOpen}
        date={date}
        onConfirm={date => {
          setCalenderOpen(false);
          let expObj = expenseObj;
          expObj.addedDate = date.toDateString();
          console.log('Selected Date', date.toDateString());

          setDate(date);
        }}
        onCancel={() => {
          setCalenderOpen(false);
        }}
      />

      <Modal
        isOpen={showSplitMOdal}
        onClose={() => {
          setShowSpliModal(false);
        }}>
        <Modal.Content width={width - 20}>
          {/* <View flexDirection={'row'} alignItems={'center'}>
            <Text>Add</Text>
            <Modal.CloseButton />
            <Modal.Header alignItems={'center'}>Select Friends</Modal.Header>
          </View> */}

          <Modal.CloseButton />
          <Modal.Header alignItems={'center'}>Select Friends</Modal.Header>
          <Modal.Body height={height - 100}>
            <View>
              {friendsList.length === 0 ? (
                <View alignItems={'center'} justifyContent={'center'}>
                  <Text>No User Found</Text>
                  <Text>Click + to add user</Text>
                  <View mt={4}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddFriend');
                      }}>
                      <View
                        alignItems={'center'}
                        justifyContent={'center'}
                        height={50}
                        width={50}
                        borderRadius={50}
                        borderWidth={0.5}
                        borderColor={theme.colors.black}>
                        <Text color={theme.colors.black} fontSize={26}>
                          +
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <ScrollView>
                  {friendsList.map(item => renderUserDetails(item))}
                </ScrollView>
              )}
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
}
