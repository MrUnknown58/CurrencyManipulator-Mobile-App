import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  FlatList,
  ToastAndroid,
} from 'react-native';

type country = {name: string};
function App(): React.JSX.Element {
  const currency: country[] = [
    {name: 'Dollar', symbol: '$'},
    {name: 'EURO', symbol: '€'},
    {name: 'Pound', symbol: '£'},
    {name: 'Rubel', symbol: '₽'},
    {name: 'AUS Dollar', symbol: '$'},
    {name: 'CAN Dollar', symbol: '$'},
    {name: 'YEN', symbol: '¥'},
    {name: 'Dinar', symbol: 'د.ك'},
    {name: 'INR', symbol: 'Rs.'},
  ];
  const [selected, setSelected] = useState(currency[0]);
  const [amount, setAmount] = useState('');
  const [inputValue, setInputValue] = useState('');

  const refreshAmount = curr => {
    if (!inputValue) {
      ToastAndroid.show('Enter the Amount to convert', ToastAndroid.SHORT);
      return;
    }
    switch (curr) {
      case 'Dollar':
        setAmount((inputValue * 0.012).toFixed(2));
        break;
      case 'EURO':
        setAmount((inputValue * 0.011).toFixed(2));
        break;
      case 'Pound':
        setAmount((inputValue * 0.0095).toFixed(2));
        break;
      case 'Rubel':
        setAmount((inputValue * 1.21).toFixed(2));
        break;
      case 'AUS Dollar':
        setAmount((inputValue * 0.019).toFixed(2));
        break;
      case 'CAN Dollar':
        setAmount((inputValue * 0.016).toFixed(2));
        break;
      case 'YEN':
        setAmount((inputValue * 1.75).toFixed(2));
        break;
      case 'Dinar':
        setAmount((inputValue * 0.0037).toFixed(2));
        break;
      default:
        setAmount(inputValue);
    }
  };
  return (
    <SafeAreaView>
      {/* <StatusBar /> */}
      <View className="flex justify-center items-center">
        <View className="w-full items-center justify-center">
          <Text className="text-3xl">Currency Converter</Text>
          <View className="flex flex-row space-x-10 py-5">
            <Text className="text-3xl">{selected.symbol}</Text>
            <Text className="text-3xl">{amount}</Text>
          </View>
          <View className="flex-row space-x-10 py-10 w-full items-center justify-center">
            <Text>Rs.</Text>
            <TextInput
              className="bg-white rounded-md w-1/2 text-black"
              onChangeText={setInputValue}
              value={inputValue}
              keyboardType="numeric"
              clearButtonMode="always"
              placeholder="10"
            />
          </View>
        </View>
        <View className="flex flex-row flex-wrap items-center justify-center">
          <FlatList
            numColumns={3}
            data={currency}
            keyExtractor={item => item.name}
            nestedScrollEnabled={true}
            renderItem={({item}) => (
              <Pressable
                className={`${
                  selected.name === item.name ? 'bg-amber-200' : 'bg-white'
                } border-2 border-gray-200 border-opacity-60 rounded-xl items-center flex-1 m-3 h-16 justify-center`}
                onPress={() => {
                  setSelected(item);
                  refreshAmount(item.name);
                }}>
                <View className="py-4 px-2 items-center">
                  <Text className="uppercase tracking-widest text-xs font-medium text-gray-400">
                    {item.name} ({item.symbol})
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default App;
