export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join(' ')
    .toUpperCase();
};

export const getInitialsFromEmail = (email: string) => {
  return email
    .split('@')[0]
    .split('.')
    .map(word => word[0])
    .join(' ')
    .toUpperCase();
};

export const getFirstName = (name: string) => {
  return name
    .split(' ')[0]
};