import { Second } from '../components/welcome/Second';
import { First } from '../components/welcome/First';
import { Third } from '../components/welcome/Third';
import { Forth } from '../components/welcome/Forth';
import { Welcome } from '../views/Welcome';
import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  { 
    path: '/welcome',
    component: Welcome,
    children: [
      { path: '1', component: First, },
      { path: '2', component: Second, },
      { path: '3', component: Third, },
      { path: '4', component: Forth, },
    ]
  }
]