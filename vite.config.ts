import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const REQUIRED_ENV_VARS = [
  'VITE_DB_API_KEY',
  'VITE_REACT_GOOGLE_MAPS_API_KEY',
  'VITE_OPEN_ROUTE_SERVICE_API_KEY',
  'VITE_PUBLIC_POSTHOG_KEY',
  'VITE_VERIFICATION_PASSWORD',
];

function envCheckPlugin(): Plugin {
  let missingVars: string[] = [];

  return {
    name: 'env-check',
    configResolved(config) {
      missingVars = REQUIRED_ENV_VARS.filter(key => !config.env[key]);
      if (missingVars.length > 0) {
        console.warn(
          '\n\x1b[33m[env-check] Missing required environment variables:\x1b[0m\n' +
          missingVars.map(v => `  \x1b[31m✗ ${v}\x1b[0m`).join('\n') +
          '\n\x1b[33m  Copy src/.example.env to .env and fill in the values following the guidance described in the example file.\x1b[0m\n'
        );
      }
    },
    transformIndexHtml(html) {
      if (missingVars.length === 0) return html;

      const listItems = missingVars.map(v => `<li><code>${v}</code></li>`).join('');
      const overlay = `
<script>
(function() {
  var missing = ${JSON.stringify(missingVars)};
  if (!missing.length) return;
  var overlay = document.createElement('div');
  overlay.id = '__env_check_overlay__';
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:99999',
    'display:flex', 'align-items:center', 'justify-content:center',
    'background:rgba(0,0,0,0.85)', 'font-family:monospace',
  ].join(';');
  overlay.innerHTML = '<div style="background:#1e1e1e;border:2px solid #f87171;border-radius:8px;padding:2rem;max-width:480px;color:#f8f8f8">'
    + '<h2 style="margin:0 0 1rem;color:#f87171;font-size:1.1rem">&#x26A0; Missing environment variables</h2>'
    + '<p style="margin:0 0 1rem;color:#d1d5db;font-size:.875rem">The app cannot start until these are set. Copy <strong>src/.example.env</strong> to <strong>.env</strong> and fill in the values following the guidance described in the example file.</p>'
    + '<ul style="margin:0;padding-left:1.25rem;color:#fca5a5;font-size:.875rem">${listItems}</ul>'
    + '</div>';
  document.body.appendChild(overlay);
})();
</script>`;

      return html.replace('</body>', overlay + '\n</body>');
    },
  };
}

export default defineConfig(() => ({
  base: './', // This is set to allow for deployments on dynamic subpaths (i.e. - test.phlask.me)
  build: {
    outDir: 'build',
    target: 'es2022'
  },
  plugins: [
    envCheckPlugin(),
    react(),
    tsconfigPaths(),
  ]
}));
