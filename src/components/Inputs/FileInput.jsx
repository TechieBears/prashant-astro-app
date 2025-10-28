import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DocumentAttachmentIcon } from 'hugeicons-react-native';

const FileInput = ({
  label,
  placeholder = "Choose file",
  onPress,
  selectedFile,
  error
}) => {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-text1 font-poppinsMedium text-sm mb-3">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={onPress}
        className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white flex-row items-center justify-between"
      >
        {/* Container for the text */}
        <View className="flex-row ">
          {/* Background only for the text */}
          <Text
            className={`font-poppins text-base p-1 px-4 rounded-lg ${selectedFile ? 'text-text1' : 'text-gray-400'} bg-slate-200`}
          >
            {selectedFile || 'Choose file'}
          </Text>
        </View>

        {/* Display selected file name or placeholder */}
        <Text
          className={`font-poppins text-base text-right p-1 ${selectedFile ? 'text-text1' : 'text-gray-400'}`}
        >
          {selectedFile || 'No file chosen'}
        </Text>
      </TouchableOpacity>


      {error && (
        <Text className="text-primary2 font-poppins text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default FileInput;
