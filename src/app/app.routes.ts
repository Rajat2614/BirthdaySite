import { Routes } from '@angular/router';
import { Celebration } from './pages/celebration/celebration';
import { Timeline } from './pages/timeline/timeline';
import { Rsvp } from './pages/rsvp/rsvp';

export const routes: Routes = [
  { path: '', component: Celebration },
  { path: 'timeline', component: Timeline },
  { path: 'rsvp', component: Rsvp },
  { path: '**', redirectTo: '' }
];
