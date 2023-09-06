import React from 'react';
import {NativeBaseProvider, Box, Text, View, theme} from 'native-base';
import {TouchableOpacity} from 'react-native';

export default function BottomTab(props) {
  const {navigation} = props;

  return (
    <View
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      height={10}
      backgroundColor={theme.colors.coolGray[200]}
      borderTopColor={theme.colors.black}
      borderTopWidth={0.5}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddExpense');
        }}>
        <View
          alignItems={'center'}
          justifyContent={'center'}
          height={60}
          width={60}>
          <Text color={theme.colors.primary[600]} fontSize={26}>
            +
          </Text>
          <Text>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
