import * as Haptics from 'expo-haptics';
import { CheckSquare, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';



import AddCategoryModal from '../components/AddCategoryModal';
import AddTaskModal from '../components/AddTaskModal';
import FilterModal from '../components/FilterModal';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';

import { SafeAreaView } from 'react-native-safe-area-context';
import { INITIAL_TASKS } from '../constants';
import { Task } from '../interfaces';

export default function ModalScreen() {
  // App state: tasks and visibility flags for UI panels
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Current filters: selected categories and completion state
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(null);
  const [completionFilter, setCompletionFilter] = useState<'all'|'completed'|'incomplete'>('all');

  // User-created categories (starts from task categories)
  const [categories, setCategories] = useState<string[]>(() => Array.from(new Set(tasks.map(t => t.category))));

  // Combined categories (user + found on tasks)
  const allCategories = [...new Set([...categories, ...tasks.map(t => t.category)])];

  // Add a new category if non-empty and not a duplicate
  const handleCreateCategory = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || allCategories.includes(trimmed)) return;
    setCategories(prev => [trimmed, ...prev]);
    setCategoryModalVisible(false);
  };

  // Return tasks after applying category and completion filters
  const getFilteredTasks = () => {
    let filtered = tasks.slice();

    if (selectedCategories && selectedCategories.length > 0) filtered = filtered.filter(t => selectedCategories.includes(t.category));

    if (completionFilter === 'completed') filtered = filtered.filter(t => t.completed);
    else if (completionFilter === 'incomplete') filtered = filtered.filter(t => !t.completed);

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  // Toggle a task's completed flag
  const toggleTaskComplete = (id: string) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  // Remove task by id
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  // Add a new task at the top of the list, then close the add-task modal
  const handleCreateTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
    setModalVisible(false);
  };


  // Small helper to count active non-default filters (used for badge in header)
  const getActiveFilterCount = () => {

    let count = 0;
    if (completionFilter !== 'all') count++;
    return count;
  };

  const fabScale = useSharedValue(1);
  const fabAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: fabScale.value }] }));

  return (
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="dark-content" />
         
        <Header onOpenSidebar={() => setSidebarVisible(true)} onOpenFilters={() => setFilterModalVisible(true)} activeCount={getActiveFilterCount()} activeTasks={filteredTasks.filter(t => !t.completed).length} completedTasks={filteredTasks.filter(t => t.completed).length} />

        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>

          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggleTaskComplete} onDelete={deleteTask} />
          ))}

          {filteredTasks.length === 0 && (
            <View className="items-center justify-center py-20">
              <View className="p-6 mb-4 rounded-full bg-indigo-50"><CheckSquare size={48} color="#6366F1" /></View>
              <Text className="text-xl font-semibold text-gray-700">No tasks found</Text>
              <Text className="mt-2 text-sm text-gray-500">Try adjusting your filters or add a new task</Text>
            </View>
          )}

          <View className="h-24" />
        </ScrollView>

        {/* Floating action button: opens the add-task modal */}
        <Animated.View style={[fabAnimatedStyle, { position: 'absolute', bottom: 24, right: 24 }] }>
          {/* Pressing: haptic feedback and scale animation */}
          <TouchableOpacity
            onPress={() => { Haptics.selectionAsync(); setModalVisible(true); }}
            onPressIn={() => { fabScale.value = withSpring(0.95); }}
            onPressOut={() => { fabScale.value = withSpring(1); }}
            className="p-5 bg-indigo-600 rounded-full"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}
          >
            <Plus size={28} color="#FFF" strokeWidth={2.5} />
          </TouchableOpacity>
        </Animated.View>

        {/* Sidebar with category selection and add-category action */}
        <Modal animationType="none" transparent visible={sidebarVisible} onRequestClose={() => setSidebarVisible(false)}>
          <Sidebar onClose={() => setSidebarVisible(false)} tasks={tasks} allCategories={allCategories} selectedCategories={selectedCategories} onApplyCategories={(s) => setSelectedCategories(s)} openAddCategory={() => { setSidebarVisible(false); setCategoryModalVisible(true); }} />
        </Modal>

        {/* Filter modal: pick completion state and reset filters */}
        <Modal animationType="slide" transparent visible={filterModalVisible} onRequestClose={() => setFilterModalVisible(false)}>
          <FilterModal visible={filterModalVisible} onClose={() => setFilterModalVisible(false)} initialCompletionFilter={completionFilter} onApply={(s) => { setCompletionFilter(s as any); setFilterModalVisible(false); }} resetAll={() => { setCompletionFilter('all'); setSelectedCategories(null); setFilterModalVisible(false); }} />
        </Modal>

        {/* Add-task modal */}
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} allCategories={allCategories} onCreateTask={handleCreateTask} />
        </Modal>

        {/* Add-category modal */}
        <Modal animationType="none" transparent visible={categoryModalVisible} onRequestClose={() => setCategoryModalVisible(false)}>
          <AddCategoryModal visible={categoryModalVisible} onClose={() => setCategoryModalVisible(false)} allCategories={allCategories} onCreateCategory={handleCreateCategory} />
        </Modal>
      </SafeAreaView>
  );
}
