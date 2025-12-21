export const COLORS = {
  primary: '#4F39F6',
  primaryLight: '#8B5CF6',
  primaryDark: '#3E2DC4',
  primaryDarker: '#2D1F8C',
  background: {
    light: '#f8fafc',
    lighter: '#f1f5f9',
    white: '#ffffff',
  },
  text: {
    primary: '#1a202c',
    secondary: '#475569',
    muted: '#64748b',
    light: '#94a3b8',
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
  },
} as const;

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #4F39F6 0%, #8B5CF6 100%)',
  primaryHover: 'linear-gradient(135deg, #3E2DC4 0%, #2D1F8C 100%)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
  card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
} as const;

export const BORDER_RADIUS = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '20px',
  full: '50%',
} as const;

export const SHADOWS = {
  sm: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 8px 25px rgba(0,0,0,0.1)',
  xl: '0 4px 20px rgba(0,0,0,0.08)',
  purple: '0 4px 12px rgba(79, 57, 246, 0.3)',
  purpleHover: '0 6px 16px rgba(79, 57, 246, 0.4)',
} as const;
