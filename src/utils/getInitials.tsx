export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
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

export const formatTitle = (str: string): string => {
  return str
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}