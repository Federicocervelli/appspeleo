import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import {
  Icon, PaperProvider, MD3DarkTheme,
  MD3LightTheme,
  MD3Colors
} from 'react-native-paper';
import { ToastProvider } from 'react-native-toast-notifications'
import { View, Text, useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { StatusBar } from 'expo-status-bar';


export default function App() {

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  paperTheme.colors.primary = "#0089EB"


  return (
    <PaperProvider theme={paperTheme}>
      <ToastProvider
        offset={50}
        renderType={{
          warning_custom: (toast) => (
            <View className="w-full px-5 mb-2 ">
              <View className="py-3 px-5 bg-yellow-400 rounded-lg border border-yellow-500 flex flex-row items-center">
                <View className="mr-5">
                  <Icon source={"alert-outline"} size={40} color={MD3Colors.error0} />
                </View>
                <View className="pr-16">
                  <Text className="font-semibold text-yellow-950">{toast.data.title}</Text>
                  <Text className=" text-yellow-950">{toast.message}</Text>
                </View>
              </View>
            </View>
          ),
          success_custom: (toast) => (
            <View className="w-full px-5 mb-2 ">
              <View className="py-3 px-5 bg-green-400 rounded-lg border border-green-500 flex flex-row items-center">
                <View className="mr-5">
                  <Icon source={"check-circle-outline"} size={40} color={MD3Colors.error0} />
                </View>
                <View className="pr-16">
                  <Text className="font-semibold text-green-950">{toast.data.title}</Text>
                  <Text className=" text-green-950">{toast.message}</Text>
                </View>
              </View>
            </View>
          ),
          error_custom: (toast) => (
            <View className="w-full px-5 mb-2 ">
              <View className="py-3 px-5 bg-red-400 rounded-lg border border-red-500 flex flex-row items-center">
                <View className="mr-5">
                  <Icon source={"alert-circle-outline"} size={40} color={MD3Colors.error0} />
                </View>
                <View className="pr-16">
                  <Text className="font-semibold text-red-950">{toast.data.title}</Text>
                  <Text className=" text-red-950">{toast.message}</Text>
                </View>
              </View>
            </View>
          )
        }}>
        <StatusBar style="auto" />
        <AppNavigation />
      </ToastProvider>
    </PaperProvider>
  );
}
