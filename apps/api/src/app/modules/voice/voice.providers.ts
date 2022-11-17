import { Voice } from './voice.entity';

export const voicesProviders = [{ provide: 'PostsRepository', useValue: Voice }];
