
import React from 'react'
import { View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Button, IconButton, Surface, useTheme } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { TextInput, ThemeProvider, DefaultTheme, Snackbar } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import DropDown from 'react-native-paper-dropdown';
import * as ImagePicker from 'expo-image-picker';
import CurrencyInput from 'react-native-currency-input';
import { useToast } from "react-native-toast-notifications";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';



export default function HomeScreen() {
  const [showDropDownSpesa, setShowDropDownSpesa] = useState(false);
  const [utente, setUtente] = useState("");
  const [showDropDownFondi, setShowDropDownFondi] = useState(false);
  const [fondi, setFondi] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [costo, setCosto] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loadingAggiungi, setLoadingAggiungi] = useState(false);
  const [descrizione, setDescrizione] = useState("");
  const toast = useToast();
  const theme = useTheme();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });
    console.log(result);
    if (!result.canceled) {
      //for every image in assets, add it to selectedImages
      for (let i = 0; i < result.assets.length; i++) {
        setSelectedImages(prevImages => [...prevImages, result.assets[i].uri]);
      }
    }


  };

  const handleCameraOpen = async () => {
    toast.show("Non è ancora disponibile fare foto direttamente dall'app. per favore seleziona le immagini dalla galleria.", {
      type: "warning_custom",
      placement: "top",
      duration: 3000,
      animationType: "slide-in",
      data: {
        title: "Work In Progress"
      }
    });
  };

  const handleImagePress = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1); // Remove the image at the specified index
      return newImages;
    });
  };

  const handleAggiungiClick = async () => {
    let errori = [];
    //check if there is a date, utente, fondi, and costo, if not, give error, if yes, console log everything
    if (date == null) {
      errori.push("data");
    }
    if (utente == "") {
      errori.push("utente");
    }
    if (utente !== "gruppospeleo" && fondi == "") {
      errori.push("fondi");
    }
    if (costo == 0) {
      errori.push("costo");
    }
    if (descrizione == "") {
      errori.push("descrizione");
    }
    
    if (errori.length > 0) {
      toast.show("Compila " + errori.join(", ") + " per aggiungere la spesa", {
        type: "warning_custom",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        data: {
          title: "Attenzione"
        }
      });
      return console.log("Compila " + errori.join(", ") + " per aggiungere la spesa");
    }

    setLoadingAggiungi(true);

    const requestBody = {
      data: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      utente: utente,
      tipo_fondi: fondi,
      descrizione: descrizione || "Nessuna descrizione",
      quantità: costo,
      immagini: selectedImages || [], // Use an empty array if no images are selected
    };
    try {
      // Send the POST request
      const response = await fetch('https://appluca-backend.federicocervelli01.workers.dev/spese', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Handle success (you may want to update UI or navigate to another screen)
        console.log('Spesa added successfully!');
        toast.show("Spesa aggiunta con successo", {
          type: "success_custom",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
          data: {
            title: "Successo"
          }
        });
      } else {
        // Handle error
        console.error('Failed to add spesa:', await response.text());
        toast.show("Errore durante l'aggiunta della spesa", {
          type: "error_custom",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
          data: {
            title: "Errore"
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.show("Errore durante l'aggiunta della spesa", {
        type: "error_custom",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
        data: {
          title: "Errore"
        }
      });
    } finally {
      setLoadingAggiungi(false);
    }

  }

  const onDismissDate = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmDate = React.useCallback(
    (params) => {
      setOpenDatePicker(false);
      setDate(params.date);
      console.log(params.date);
    },
    [setOpenDatePicker, setDate]
  );

  const spesantiList = [
    {
      label: "Chi ha pagato?",
      value: "default",
    },
    {
      label: "Gruppo Speleo",
      value: "Gruppo Speleo",
    },
    {
      label: "Luca Morgantini",
      value: "Luca Morgantini",
    },
    {
      label: "Andrea Rossi",
      value: "Andrea Rossi",
    },
    
  ];
  const fondiList = [
    {
      label: "Tipo di fondi utilizzati",
      value: "default",
    },
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "PayPal",
      value: "paypal",
    },
    {
      label: "CAI",
      value: "cai"
    }
  ]


  useEffect(() => {
    console.log('Images: ', selectedImages);
  }, [selectedImages]);


  return (
    <Surface className="flex-1" style={{ backgroundColor: theme.dark ? 'black' : theme.colors.background }}>
      <SafeAreaView className="flex-1 m-10 mt-20">
        <TextInput

          mode="outlined"
          label={<Text style={{ color: theme.colors.onBackground }}>Data</Text>}
          value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          editable={false}
          outlineColor={theme.colors.onBackground}
          style={{ backgroundColor: theme.colors.background }}
          placeholderTextColor={theme.colors.onBackground}
          textColor={theme.colors.onBackground}
          right={<TextInput.Icon icon="calendar-month" color={theme.colors.onBackground} onPress={showDatepicker} />}
        />
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <View className="h-5" />

        <View className="overflow-hidden" style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.colors.onBackground }}>
          <Picker
            style={{ backgroundColor: theme.colors.background, color: theme.colors.onBackground }}
            dropdownIconColor={theme.colors.onBackground}
            dropdownIconRippleColor={theme.colors.onBackground}
            selectedValue={utente}
            onValueChange={(itemValue, itemIndex) => {
              if (itemIndex !== 0) {
                setUtente(itemValue)
              }
            }

            }>
            {spesantiList.map((item, index) => (
              index === 0 ? (
                <Picker.Item className="bg-black" enabled={false} label={item.label} value={item.value} key={index} />
              ) : (
                <Picker.Item label={item.label} value={item.value} key={index} />
              )
            ))}
          </Picker>
        </View>


        {utente !== "gruppospeleo" && (<><View className="h-5" /><View className="overflow-hidden" style={{ borderRadius: 4, borderWidth: 1, borderColor: theme.colors.onBackground }}><Picker

          style={{ backgroundColor: theme.colors.background, color: theme.colors.onBackground }}
          dropdownIconColor={theme.colors.onBackground}
          dropdownIconRippleColor={theme.colors.onBackground}
          selectedValue={fondi}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex !== 0) {
              setFondi(itemValue)
            }
          }

          }>
          {fondiList.map((item, index) => (
            index === 0 ? (
              <Picker.Item className="bg-black" enabled={false} label={item.label} value={item.value} key={index} />
            ) : (
              <Picker.Item label={item.label} value={item.value} key={index} />
            )
          ))}
        </Picker></View></>)}

        <View className="h-[12px]" />

        <TextInput
          mode="outlined"
          label={<Text style={{ color: theme.colors.onBackground }}>Descrizione</Text>}
          placeholder="Che tipo di spesa era?"
          onChangeText={descrizione => setDescrizione(descrizione)}
          value={descrizione}
          outlineColor={theme.colors.onBackground}
          style={{ backgroundColor: theme.colors.background }}
          placeholderTextColor={theme.colors.onBackground}
          textColor={theme.colors.onBackground}
          right={<TextInput.Icon icon="pen" color={theme.colors.onBackground} />}
        />
        <View className="h-5" />
        <CurrencyInput
          value={costo}
          onChangeValue={setCosto}
          renderTextInput={textInputProps => <TextInput {...textInputProps}
            mode="outlined"
            outlineColor={theme.colors.onBackground}
            style={{ backgroundColor: theme.colors.background }}
            placeholderTextColor={theme.colors.onBackground}
            textColor={theme.colors.onBackground}
            right={<TextInput.Icon icon="cash" color={theme.colors.onBackground} />}
          />}
          renderText
          prefix="€"
          delimiter="."
          separator=","
          precision={2}
        />
        <View className="mb-3 mt-3" >
          <View className="mb-3" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {selectedImages.map((image, index) => (
              <TouchableOpacity style={{ width: '20%', padding: 5 }} key={index} onPress={() => handleImagePress(index)}>
                <View >
                  <Image source={{ uri: image }} style={{ width: '100%', aspectRatio: 1 }} />
                </View>
              </TouchableOpacity>
            ))}
          </View>



        </View>



      </SafeAreaView>
      <SafeAreaView className="flex-1 p-10 justify-end">
        <View className="flex flex-row mb-3 gap-2 ">
          <View className="flex-1">
            <View className="flex flex-col justify-center">
              <Button mode='outlined' icon={"image-multiple-outline"} onPress={handleImagePicker} textColor={theme.colors.onBackground} style={{ borderRadius: 3 }}>
                Da galleria
              </Button>
            </View>
          </View>
          <View className="flex flex-col justify-center">
            <View className="">
              <IconButton style={{ borderRadius: 3 }} size={26} className="m-0" icon={"camera"} mode='outlined' onPress={handleCameraOpen}  >
                Da fotocamera
              </IconButton>
            </View>
          </View>

        </View>
        <Button style={{ borderRadius: 3 }} textColor="black" mode="contained" loading={loadingAggiungi} icon={"plus"} onPress={() => { if (!loadingAggiungi) { handleAggiungiClick() } }}>
          Aggiungi
        </Button>
      </SafeAreaView>
    </Surface>
  )
}