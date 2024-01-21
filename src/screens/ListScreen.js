import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { Button, IconButton, Surface, useTheme } from 'react-native-paper';


const ListScreen = () => {
  const [spese, setSpese] = useState([]);
  const theme = useTheme();

  const fetchData = async () => {
    try {
      const response = await fetch('https://appluca-backend.federicocervelli01.workers.dev/spese');
      const data = await response.json();
      setSpese(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from the API endpoint
    fetchData();
    console.log('useEffect called');
  }, []);

  const renderSpesaItem = ({ item }) => (
    <View className="p-5" style={{ borderBottomWidth: 1, borderColor: theme.colors.surfaceDisabled }}>
      <View className="flex flex-row justify-between align-middle items-center">
        <View>
          <Text style={{ color: theme.colors.onBackground, fontWeight: "bold", fontSize: 20 }}>{item.spesante}</Text>
          <View className="flex flex-row">
            <Text style={{ color: item.costo > 0 ? "red" : "green", fontWeight: "bold" }}>{item.costo}€</Text>
            <Text style={{ color: theme.colors.onBackground }}> via {item.tipo_di_fondi_utilizzati}</Text>
          </View>
        </View>
        <Text style={{ color: theme.colors.onBackground, fontSize: 15 }}>{item.data}</Text>
      </View>

      {/* <Text className="mt-3" style={{ color: theme.colors.onBackground }}>{item.descrizione}</Text> */}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: theme.dark ? "black" : theme.colors.surface }}>
      <View className=" pt-12">
        <FlatList
          data={spese}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSpesaItem}
        />
      </View>

    </SafeAreaView>
  );
};

export default ListScreen;
