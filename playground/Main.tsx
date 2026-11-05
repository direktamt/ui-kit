import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/Fonts.ts';
import { PlaygroundApp } from './PlaygroundApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlaygroundApp />
  </StrictMode>,
);
