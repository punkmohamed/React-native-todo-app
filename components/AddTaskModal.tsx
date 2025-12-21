import * as Haptics from 'expo-haptics';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { Task } from '../interfaces';

// Modal to create a new task. Keeps local title/category state and calls onCreateTask when added.

type Props = {
  visible: boolean;
  onClose: () => void;
  allCategories: string[];
  onCreateTask: (task: Task) => void;
};

export default function AddTaskModal({ visible, onClose, allCategories, onCreateTask }: Props) {
  // Local input state for new task
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>(allCategories[0] ?? 'Work');

  // Reset inputs when modal opens or categories change
  useEffect(() => {
    if (visible) {
      setTitle('');
      setCategory(allCategories[0] ?? 'Work');
    }
  }, [visible, allCategories]);

  // Validate input, create a simple Task object, call parent handler, then reset and close
  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const task: Task = { id: Date.now().toString(), title: trimmed, category, completed: false };

    onCreateTask(task);

    // reset local inputs and close
    setTitle('');
    setCategory(allCategories[0] ?? 'Work');
    onClose();
  };

  if (!visible) return null;

  return (
    <View className="items-center justify-center flex-1 px-6 bg-black/50">
      <Animated.View entering={FadeInDown.duration(220)} exiting={FadeOutUp.duration(200)} className="w-full p-6 bg-white rounded-2xl" style={{ maxHeight: '80%' }}>
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">New Task</Text>
          <TouchableOpacity onPress={() => { Haptics.selectionAsync(); setTitle(''); setCategory(allCategories[0] ?? 'Work'); onClose(); }}>
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-bold text-gray-700">Title</Text>
          <TextInput
            className="px-4 py-4 text-base border border-indigo-100 bg-indigo-50 rounded-xl"
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            multiline
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-sm font-bold text-gray-700">Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allCategories.map(cat => {
              const isSelected = category === cat;
              return (
                <TouchableOpacity key={cat} onPress={() => { Haptics.selectionAsync(); setCategory(cat); }} className={`mr-2 px-5 py-3 rounded-xl ${isSelected ? 'bg-indigo-600' : 'bg-indigo-50'}`}>
                  <Text className={`font-bold ${isSelected ? 'text-white' : 'text-indigo-700'}`}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity onPress={() => { Haptics.selectionAsync(); handleAdd(); }} className="items-center py-4 bg-indigo-600 rounded-xl">
          <Text className="text-base font-bold text-white">Add Task</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
