import * as Haptics from 'expo-haptics';
import { Circle, CircleCheck, Tag, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { Task } from '../interfaces';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  // TaskItem component
  // - Renders one task card with title, category and a status chip
  // - onToggle: called when user toggles completion
  // - onDelete: called when user deletes the task
  
  // Animated container: fade and layout animations for smooth list updates
  return (
    <Animated.View
      key={task.id}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify()}
      className={`bg-white rounded-2xl p-5 mb-3 border border-gray-100 ${task.completed ? 'opacity-90' : ''}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3
      }}
    >
      <View className="flex-row items-start">
        {/* Toggle completion: provide light haptic feedback then toggle task state */}
        <TouchableOpacity onPress={() => { Haptics.selectionAsync(); onToggle(task.id); }} className="mt-0.5 mr-3">
          {task.completed ? (
            <CircleCheck size={26} color="#10B981" fill="#10B981" />
          ) : (
            <Circle size={26} color="#6366F1" strokeWidth={2} />
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <Text className={`text-[16px] font-semibold leading-6 mb-1.5 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </Text>

          <View className="flex-row flex-wrap items-center mt-1.5">
            <View className="bg-indigo-50 px-3 py-1.5 rounded-full flex-row items-center mr-2 mb-2 border border-indigo-100">
              <Tag size={12} color="#6366F1" />
              <Text className="ml-1 text-xs font-semibold text-indigo-700">{task.category}</Text>
            </View>
            {task.completed ? (
              <View className="px-2.5 py-1 rounded-full bg-green-50 border border-green-100 mr-2 mb-2">
                <Text className="text-[11px] font-semibold text-green-600">Completed</Text>
              </View>
            ) : (
              <View className="px-2.5 py-1 rounded-full bg-gray-100 mr-2 mb-2">
                <Text className="text-[11px] font-semibold text-gray-700">Active</Text>
              </View>
            )}
          </View>
        </View>

        {/* Delete button: impact haptic then call onDelete to remove the task */}
        <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); onDelete(task.id); }} className="p-2 ml-2 border border-red-100 rounded-lg bg-red-50">
          <Trash2 size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
