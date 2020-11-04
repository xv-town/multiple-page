const name = 'TAB_PANES';

export const get = () => {
  let tabs = sessionStorage.getItem(name);
  if (tabs) {
    tabs = JSON.parse(tabs);
  } else {
    tabs = [];
  }
  return tabs;
}
export const set = (data) => {
  sessionStorage.setItem(name, data)
}