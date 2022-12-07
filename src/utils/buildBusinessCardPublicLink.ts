import { routes } from '../navigation/routes';

export const buildBusinessCardPublicLink = (userId?: UUID) => window.location.origin + routes.businessCards(userId)._;
