import * as Haptics from 'expo-haptics';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

// Modal to add a new category. Prevents duplicates and resets on open

type Props = {
  visible: boolean;
  onClose: () => void;
  allCategories: string[];
  onCreateCategory: (name: string) => void;
};

export default function AddCategoryModal({ visible, onClose, allCategories, onCreateCategory }: Props) {
  // Input state and duplicate check
  const [name, setName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Reset when modal opens
  useEffect(() => {
    if (visible) {
      setName('');
      setIsDuplicate(false);
    }
  }, [visible]);

  // Mark as duplicate if name exists in categories
  useEffect(() => {
    setIsDuplicate(allCategories.includes(name.trim()));
  }, [name, allCategories]);

  // Add category if name is non-empty and not a duplicate
  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed || isDuplicate) return;
    onCreateCategory(trimmed);
    setName('');
  };

  if (!visible) return null;

  return (
    <View className="items-center justify-center flex-1 px-6 bg-black/50">
      <Animated.View entering={FadeInDown.duration(220)} exiting={FadeOutUp.duration(200)} className="w-full p-6 bg-white rounded-2xl">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-gray-900">New Category</Text>
          <TouchableOpacity onPress={() => { Haptics.selectionAsync(); setName(''); onClose(); }}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TextInput
          className="px-4 py-4 mb-4 text-base border border-indigo-100 bg-indigo-50 rounded-xl"
          placeholder="Category name"
          value={name}
          onChangeText={(t) => { setName(t); }}
          placeholderTextColor="#94A3B8"
        />

        <View className="flex-row space-x-3">
          <TouchableOpacity onPress={() => { Haptics.selectionAsync(); setName(''); onClose(); }} className="items-center flex-1 py-4 bg-indigo-50 rounded-xl">
            <Text className="font-bold text-indigo-700">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { if (isDuplicate) return; Haptics.selectionAsync(); handleAdd(); }} className={`items-center flex-1 py-4 rounded-xl ${isDuplicate ? 'bg-indigo-100' : 'bg-indigo-600'}`}>
            <Text className={`font-bold ${isDuplicate ? 'text-indigo-700' : 'text-white'}`}>{isDuplicate ? 'Duplicate' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
