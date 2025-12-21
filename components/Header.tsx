import * as Haptics from 'expo-haptics';
import { Filter, Menu } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Logo from './Logo';

// Header bar with app title, counts, and quick actions (menu + filters)

type Props = {
  onOpenSidebar: () => void;
  onOpenFilters: () => void;
  activeCount: number;
  activeTasks: number;
  completedTasks: number;
};

export default function Header({ onOpenSidebar, onOpenFilters, activeCount, activeTasks, completedTasks }: Props) {
  const menuScale = useSharedValue(1);
  const filterScale = useSharedValue(1);
  const menuAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: menuScale.value }] }));
  const filterAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: filterScale.value }] }));

  return (
    <View className="px-6 py-4 bg-white border-b border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Animated.View style={menuAnimatedStyle}>              {/* Menu button: opens sidebar, with light haptic and scale animation */}            <TouchableOpacity
              onPress={() => { Haptics.selectionAsync(); onOpenSidebar(); }}
              onPressIn={() => { menuScale.value = withSpring(0.95); }}
              onPressOut={() => { menuScale.value = withSpring(1); }}
              className="p-2 mr-4 border border-indigo-100 bg-indigo-50 rounded-xl"
            >
              <Menu size={24} color="#1F2937" />
            </TouchableOpacity>
          </Animated.View>

          <View className="flex-row items-center">
            <Logo size={40} />
            <View className="ml-3">
              <Text className="text-2xl font-bold tracking-tight text-gray-900">TaskFlow</Text>
              <View className="flex-row mt-2">
                <View className="px-2.5 py-1 mr-2 bg-gray-100 rounded-full">
                  <Text className="text-xs font-semibold text-gray-700">{activeTasks} active</Text>
                </View>
                <View className="px-2.5 py-1 bg-gray-100 rounded-full">
                  <Text className="text-xs font-semibold text-gray-700">{completedTasks} completed</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Animated.View style={filterAnimatedStyle}>
          {/* Filters button: opens filter panel; shows a red badge when active filters exist */}
          <TouchableOpacity
            onPress={() => { Haptics.selectionAsync(); onOpenFilters(); }}
            onPressIn={() => { filterScale.value = withSpring(0.95); }}
            onPressOut={() => { filterScale.value = withSpring(1); }}
            className="relative p-3 bg-indigo-600 shadow-sm rounded-xl"
          >
            <Filter size={20} color="#FFF" />
            {activeCount > 0 && (
              <View className="absolute items-center justify-center w-5 h-5 bg-red-500 rounded-full -top-1 -right-1">
                <Text className="text-xs font-bold text-white">{activeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
