import * as Haptics from 'expo-haptics';
import { CheckCircle, Circle, Square, X } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

// Modal to choose completion filters (All / Incomplete / Completed)
// Simple modal that allows resetting or applying a chosen filter

type Props = {
  visible: boolean;
  onClose: () => void;
  initialCompletionFilter: string;
  onApply: (s: string) => void;
  resetAll: () => void;
};

export default function FilterModal({ visible, onClose, initialCompletionFilter, onApply, resetAll }: Props) {
  // Local selection for which completion filter is active
  const [selection, setSelection] = React.useState<string>(initialCompletionFilter);

  // Reset local selection when modal opens or initial filter changes
  React.useEffect(() => {
    if (visible) setSelection(initialCompletionFilter);
  }, [visible, initialCompletionFilter]);

  if (!visible) return null; // Not strictly necessary when parent controls Modal

  return (
    <View className="items-center justify-center flex-1 px-6 bg-black/50">
      <Animated.View entering={FadeInDown.duration(220)} exiting={FadeOutUp.duration(200)} className="w-full p-6 bg-white rounded-2xl" style={{ maxHeight: '70%' }}>
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">Filters</Text>
          <TouchableOpacity onPress={() => { Haptics.selectionAsync(); onClose(); }}>
            <X size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="mb-3 text-sm font-bold text-gray-700">Task Status</Text>
            <View className="flex-row flex-wrap">
              {/* Options for completion filter */}
              {[
                { id: 'all', label: 'All Tasks', icon: Square },
                { id: 'incomplete', label: 'Incomplete', icon: Circle },
                { id: 'completed', label: 'Completed', icon: CheckCircle }
              ].map(item => (
                <TouchableOpacity key={item.id} onPress={() => { Haptics.selectionAsync(); setSelection(item.id); }} className={`mr-2 mb-2 px-4 py-3 rounded-xl flex-row items-center ${selection === item.id ? 'bg-indigo-600' : 'bg-indigo-50'}`}>
                  <item.icon size={18} color={selection === item.id ? '#FFF' : '#6366F1'} />
                  <Text className={`ml-2 font-semibold ${selection === item.id ? 'text-white' : 'text-indigo-700'}`}>{item.label}</Text>
                </TouchableOpacity>
              ))} 
            </View>
          </View>

          {/* Reset all filters to defaults */}
          <TouchableOpacity onPress={() => { Haptics.selectionAsync(); resetAll(); }} className="items-center py-4 border border-red-200 bg-red-50 rounded-xl mb-4">
            <Text className="font-bold text-red-600">Reset All Filters</Text>
          </TouchableOpacity>

          {/* Apply selection and close modal */}
          <TouchableOpacity onPress={() => { Haptics.selectionAsync(); onApply(selection); onClose(); }} className="items-center py-4 bg-indigo-600 rounded-xl">
            <Text className="font-bold text-white">Apply</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
