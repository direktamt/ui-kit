/**
 * Material UI module augmentation for the DirektAmt palette additions.
 * Part of the public type surface: importing the kit makes these keys
 * available on `theme.palette` and `theme.vars.palette`.
 */
declare module '@mui/material/styles' {
  interface PaletteColor {
    /** Tinted background for alerts, selected items and soft chips. */
    subtle: string;
    /** Border on a `subtle` background. */
    subtleBorder: string;
    /** Text on a `subtle` background. */
    subtleText: string;
  }

  interface SimplePaletteColorOptions {
    subtle?: string;
    subtleBorder?: string;
    subtleText?: string;
  }

  interface Palette {
    brand: {
      /** Main brand shape colour: navy on light, white on dark surfaces. */
      ink: string;
      /** Locked brand accent blue; logo only, not for text. */
      accent: string;
    };
    surface: {
      /** Inset surfaces: table header, code blocks, neutral chips. */
      inset: string;
      /** Hover tint of neutral rows and list items. */
      hover: string;
    };
    border: {
      /** Dividers and card outlines. */
      subtle: string;
      /** Form-control outlines (3:1 against the surfaces). */
      control: string;
      /** Keyboard focus ring (3:1 against the surfaces). */
      focus: string;
    };
  }

  interface PaletteOptions {
    brand?: Partial<Palette['brand']>;
    surface?: Partial<Palette['surface']>;
    border?: Partial<Palette['border']>;
  }
}

export {};
