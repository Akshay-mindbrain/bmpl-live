// Design Configuration
// Hey there! This is where all the magic happens for our design consistency.
// It now support multiple themes! Just toggle the ACTIVE_THEME at the bottom of the colors section.

// ==============================================
// THEME DEFINTIONS
// ==============================================

// --- 1. VIBRANT BLUE (Vibrant, Creative Blue Gradients) ---
export const THEME_VIBRANT_BLUE = {
    primary: {
        main: '#0D47A1',        // Royal Blue
        light: '#1976D2',
        dark: '#002171',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#00B8D4',        // Cyan accent
        light: '#84FFFF',
        dark: '#00838F',
        contrastText: '#FFFFFF'
    },
    background: {
        default: '#FFFFFF',
        paper: '#F1F7FF',
        light: '#F8FBFF',
        green: '#E0F2F1',
        border: '#B3D4FF'
    },
    text: {
        primary: '#0D47A1',
        secondary: '#1A237E',
        disabled: '#9FA8DA',
        hint: '#C5CAE9'
    },
    gradients: {
        primary: 'linear-gradient(135deg, #002171 0%, #0D47A1 50%, #1976D2 100%)',
        secondary: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
        surface: 'linear-gradient(135deg, #F0F4FF 0%, #FFFFFF 100%)',
        dark: 'linear-gradient(135deg, #00153F 0%, #002171 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)'
    },
    shadows: {
        primary: '0 8px 24px rgba(13, 71, 161, 0.3)'
    }
};

// --- 2. SUNSET MIRAGE (Gold, Orange, Pink - Warm & Premium) ---
export const THEME_SUNSET_MIRAGE = {
    primary: {
        main: '#E65100',        // Deep Orange
        light: '#FFB74D',
        dark: '#BF360C',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#D81B60',        // Pink accent
        light: '#F06292',
        dark: '#880E4F',
        contrastText: '#FFFFFF'
    },
    background: {
        default: '#FFFFFF',
        paper: '#FFF3E0',
        light: '#FFF8E1',
        green: '#F1F8E9',
        border: '#FFE0B2'
    },
    text: {
        primary: '#4E342E',
        secondary: '#6D4C41',
        disabled: '#A1887F',
        hint: '#D7CCC8'
    },
    gradients: {
        primary: 'linear-gradient(135deg, #E65100 0%, #FF9800 50%, #FFB74D 100%)',
        secondary: 'linear-gradient(135deg, #D81B60 0%, #AD1457 100%)',
        surface: 'linear-gradient(135deg, #FFF8E1 0%, #FFFFFF 100%)',
        dark: 'linear-gradient(135deg, #BF360C 0%, #E65100 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
    },
    shadows: {
        primary: '0 8px 24px rgba(230, 81, 0, 0.3)'
    }
};

// --- 3. EMERALD FUSION (Teal, Green, Lime - Fresh & Tech) ---
export const THEME_EMERALD_FUSION = {
    primary: {
        main: '#00695C',        // Deep Teal
        light: '#4DB6AC',
        dark: '#004D40',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#76FF03',        // Lime accent
        light: '#B2FF59',
        dark: '#33691E',
        contrastText: '#000000'
    },
    background: {
        default: '#FFFFFF',
        paper: '#E0F2F1',
        light: '#F1F8F7',
        green: '#E8F5E9',
        border: '#B2DFDB'
    },
    text: {
        primary: '#004D40',
        secondary: '#00695C',
        disabled: '#80CBC4',
        hint: '#B2DFDB'
    },
    gradients: {
        primary: 'linear-gradient(135deg, #004D40 0%, #00695C 50%, #26A69A 100%)',
        secondary: 'linear-gradient(135deg, #76FF03 0%, #64DD17 100%)',
        surface: 'linear-gradient(135deg, #F1F8F7 0%, #FFFFFF 100%)',
        dark: 'linear-gradient(135deg, #00242C 0%, #004D40 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
    },
    shadows: {
        primary: '0 8px 24px rgba(0, 77, 64, 0.3)'
    }
};

