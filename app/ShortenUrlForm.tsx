import React, {useState, useCallback, useEffect} from 'react';
import {TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import useBellyApi from './useBelyApi';
import {ToastContext, ToastContextType} from './Toast';

export const testIDTextInput = 'shortenUrlFormTextInput';
export const testIDButton = 'shortenUrlFormTButton';
export const testIDButtonText = 'shortenUrlFormTButtonText';
export const textButtonLoading = 'loading...';
export const textButtonNormal = 'Shorten';

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
const UrlShortenerScreen = () => {
  const [inputText, setInputText] = useState('');
  const {isLoading, errorData, addItem} = useBellyApi();
  const setToast = React.useContext(ToastContext) as ToastContextType;
  const onPressSubmitButton = useCallback(() => {
    addItem(inputText);
  }, [addItem, inputText]);
  const buttonText = isLoading ? textButtonLoading : textButtonNormal;

  useEffect(() => {
    let errorText;
    const {errorType} = errorData;
    switch (errorType) {
      case 'cancel':
        break;
      case 'fetch':
        errorText =
          'There was a problem processing your request. Please try again.';
        break;
      case 'invalidUrl':
        errorText = `Unable to shorten that link. It is not a valid url. ${inputText}`;
        break;
      default:
        errorText = '';
    }
    errorText && setToast({text: errorText, isError: true});
  }, [errorData, setToast]);
  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder="Shorten your link"
        placeholderTextColor="#999"
        onChangeText={setInputText}
        returnKeyType="go"
        onSubmitEditing={onPressSubmitButton}
        autoCapitalize="none"
        spellCheck={false}
        testID={testIDTextInput}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={onPressSubmitButton}
        testID={testIDButton}
      >
        <Text style={styles.submitButtonText} testID={testIDButtonText}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default UrlShortenerScreen;
