const panels = Array.from(document.querySelectorAll('.panel'));

const getCurrentPanelIndex = () => {
  const currentCenter = window.innerHeight / 2;
  return panels.findIndex((panel) => {
    const top = panel.getBoundingClientRect().top;
    return top >= -currentCenter && top < currentCenter;
  });
};

const scrollToPanel = (index) => {
  if (index < 0 || index >= panels.length) return;
  panels[index].scrollIntoView({ behavior: 'smooth' });
};

document.addEventListener('keydown', (event) => {
  if (event.code === 'PageDown' || event.code === 'PageUp') {
    const currentIndex = getCurrentPanelIndex();
    if (event.code === 'PageDown' && currentIndex < panels.length - 1) {
      scrollToPanel(currentIndex + 1);
      event.preventDefault();
    }
    if (event.code === 'PageUp' && currentIndex > 0) {
      scrollToPanel(currentIndex - 1);
      event.preventDefault();
    }
  }
});
