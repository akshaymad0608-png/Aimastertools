import React from 'react';
import {
  Share2, Workflow, Mail, MessageCircle, PenTool, Image as ImageIcon, Video, Music,
  Code2, Bot, Search, BarChart3, Briefcase, GraduationCap, Megaphone, ShoppingCart,
  Users, Headphones, FileText, Mic, Palette, Presentation, Database, Globe,
  Sparkles, Brain, Camera, Film, LineChart, Building2, Scale, Stethoscope,
  Wallet, Plane, Home as HomeIcon, Languages, Calendar, Layers, Zap, Shield,
  Clapperboard, BookOpen, Wrench, type LucideIcon,
} from 'lucide-react';

/**
 * The category data carries Tabler icon *class names* ("ti-share") from an
 * earlier build, but the site renders Lucide components everywhere else. Rather
 * than load a second icon font for one grid, categories are matched to a Lucide
 * component by keyword. Matching is on the name, so a category added to the data
 * tomorrow gets a sensible icon without anyone editing this file.
 */
const RULES: [RegExp, LucideIcon][] = [
  [/social|community/i, Share2],
  [/workflow|automat/i, Workflow],
  [/email|newsletter/i, Mail],
  [/whatsapp|chat|messag|conversation/i, MessageCircle],
  [/writ|copy|content|blog/i, PenTool],
  [/image|art|photo|design|logo/i, ImageIcon],
  [/video|film|movie/i, Video],
  [/audio|music|sound/i, Music],
  [/voice|speech|podcast|transcri/i, Mic],
  [/code|develop|program|dev/i, Code2],
  [/agent|assistant|chatbot|bot/i, Bot],
  [/search|seo|discover/i, Search],
  [/analytic|data|dashboard|bi\b/i, BarChart3],
  [/business|productiv|collab|office/i, Briefcase],
  [/educat|learn|student|course|study/i, GraduationCap],
  [/market|advertis|ads|growth/i, Megaphone],
  [/ecommerce|shop|retail|store/i, ShoppingCart],
  [/hr|recruit|hiring|people/i, Users],
  [/support|service|helpdesk/i, Headphones],
  [/document|pdf|note|summar/i, FileText],
  [/present|slide|deck/i, Presentation],
  [/database|sql|storage|infra/i, Database],
  [/web|site|landing|no.?code/i, Globe],
  [/llm|model|api|provider/i, Brain],
  [/finance|account|invoic|money|tax/i, Wallet],
  [/legal|law|contract/i, Scale],
  [/health|medic|fitness|therap/i, Stethoscope],
  [/real.?estate|property|architect|interior/i, HomeIcon],
  [/travel|trip|hotel/i, Plane],
  [/translat|language/i, Languages],
  [/calendar|schedul|meeting|time/i, Calendar],
  [/security|privacy|detect/i, Shield],
  [/edit|editor|studio/i, Clapperboard],
  [/research|paper|science|academ/i, BookOpen],
  [/tool|utility|misc/i, Wrench],
  [/photo|camera/i, Camera],
  [/trend|stock|invest|market/i, LineChart],
  [/enterprise|company|corporate/i, Building2],
  [/creative|generat/i, Palette],
  [/film|cinema/i, Film],
  [/fast|instant|quick/i, Zap],
];

export const iconFor = (name: string): LucideIcon => {
  for (const [pattern, Icon] of RULES) {
    if (pattern.test(name)) return Icon;
  }
  return Layers;
};

interface CategoryIconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  color,
  size = 18,
  className,
}) => {
  const Icon = iconFor(name);
  return (
    <Icon
      size={size}
      strokeWidth={1.75}
      aria-hidden="true"
      className={className}
      style={{ color: color || 'var(--color-primary)' }}
    />
  );
};

export default CategoryIcon;
