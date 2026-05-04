// Image component with plant SVG fallback on error

const { useState } = React;

const PLANT_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' preserveAspectRatio='xMidYMid slice'>
    <rect width='200' height='200' fill='#dde5d6'/>
    <g fill='none' stroke='#5a7158' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' opacity='.85'>
      <path d='M100 165 V95'/>
      <path d='M100 130 C70 125 55 110 55 88 C75 88 92 100 100 120'/>
      <path d='M100 110 C130 105 145 90 145 68 C125 68 108 80 100 100'/>
      <path d='M100 95 C82 92 72 80 72 64 C86 64 96 74 100 88'/>
      <path d='M100 80 C118 77 128 65 128 49 C114 49 104 59 100 73'/>
    </g>
    <ellipse cx='100' cy='168' rx='34' ry='5' fill='#a89178' opacity='.6'/>
  </svg>`
);

function SafeImg({ src, alt = '', style, fallback = PLANT_FALLBACK, ...rest }) {
  const [errored, setErrored] = useState(false);
  return (
    <img src={errored ? fallback : src} alt={alt} loading="lazy"
      onError={() => { if (!errored) setErrored(true); }}
      style={style} {...rest}/>
  );
}

window.SafeImg = SafeImg;
