import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */

function SvgIconTrash(props) {
  return (
    <Svg
      viewBox="0 0 357 477"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <Path d="M162.002 197h32v175h-32zM224.002 197h32v175h-32zM100.002 197h32v175h-32z" />
      <Path
        d="M15.71 141h13.292v319.215c0 8.66 7.126 15.786 15.786 15.786H311.216c8.66 0 15.786-7.126 15.786-15.786V141h13.381c8.569 0 15.62-7.05 15.62-15.62l-.001-.225V69.39c0-8.836-6.871-16.389-15.708-16.389h-85.292V15.8l.003-.29C255.005 7 248.004 0 239.495 0H116.509c-8.508 0-15.51 7.001-15.51 15.51 0 .096.002.193.004.29V53H15.71C6.873 53 .002 60.553.002 69.39v55.765L0 125.38C0 133.95 7.052 141 15.62 141h.09zm279.292 303h-234V141h234v303zm-162-412h90v21h-90V32zm-101 53h292v24h-292V85z"
        fillRule="nonzero"
      />
    </Svg>
  );
}

const MemoSvgIconTrash = React.memo(SvgIconTrash);
export default MemoSvgIconTrash;
