import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TabBarBackground from '@/components/ui/TabBarBackground';
import Octicons from '@expo/vector-icons/Octicons';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4D4D4D', 
        tabBarInactiveTintColor: '#000000', 
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#8D5C01', 
          borderTopWidth: 0,         
          height: 60,                
        },
      }}
    >

      {/* Camera/Gallery Screen */}
      <Tabs.Screen
        name="Galerij"
        options={{
          title: 'Galerij',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="photo" color={color} />,
        }}
      />

      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="camera" color={color} />,
        }}
      />
    </Tabs>
  );
}
