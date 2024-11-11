const animation = ({ name, delay }) => ({
  animationName: name,
  animationDelay: delay,
  animationFillMode: 'both',
  animationDuration: '700ms',
  animationDirection: 'normal',
  animationTimingFunction: 'ease',
});

export const slideInDownAnimate = (delay) =>
  animation({ name: 'slideInDown', delay });

export const zoomInAnimate = (delay) =>
  animation({ name: 'zoomIn', delay });

export const fadeInAnimate = (delay) =>
  animation({ name: 'fadeIn', delay });

export default animation;
