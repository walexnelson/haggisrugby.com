export default () => {
  window.updateJuicer = () => {
    document.querySelectorAll('.juicer-feed .referral').forEach(el => el.remove());
    document.querySelectorAll('.juicer-feed .juicer-ad').forEach(el => el.remove());
  };
};
