import React, {useState, useCallback, useEffect} from 'react';
import {TextInput, Text, StyleSheet, TouchableHighlight} from 'react-native';
import useBellyApi from './useBelyApi';
import {ToastContext, ToastContextType} from './Toast';

export const testIDTextInput = 'shortenUrlFormTextInput';
export const testIDButton = 'shortenUrlFormTButton';
export const testIDButtonText = 'shortenUrlFormTButtonText';
export const textButtonLoading = 'loading...';
export const textButtonNormal = 'Shorten';
export const textInvalidUrl =
  'Unable to shorten that link. It is not a valid url. ';

const buttonStyle = {
  backgroundColor: '#FF4D4F',
  borderRadius: 4,
  borderWidth: 4,
  borderColor: '#fff',
  padding: 10,
};
const styles = StyleSheet.create({
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 2,
    borderRadius: 4,
    paddingHorizontal: 13,
    paddingVertical: 13,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  submitButton: buttonStyle,
  submitButtonLoading: {
    ...buttonStyle,
    backgroundColor: '#666',
    borderColor: '#666',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
const emptyObject = {};
const UrlShortenerScreen = () => {
  const [inputText, setInputText] = useState('');
  const {isLoading, errorData, addItem} = useBellyApi();
  const setToast = React.useContext(ToastContext) as ToastContextType;
  const onPressSubmitButton = useCallback(() => {
    if (isLoading) {
      return;
    }
    addItem(inputText);
  }, [addItem, inputText, isLoading]);
  const buttonText = isLoading ? textButtonLoading : textButtonNormal;

  useEffect(() => {
    let errorText;
    const {errorType} = errorData;
    if (!errorType) {
      setToast(emptyObject);
      return;
    }
    switch (errorType) {
      case 'cancel':
        break;
      case 'fetch':
        errorText =
          'There was a problem processing your request. Please try again.';
        break;
      case 'invalidUrl':
        errorText = `${textInvalidUrl}`;
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
        autoCompleteType="off"
        autoCorrect={false}
        spellCheck={false}
        clearButtonMode="always"
        testID={testIDTextInput}
        dataDetectorTypes="link"
      />
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={isLoading ? '#666' : '#FF2729'}
        style={isLoading ? styles.submitButtonLoading : styles.submitButton}
        onPress={onPressSubmitButton}
        testID={testIDButton}
      >
        <Text style={styles.submitButtonText} testID={testIDButtonText}>
          {buttonText}
        </Text>
      </TouchableHighlight>
    </>
  );
};

export default UrlShortenerScreen;
