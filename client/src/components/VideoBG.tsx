// The provided code defines a React functional component named `VideoBG` in TypeScript.

import { ReactNode } from 'react';

interface VideoBGProps {
  children?: ReactNode;
}

const VideoBG: React.FC<VideoBGProps> = ({ children }) => {
  // const { isScrolled } = useSelector((state: RootState) => state.sharedState);
  // const [animate, setAnimate] = useState(false);
  return (
    <div className="w-10 h-10 z-10">
      <video
        className="absolute inset-0 w-full h-full object-cover z-[2] opacity-70 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/images/bgvideo.mp4" type="video/mp4" />
        {/* <source src="/assets/images/formulas.mp4" type="video/mp4" /> */}
      </video>
      {children}
      <div className="absolute inset-0 bg-orange-400 opacity-10 z-[2]"></div>
    </div>
  );
};

export default VideoBG;
