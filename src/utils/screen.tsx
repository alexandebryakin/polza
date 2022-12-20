const mobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// const mobile = () => true;

const desktop = () => !mobile();

export const screen = {
  mobile,
  desktop,
};
