import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  View,
  theme,
  ScrollView,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {NumericFormat} from 'react-number-format';
import BottomTab from '../../component/BottomTab';

export default function Home(props) {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const [expList, setExpList] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('ExpenseObj').then(val => {
      if (val) {
        console.log('List ====', val);
        setExpList(JSON.parse(val));
      }
    });
  }, [isFocused]);

  // useEffect(() => {
  //   navigation.setOPtions(

  //   )
  // }, [navigation]);

  const renderItemDetails = (itm, index) => {
    return (
      <View
        key={index}
        backgroundColor={theme.colors.white}
        m={1}
        p={2}
        borderRadius={6}
        borderLeftColor={
          itm.transactionType === 'debit'
            ? theme.colors.red[600]
            : theme.colors.green[400]
        }
        borderLeftWidth={4}>
        <Text>{itm.addedDate}</Text>

        <Text fontSize={18}>₹ {itm.amount}</Text>
        <Text>{itm.description}</Text>
      </View>
    );
  };
  return (
    <View flex={1}>
      <View flex={1}>
        {expList.length === 0 && (
          <Text textAlign={'center'} mt={2}>
            No Data Found
          </Text>
        )}
        <ScrollView mx={2} mt={2}>
          {expList.map((itm, index) => renderItemDetails(itm, index))}
        </ScrollView>
        {/* <BottomTab navigation={navigation} /> */}
      </View>
      <View position={'absolute'} right={5} bottom={5}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddExpense');
          }}>
          <View
            alignItems={'center'}
            justifyContent={'center'}
            height={50}
            width={50}
            borderRadius={50}
            backgroundColor={theme.colors.primary[400]}>
            <Text color={theme.colors.white} fontSize={26}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
