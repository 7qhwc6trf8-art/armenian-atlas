export const APP_BOUNDS: [[number, number], [number, number]] = [
  [36.83174, 38.0639],
  [41.94619, 49.40351],
];

export const DEFAULT_CENTER: [number, number] = [39.55, 43.8];
export const DEFAULT_ZOOM = 6;

export const DIVISION_COLORS = {
  western: {
    fill: '#873a4d',
    selected: '#651b35',
    line: '#f0c56f',
  },
  eastern: {
    fill: '#b1604f',
    selected: '#8d342f',
    line: '#ffe0a0',
  },
} as const;

export const PROVINCE_COLORS = {
  western: {
    fill: '#98566a',
    selected: '#761f42',
  },
  eastern: {
    fill: '#b8735f',
    selected: '#8b3a3d',
  },
} as const;
