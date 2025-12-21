import { Plus, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import * as Haptics from 'expo-haptics';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Task } from '../interfaces';

// Sidebar component props and behavior
// Used for selecting which categories are shown in the task list

type Props = {
  onClose: () => void;
  tasks: Task[];
  allCategories: string[];
  selectedCategories: string[] | null;
  onApplyCategories: (selection: string[] | null) => void;
  openAddCategory: () => void;
};

// Simple helper: count tasks that belong to a category
const getCategoryCount = (tasks: Task[], category: string) => tasks.filter(t => t.category === category).length;

export default function Sidebar({ onClose, tasks, allCategories, selectedCategories, onApplyCategories, openAddCategory }: Props) {
  // Local selection state: null means "All" is selected (no filters),
  // otherwise an array of category names is the active filter
  const [localSelected, setLocalSelected] = useState<string[] | null>(selectedCategories ?? null);

  // Keep local selection in sync if parent selection changes
  useEffect(() => {
    setLocalSelected(selectedCategories ?? null);
  }, [selectedCategories]);

  // Determines whether 'All' tasks view is active
  const isAllSelected = localSelected === null || (Array.isArray(localSelected) && localSelected.length === 0);

  // Toggle a category selection locally. 'All' toggles the special empty-selection state
  const toggleLocal = (category: string) => {
    if (category === 'All') {
      setLocalSelected([]);
      return;
    }

    setLocalSelected((prev: string[] | null) => {
      const cur: string[] = prev ?? [];
      if (cur.includes(category)) {
        const next = cur.filter((c: string) => c !== category);
        return next.length === 0 ? null : next;
      }
      return [...cur, category];
    });
  };

  // Apply current local selection back to parent and close
  const apply = () => {
    onApplyCategories(localSelected);
    onClose();
  };

  // Revert changes and close the sidebar
  const cancel = () => {
    setLocalSelected(selectedCategories ?? null);
    onClose();
  };

  return (
    <View className="flex-row flex-1">
      
      <Animated.View entering={SlideInLeft.duration(240)} exiting={SlideOutLeft.duration(200)} className="h-full bg-white w-72">
        <SafeAreaView className="flex-1">
          <View className="p-6 border-b border-indigo-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-gray-900">Categories</Text>
              <TouchableOpacity onPress={() => { Haptics.selectionAsync(); onClose(); }}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
            {/* 'All' is selected when no explicit categories are chosen (null) or user selected "All" (empty array) */}
            <TouchableOpacity
              onPress={() => { Haptics.selectionAsync(); toggleLocal('All'); }}
              className={isAllSelected ? 'mb-3 p-4 rounded-xl bg-indigo-600' : 'mb-3 p-4 rounded-xl bg-indigo-50'}
            >
              <View className="flex-row items-center justify-between">
                <Text className={isAllSelected ? 'text-base font-bold text-white' : 'text-base font-bold text-indigo-700'}>All Tasks</Text>
                <View className={isAllSelected ? 'bg-white px-3 py-1 rounded-full' : 'bg-indigo-100 px-3 py-1 rounded-full'}>
                  <Text className={isAllSelected ? 'text-sm font-bold text-gray-900' : 'text-sm font-bold text-indigo-700'}>{tasks.length}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {allCategories.map((category) => {
              const count = getCategoryCount(tasks, category);
              const isSelected = Array.isArray(localSelected) && localSelected.includes(category);

              return (
                <TouchableOpacity
                  key={category}
                  onPress={() => { Haptics.selectionAsync(); toggleLocal(category); }}
                  className={`mb-3 p-4 rounded-xl border-2 ${isSelected ? 'bg-indigo-600 border-transparent' : 'bg-indigo-50 border-indigo-100'}`}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className={isSelected ? 'text-base font-bold text-white' : 'text-base font-bold text-indigo-700'}>{category}</Text>
                    <View className={isSelected ? 'bg-white/20 px-3 py-1 rounded-full' : 'bg-indigo-100 px-3 py-1 rounded-full'}>
                      <Text className={isSelected ? 'text-sm font-bold text-white' : 'text-sm font-bold text-indigo-700'}>{count}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            <View className="flex-row mt-4 space-x-3">
              <TouchableOpacity onPress={() => { Haptics.selectionAsync(); cancel(); }} className="items-center flex-1 py-3 bg-indigo-50 rounded-xl">
                <Text className="font-bold text-indigo-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { Haptics.selectionAsync(); apply(); }} className="items-center flex-1 py-3 bg-indigo-600 rounded-xl">
                <Text className="font-bold text-white">Apply</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { Haptics.selectionAsync(); openAddCategory(); }} className="items-center p-4 mt-4 border-2 border-indigo-200 border-dashed rounded-xl">
              <Plus size={24} color="#6366F1" />
              <Text className="mt-2 text-sm font-semibold text-indigo-700">Add Category</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
      <TouchableOpacity activeOpacity={1} onPress={() => { Haptics.selectionAsync(); onClose(); }} className="flex-1 bg-black/50" />
    </View>
  );
}
