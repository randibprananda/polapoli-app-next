export const minutesToSeconds = (minutes: number) => minutes * 60;
export const secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
export const padWithZeroes = (number: number) =>
  number.toString().padStart(2, '0');

export const formatTime = (timeInSeconds: number) => {
  const minutes = secondsToMinutes(timeInSeconds);
  const remainingSeconds = timeInSeconds % 60;
  return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds)}`;
};
