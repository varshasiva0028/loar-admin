import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'sradmin/nbfc/users/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'sradmin/nbfc/transactions/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
