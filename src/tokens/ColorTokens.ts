/**
 * Locked DirektAmt brand values. Used for the logo, the wordmark and brand
 * surfaces only; interface text and controls use the derived scales below.
 */
export const brandColors = {
  navy: '#192434',
  blue: '#5A91EB',
} as const;

/**
 * Blue scale derived from the brand accent `#5A91EB` (step 400). The brand
 * accent reaches only about 3.1:1 on white, so text and interactive elements
 * use the darker steps 600 and 700 on light surfaces and the lighter steps
 * 200 and 300 on dark surfaces.
 */
export const blue = {
  50: '#EEF4FD',
  100: '#DDE8FB',
  200: '#B3CDF6',
  300: '#8DB4F2',
  400: '#5A91EB',
  500: '#3B78E0',
  600: '#2A62C9',
  700: '#2152AD',
  800: '#1C2B45',
  900: '#15233A',
} as const;

/**
 * Neutral scale tinted towards the brand navy (step 900).
 */
export const neutral = {
  0: '#FFFFFF',
  50: '#F6F8FB',
  100: '#EEF1F5',
  200: '#E1E6ED',
  300: '#CBD2DC',
  400: '#9AA5B5',
  500: '#7A8597',
  600: '#5B6577',
  700: '#3D4759',
  750: '#273244',
  800: '#1B2433',
  850: '#151D29',
  900: '#192434',
  950: '#0E141D',
} as const;

/**
 * One semantic colour (status or primary) of a colour scheme.
 */
export interface IntentColorTokens {
  /** Solid fills and coloured text on the scheme's surfaces. */
  main: string;
  /** Hover and pressed state of solid fills. */
  hover: string;
  /** Text and icons on a `main` fill. */
  contrastText: string;
  /** Tinted background: alerts, selected rows and navigation items. */
  subtle: string;
  /** Border on a `subtle` background. */
  subtleBorder: string;
  /** Text on a `subtle` background. */
  subtleText: string;
}

/**
 * Complete colour set of one scheme. Every text/background combination the
 * theme renders is listed in `ContrastPairs.ts` and verified against WCAG AA.
 */
export interface ColorSchemeTokens {
  background: {
    /** Page background behind cards and navigation. */
    default: string;
    /** Cards, tables, dialogs, header. */
    paper: string;
    /** Inset surfaces: table header, code blocks, neutral chips. */
    inset: string;
  };
  text: {
    primary: string;
    secondary: string;
    /** Disabled controls; exempt from WCAG 1.4.3. */
    disabled: string;
  };
  border: {
    /** Dividers and card outlines. */
    subtle: string;
    /** Form-control outlines; at least 3:1 against the surfaces (WCAG 1.4.11). */
    control: string;
  };
  /** Keyboard focus ring; at least 3:1 against the surfaces. */
  focus: string;
  /** Hover tint of neutral rows and list items. */
  hover: string;
  brand: {
    /** "Direkt" and the icon's main shape: navy on light, white on dark. */
    ink: string;
    /** "Amt" and the icon's accent shape: the locked brand blue. */
    accent: string;
  };
  primary: IntentColorTokens;
  info: IntentColorTokens;
  success: IntentColorTokens;
  warning: IntentColorTokens;
  error: IntentColorTokens;
}

export const lightColorScheme: ColorSchemeTokens = {
  background: {
    default: neutral[50],
    paper: neutral[0],
    inset: neutral[100],
  },
  text: {
    primary: neutral[900],
    secondary: neutral[600],
    disabled: neutral[400],
  },
  border: {
    subtle: neutral[200],
    control: neutral[500],
  },
  focus: blue[600],
  hover: neutral[100],
  brand: {
    ink: brandColors.navy,
    accent: brandColors.blue,
  },
  primary: {
    main: blue[600],
    hover: blue[700],
    contrastText: neutral[0],
    subtle: blue[50],
    subtleBorder: '#C7DAF8',
    subtleText: blue[700],
  },
  info: {
    main: blue[600],
    hover: blue[700],
    contrastText: neutral[0],
    subtle: blue[50],
    subtleBorder: '#C7DAF8',
    subtleText: blue[700],
  },
  success: {
    main: '#1F7A45',
    hover: '#19623A',
    contrastText: neutral[0],
    subtle: '#EDF7F0',
    subtleBorder: '#BFE3CB',
    subtleText: '#19623A',
  },
  warning: {
    main: '#A35200',
    hover: '#7F4100',
    contrastText: neutral[0],
    subtle: '#FEF5E7',
    subtleBorder: '#F5D7A8',
    subtleText: '#7F4100',
  },
  error: {
    main: '#C42B1C',
    hover: '#A3241A',
    contrastText: neutral[0],
    subtle: '#FDF0EF',
    subtleBorder: '#F5C6C1',
    subtleText: '#A3241A',
  },
};

export const darkColorScheme: ColorSchemeTokens = {
  background: {
    default: neutral[950],
    paper: neutral[850],
    inset: neutral[800],
  },
  text: {
    primary: '#E8ECF2',
    secondary: '#A3AEBF',
    disabled: neutral[600],
  },
  border: {
    subtle: neutral[750],
    control: '#74809A',
  },
  focus: blue[300],
  hover: neutral[800],
  brand: {
    ink: neutral[0],
    accent: brandColors.blue,
  },
  primary: {
    main: blue[300],
    hover: blue[200],
    contrastText: neutral[950],
    subtle: blue[800],
    subtleBorder: '#2B4470',
    subtleText: blue[200],
  },
  info: {
    main: blue[300],
    hover: blue[200],
    contrastText: neutral[950],
    subtle: blue[900],
    subtleBorder: '#2B4470',
    subtleText: blue[200],
  },
  success: {
    main: '#6FD39A',
    hover: '#95E0B5',
    contrastText: neutral[950],
    subtle: '#12261B',
    subtleBorder: '#24513A',
    subtleText: '#95E0B5',
  },
  warning: {
    main: '#F2B35E',
    hover: '#F6C987',
    contrastText: neutral[950],
    subtle: '#2A2010',
    subtleBorder: '#5C4320',
    subtleText: '#F6C987',
  },
  error: {
    main: '#FF8F85',
    hover: '#FFB4AD',
    contrastText: neutral[950],
    subtle: '#2A1715',
    subtleBorder: '#5C2C27',
    subtleText: '#FFB4AD',
  },
};

export const colorSchemes = {
  light: lightColorScheme,
  dark: darkColorScheme,
} as const;

export type ColorSchemeName = keyof typeof colorSchemes;