// --- 4. ROYAL VELVET (Purple, Magenta, Indigo - Luxurious) ---
export const THEME_ROYAL_VELVET = {
    primary: {
        main: '#4A148C',        // Deep Purple
        light: '#9C27B0',
        dark: '#311B92',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#FF4081',        // Magenta accent
        light: '#FF80AB',
        dark: '#C51162',
        contrastText: '#FFFFFF'
    },
    background: {
        default: '#FFFFFF',
        paper: '#F3E5F5',
        light: '#FAFAFA',
        green: '#E8F5E9',
        border: '#E1BEE7'
    },
    text: {
        primary: '#4A148C',
        secondary: '#6A1B9A',
        disabled: '#CE93D8',
        hint: '#E1BEE7'
    },
    gradients: {
        primary: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #7B1FA2 100%)',
        secondary: 'linear-gradient(135deg, #FF4081 0%, #F50057 100%)',
        surface: 'linear-gradient(135deg, #F8F4FF 0%, #FFFFFF 100%)',
        dark: 'linear-gradient(135deg, #1A0033 0%, #311B92 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
    },
    shadows: {
        primary: '0 8px 24px rgba(74, 20, 140, 0.3)'
    }
};

// --- 5. MIDNIGHT AURORA (Dark Blue, Purple, Cyan - Modern Deep) ---
export const THEME_MIDNIGHT_AURORA = {
    primary: {
        main: '#1A237E',        // Indigo
        light: '#3949AB',
        dark: '#0D47A1',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#00E5FF',        // Bright Cyan
        light: '#84FFFF',
        dark: '#00B8D4',
        contrastText: '#000000'
    },
    background: {
        default: '#FFFFFF',
        paper: '#E8EAF6',
        light: '#F5F5F5',
        green: '#E8F5E9',
        border: '#C5CAE9'
    },
    text: {
        primary: '#1A237E',
        secondary: '#283593',
        disabled: '#9FA8DA',
        hint: '#C5CAE9'
    },
    gradients: {
        primary: 'linear-gradient(135deg, #0D47A1 0%, #1A237E 50%, #6200EA 100%)',
        secondary: 'linear-gradient(135deg, #00E5FF 0%, #00B0FF 100%)',
        surface: 'linear-gradient(135deg, #F0F2FF 0%, #FFFFFF 100%)',
        dark: 'linear-gradient(135deg, #000051 0%, #1A237E 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
    },
    shadows: {
        primary: '0 8px 24px rgba(26, 35, 126, 0.3)'
    }
};

// ==============================================
// FONT THEME DEFINITIONS
// ==============================================

export const FONT_TECH_MODERN = {
    primary: '"Inter", "Helvetica", "Arial", sans-serif',
    secondary: '"Inter", "Helvetica", "Arial", sans-serif',
    heading: '"Inter", "Helvetica", "Arial", sans-serif'
};

export const FONT_APP_BOLD = {
    primary: '"Inter", "Helvetica", "Arial", sans-serif',
    secondary: '"Inter", "Helvetica", "Arial", sans-serif',
    heading: '"Montserrat", "Helvetica", "Arial", sans-serif'
};

export const FONT_PREMIUM_SANS = {
    primary: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
    secondary: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
    heading: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif'
};

// ==============================================
// ACTIVE SELECTION
// ==============================================

// UNCOMMENT THE COLOR THEME YOU WANT TO USE
export const ACTIVE_THEME = THEME_VIBRANT_BLUE;
//export const ACTIVE_THEME = THEME_SUNSET_MIRAGE;
//export const ACTIVE_THEME = THEME_EMERALD_FUSION;
//export const ACTIVE_THEME = THEME_ROYAL_VELVET;
//export const ACTIVE_THEME = THEME_MIDNIGHT_AURORA;

// UNCOMMENT THE FONT THEME YOU WANT TO USE
//export const ACTIVE_FONT_THEME = FONT_TECH_MODERN;
//export const ACTIVE_FONT_THEME = FONT_APP_BOLD;
export const ACTIVE_FONT_THEME = FONT_PREMIUM_SANS;


/**
 * Utility to add alpha transparency to a hex color
 */
