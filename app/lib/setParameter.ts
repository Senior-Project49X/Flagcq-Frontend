export const handleUpdateParameter = (
  paramKey: string,
  paramValue: string | number
) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(paramKey, paramValue.toString());
  const newURL = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({}, "", newURL);
};
