import React, {useState, useCallback, useEffect} from 'react';
import {TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useBellyApi from './useBelyApi';
import {ToastContext} from './Toast';

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#111',
    borderWidth: 2,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  submitButton: {
    backgroundColor: 'purple',
    padding: 10,
    margin: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const UrlShortenerScreen = ({onSuccess}) => {
  const [inputText, setInputText] = useState('');
  const [
    {data: newShortenedUrlData, isLoading, errorType, timestamp},
    setUrlToShorten,
  ] = useBellyApi('shorten');
  const setToast = React.useContext(ToastContext);

  const onPressSubmitButton = useCallback(() => {
    setUrlToShorten(inputText);
  }, [setUrlToShorten, inputText]);
  const buttonText = isLoading ? 'loading...' : 'Shorten';

  useEffect(() => {
    let errorText;
    switch (errorType) {
      case 'cancel':
        break;
      case 'fetch':
        break;
      case 'invalid':
        errorText = 'Unable to shorten that link. It is not a valid url.';
        break;
      default:
        errorText = '';
    }
    if (errorText) {
      setToast({content: errorText, timestamp});
    } else {
      newShortenedUrlData.short_url && onSuccess(newShortenedUrlData);
    }
  }, [errorType, timestamp, setToast, onSuccess, newShortenedUrlData]);
  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder="Shorten your link"
        placeholderTextColor="#999"
        onChangeText={setInputText}
        returnKeyType="go"
        onSubmitEditing={onPressSubmitButton}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={onPressSubmitButton}
      >
        <Text style={styles.submitButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </>
  );
};

export default UrlShortenerScreen;
