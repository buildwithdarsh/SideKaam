"use client";

import {
  Code, Briefcase, Award, Crown, TrendingUp, Wallet, Banknote, Coins,
  IndianRupee, Scale, Shield, Laptop, Home, GraduationCap, FolderOpen, MapPin,
  Building2, Repeat, Ban, Clock, Globe, Map, Heart, PiggyBank,
  CheckCircle, XCircle, HelpCircle, Hourglass, Clock3, Clock8, Calendar,
  Monitor, Palette, BarChart3, PenLine, Landmark, Rocket, Handshake,
  BookOpen, Stethoscope, Video, Smartphone, Keyboard, Headphones, Camera,
  Building, Dumbbell, Calculator, Wrench, Flame, Book, FileBadge, Trophy,
  BadgeCheck, Zap, CircleDot, Search, RefreshCw, Moon, Users, User, Minus,
  TreePalm, HeartPulse, Baby, PartyPopper, ShoppingBag,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  code: Code, briefcase: Briefcase, award: Award, crown: Crown,
  "trending-up": TrendingUp, wallet: Wallet, banknote: Banknote, coins: Coins,
  "indian-rupee": IndianRupee, scale: Scale, shield: Shield, laptop: Laptop,
  home: Home, "graduation-cap": GraduationCap, "folder-open": FolderOpen,
  "map-pin": MapPin, "building-2": Building2, repeat: Repeat,
  "car-off": Ban, clock: Clock, globe: Globe, map: Map, heart: Heart,
  "piggy-bank": PiggyBank, "check-circle": CheckCircle, "x-circle": XCircle,
  "help-circle": HelpCircle, hourglass: Hourglass, "clock-3": Clock3,
  "clock-8": Clock8, calendar: Calendar, monitor: Monitor, palette: Palette,
  "bar-chart-3": BarChart3, "pen-line": PenLine, landmark: Landmark,
  rocket: Rocket, handshake: Handshake, "book-open": BookOpen,
  stethoscope: Stethoscope, video: Video, smartphone: Smartphone,
  keyboard: Keyboard, headphones: Headphones, camera: Camera,
  building: Building, dumbbell: Dumbbell, calculator: Calculator,
  wrench: Wrench, flame: Flame, book: Book, "file-badge": FileBadge,
  trophy: Trophy, "badge-check": BadgeCheck, zap: Zap,
  "circle-dot": CircleDot, search: Search, "refresh-cw": RefreshCw,
  moon: Moon, users: Users, user: User, minus: Minus,
  "palm-tree": TreePalm, "heart-pulse": HeartPulse, baby: Baby,
  "party-popper": PartyPopper, "shopping-bag": ShoppingBag,
};

interface Props {
  name: string;
  className?: string;
}

export function OptionIcon({ name, className = "h-5 w-5" }: Props) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
