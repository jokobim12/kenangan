'use client';

import React from 'react';
import {
  Heart,
  GraduationCap,
  Plane,
  Users,
  FolderOpen,
  Camera,
  Music,
  Star,
  Home,
  Briefcase,
  Coffee,
  Sun,
  Moon,
  Mountain,
  TreePine,
  Baby,
  Cake,
  Gift,
  Trophy,
  Gamepad2,
  Book,
  Utensils,
  Car,
  Bike,
  Ship,
  MapPin,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ size?: number; color?: string }>> = {
  heart: Heart,
  'graduation-cap': GraduationCap,
  plane: Plane,
  users: Users,
  folder: FolderOpen,
  camera: Camera,
  music: Music,
  star: Star,
  home: Home,
  briefcase: Briefcase,
  coffee: Coffee,
  sun: Sun,
  moon: Moon,
  mountain: Mountain,
  tree: TreePine,
  baby: Baby,
  cake: Cake,
  gift: Gift,
  trophy: Trophy,
  gamepad: Gamepad2,
  book: Book,
  utensils: Utensils,
  car: Car,
  bike: Bike,
  ship: Ship,
  'map-pin': MapPin,
};

// Export list for admin dropdown
export const availableIcons = Object.keys(iconMap);

interface CategoryIconProps {
  name: string;
  size?: number;
  color?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ name, size = 24, color }) => {
  const IconComponent = iconMap[name] || FolderOpen;
  return <IconComponent size={size} color={color} />;
};

export default CategoryIcon;
