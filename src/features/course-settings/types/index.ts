export interface CourseSettings {
  courseDetails: {
    title: string;
    description: string;
    category: string;
    tags: string[];
  };
  expiration: {
    enabled: boolean;
    days: number;
  };
  duration: {
    estimatedHours: number;
    selfPaced: boolean;
  };
  navigation: {
    type: 'free' | 'sequential' | 'unlocked';
    allowBacktracking: boolean;
  };
  completion: {
    criteria: 'all' | 'percentage';
    percentage?: number;
    requireAllLessons: boolean;
  };
  rating: {
    enabled: boolean;
    allowAnonymous: boolean;
  };
  certificates: {
    enabled: boolean;
    template: string;
    autoGenerate: boolean;
  };
  buttonText: {
    startButton: string;
    continueButton: string;
    completeButton: string;
  };
  acknowledgment: {
    enabled: boolean;
    message: string;
  };
}

export interface SettingsSectionProps {
  selected?: string;
  setSelected?: (value: string) => void;
  onDelete?: () => void;
}
