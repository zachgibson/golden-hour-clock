import {
  DefaultPage,
} from './';

export default {
  path: 'sweet-feature',
  name: 'Sweet feature',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
  ],
};