export const alpha = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const designConfig = {
    colors: {
        ...ACTIVE_THEME,
        success: {
            main: '#2E7D32',
            light: '#4CAF50',
            dark: '#1B5E20',
            background: '#E8F5E9'
        },
        error: {
            main: '#D32F2F',
            light: '#EF5350',
            dark: '#C62828',
            background: '#FFEBEE'
        },
        warning: {
            main: '#FBC02D',
            light: '#FFF176',
            dark: '#F57F17',
            background: '#FFFDE7'
        },
        info: {
            main: '#0288D1',
            light: '#03A9F4',
            dark: '#01579B',
            background: '#E1F5FE'
        },
        // Common UI element colors
        border: ACTIVE_THEME.background.border || '#E0E0E0',
        divider: alpha(ACTIVE_THEME.text.primary, 0.12),
        input: {
            background: '#ffffff',
            border: '#E0E0E0',
            focus: ACTIVE_THEME.primary.main
        },
        surfaces: {
            light: '#FAFAFA',
            white: '#FFFFFF',
            card: ACTIVE_THEME.background.paper
        }
    },

    typography: {
        fontFamily: ACTIVE_FONT_THEME,
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700,
            extraBold: 800,
            black: 900
        },
        fontSize: {
            xs: '0.7rem',
            sm: '0.75rem',
            base: '0.875rem',
            md: '0.9rem',
            lg: '1rem',
            xl: '1.125rem',
            '2xl': '1.25rem',
            '3xl': '1.5rem',
            '4xl': '1.75rem',
            '5xl': '2rem',
        },
        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.6,
            loose: 1.7,
            extraLoose: 2
        },
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        }
    },

    headings: {
        h1: {
            fontSize: { mobile: '1.75rem', tablet: '2rem', desktop: '2.5rem' },
            fontWeight: 800,
            lineHeight: 1.2,
            fontFamily: ACTIVE_FONT_THEME.heading,
            letterSpacing: '-0.025em'
        },
        h2: {
            fontSize: { mobile: '1.5rem', tablet: '1.75rem', desktop: '2rem' },
            fontWeight: 700,
            lineHeight: 1.3,
            fontFamily: ACTIVE_FONT_THEME.heading,
            letterSpacing: '-0.025em'
        },
        h3: {
            fontSize: { mobile: '1.25rem', tablet: '1.5rem', desktop: '1.75rem' },
            fontWeight: 700,
            lineHeight: 1.3,
            fontFamily: ACTIVE_FONT_THEME.heading,
            letterSpacing: 'normal'
        },
        h4: {
            fontSize: { mobile: '1.1rem', tablet: '1.25rem', desktop: '1.5rem' },
            fontWeight: 700,
            lineHeight: 1.4,
            fontFamily: ACTIVE_FONT_THEME.heading,
            letterSpacing: 'normal'
        },
        h5: {
            fontSize: { mobile: '1rem', tablet: '1.1rem', desktop: '1.25rem' },
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: 'normal'
        },
        h6: {
            fontSize: { mobile: '0.9rem', tablet: '1rem', desktop: '1.1rem' },
            fontWeight: 700,
            lineHeight: 1.5,
            letterSpacing: 'normal'
        }
    },

    body: {
        fontFamily: ACTIVE_FONT_THEME.primary,
        body1: {
            fontSize: { mobile: '0.9rem', desktop: '1rem' },
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontSize: { mobile: '0.85rem', desktop: '0.95rem' },
            fontWeight: 400,
            lineHeight: 1.7,
        },
        caption: {
            fontSize: { mobile: '0.7rem', desktop: '0.75rem' },
            fontWeight: 400,
            lineHeight: 1.5,
        }
    },

    spacing: {
        xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64
    },

    borderRadius: {
        xs: 2, sm: 4, md: 4, lg: 4, xl: 4, full: 9999
    },

    shadows: {
        none: 'none',
        sm: '0 2px 4px rgba(0,0,0,0.05)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
        xl: '0 12px 32px rgba(0,0,0,0.15)',
        primary: ACTIVE_THEME.shadows.primary
    },

    transitions: {
        default: 'all 0.3s ease',
        fast: 'all 0.15s ease',
        slow: 'all 0.5s ease',
    },

    breakpoints: {
        xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536
    }
} as const;

export type DesignConfig = typeof designConfig;

export const getColor = (path: string): string => {
    const keys = path.split('.');
    let value: any = designConfig.colors;

    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) {
            console.warn(`Oops! Couldn't find color at "${path}".`);
            return '#000000';
        }
    }
    return value;
};

export const getTypography = (path: string): any => {
    const keys = path.split('.');
    let value: any = designConfig.typography;

    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) return undefined;
    }
    return value;
};

export const getHeading = (level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
    return designConfig.headings[level];
};

export default designConfig;
