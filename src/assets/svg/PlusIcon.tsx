const PlusIcon = () => {
  return (
    <svg width="40" height="28" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="play">
        <g id="Group 2">
          <g id="Rectangle 10" filter="url(#filter0_d_274_7940)">
            <rect x="2.69031" y="2.07715" width="43" height="25.8462" rx="12.9231" fill="#FFB213" />
            <rect x="1.69031" y="1.07715" width="45" height="27.8462" rx="13.9231" stroke="white" strokeWidth="2" />
          </g>
          <rect id="Rectangle 9" x="2.69031" y="2.07715" width="43" height="23.1538" rx="11.5769" fill="#FFDB0A" />
          <path
            id="Subtract"
            opacity="0.5"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.0787 2.07715H14.2672C7.87347 2.07715 2.69031 7.26031 2.69031 13.6541C2.69031 20.0478 7.87347 25.231 14.2672 25.231H31.683L18.0787 2.07715Z"
            fill="#FFEE88"
          />
          <g id="+" filter="url(#filter1_d_274_7940)">
            <path
              d="M20.1252 21.2276V16.679H15.6903V9.79933H20.1252V5.30762H27.1755V9.79933H31.6103V16.679H27.1755V21.2276H20.1252Z"
              fill="white"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_274_7940"
          x="0.690308"
          y="0.0771484"
          width="47"
          height="31.8462"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_274_7940" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_274_7940" result="shape" />
        </filter>
        <filter
          id="filter1_d_274_7940"
          x="15.6903"
          y="5.30762"
          width="15.92"
          height="16.8083"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.888393" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_274_7940" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_274_7940" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default PlusIcon;
