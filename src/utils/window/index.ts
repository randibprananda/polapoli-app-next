export const getWindowLastPath = () => {
  const windowStr = window.location.toString();
  return windowStr.substring(windowStr.lastIndexOf('/') + 1);
};
