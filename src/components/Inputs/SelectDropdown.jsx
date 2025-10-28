import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ArrowDown01Icon, ArrowUp01Icon } from 'hugeicons-react-native';

const SelectDropdown = ({
  label,
  placeholder = "Select option",
  options = [],
  value,
  onSelect,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-text1 font-poppinsMedium text-sm mb-2">
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="border border-gray-300 rounded-lg px-4 py-3.5 bg-white flex-row items-center justify-between"
      >
        <Text className={`font-poppins text-base ${selectedOption ? 'text-text1' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {isOpen ? (
          <ArrowUp01Icon size={20} color="#62748E" />
        ) : (
          <ArrowDown01Icon size={20} color="#62748E" />
        )}
      </TouchableOpacity>
      
      {error && (
        <Text className="text-primary2 font-poppins text-xs mt-1">
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center px-4"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="bg-white rounded-lg max-h-80">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className="px-4 py-3 border-b border-gray-100"
                >
                  <Text className="text-text1 font-poppins text-base">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SelectDropdown;