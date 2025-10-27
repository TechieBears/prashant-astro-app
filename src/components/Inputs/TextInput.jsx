import React from 'react';
import { TextInput as RNTextInput, View, Text } from 'react-native';
import { Controller } from 'react-hook-form';

const TextInput = ({
  control,
  name,
  placeholder,
  label,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  containerStyle = '',
  inputStyle = '',
  labelStyle = '',
  errorStyle = '',
  Icon, 
  iconStyle = '', 
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className={`mb-2 ${containerStyle}`}>
          {label && (
            <Text className={`text-text1 font-poppinsMedium text-sm mb-1 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View className="border border-gray-300 rounded-lg px-4 py-1.5 text-text1 font-poppins text-base bg-white flex-row items-center">
            {/* If Icon is passed as a JSX element, render it */}
            {Icon && <View className={`mr-1 ${iconStyle}`}>{Icon}</View>}
            <RNTextInput
              className={`flex-1 px-3 py-2 border-0 bg-transparent ${error ? 'border-primary2' : 'border-gray-300'} ${inputStyle}`}
              placeholder={placeholder}
              placeholderTextColor="#62748E"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              multiline={multiline}
              numberOfLines={numberOfLines}
              editable={editable}
              {...props}
            />
          </View>
          {error && (
            <Text className={`text-primary2 font-poppins text-xs mt-1 ${errorStyle}`}>
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default TextInput;
