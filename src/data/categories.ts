import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Castle,
  Flower2,
  House,
  Lamp,
  Mountain,
  Palmtree,
  Sailboat,
  Sparkles,
  Sunrise,
  TreePine,
  Warehouse,
  Waves,
  Wind,
} from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { id: "homes", label: "Homes", icon: House },
  { id: "beach", label: "Beachfront", icon: Palmtree },
  { id: "pools", label: "Amazing pools", icon: Waves },
  { id: "design", label: "Design", icon: Lamp },
  { id: "gardens", label: "Gardens", icon: Flower2 },
  { id: "city", label: "Iconic cities", icon: Building2 },
  { id: "tiny", label: "Tiny homes", icon: Warehouse },
  { id: "cabins", label: "Cabins", icon: TreePine },
  { id: "mansions", label: "Mansions", icon: Castle },
  { id: "views", label: "Amazing views", icon: Sunrise },
  { id: "lake", label: "Lakefront", icon: Sailboat },
  { id: "countryside", label: "Countryside", icon: Mountain },
  { id: "surfing", label: "Surfing", icon: Wind },
  { id: "omg", label: "OMG!", icon: Sparkles },
];

export function categoryLabel(id: string): string {
  return categories.find((category) => category.id === id)?.label ?? "Homes";
}
