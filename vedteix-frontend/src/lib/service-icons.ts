import {
  BrainCircuit,
  Cloud,
  Code,
  Gem,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  PenTool,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
  Wifi,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const serviceIconMap: Record<string, LucideIcon> = {
  Code,
  Smartphone,
  BrainCircuit,
  Gem,
  PenTool,
  Megaphone,
  Cloud,
  ShieldCheck,
  Wifi,
  Users,
  Lightbulb,
  HeartHandshake,
  Target,
};

export const serviceIconOptions = Object.keys(serviceIconMap);
