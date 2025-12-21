import { Learner } from '../types';

export const mockLearners: Learner[] = [
  {
    id: 1,
    name: 'Name of Learner',
    role: 'Admin',
    email: 'Example@gmail.com',
    completion: '90%',
    status: 'ONGOING',
    avatar: 'https://via.placeholder.com/40'
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Student',
    email: 'john.doe@example.com',
    completion: '75%',
    status: 'ONGOING',
    avatar: 'https://via.placeholder.com/40'
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Student',
    email: 'jane.smith@example.com',
    completion: '100%',
    status: 'COMPLETED',
    avatar: 'https://via.placeholder.com/40'
  }
];
