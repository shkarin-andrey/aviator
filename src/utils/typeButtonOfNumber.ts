import { TypeButton } from '../components/Button/Button';

export const typeButtonOfNumber = (number: number): TypeButton => {
  if (number < 3) {
    return 'dark-red';
  }

  if (number >= 3 && number < 4) {
    return 'red';
  }

  if (number >= 4 && number < 6) {
    return 'green';
  }

  if (number >= 6 && number < 9) {
    return 'blue';
  }

  if (number >= 9 && number < 12) {
    return 'dark-blue';
  }

  if (number >= 12 && number < 30) {
    return 'purple';
  }

  if (number >= 30) {
    return 'orange';
  }

  return 'dark-red';
};
