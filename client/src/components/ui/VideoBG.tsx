// The provided code defines a React functional component named `VideoBG` in TypeScript.

import { ReactNode } from 'react';

interface VideoBGProps {
  children?: ReactNode;
}

const VideoBG: React.FC<VideoBGProps> = ({ children }) => {
  // const { isScrolled } = useSelector((state: RootState) => state.sharedState);
  // const [animate, setAnimate] = useState(false);
  return (
    <div className="w-full h-full z-[-50] absolute inset-0">
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-50] opacity-70 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/images/bgvideo.mp4" type="video/mp4" />
        {/* <source src="/assets/images/formulas.mp4" type="video/mp4" /> */}
      </video>
      {children}
      <div className="absolute inset-0 bg-orange-400 opacity-5 z-[2] "></div>
    </div>
  );
};

export default VideoBG;
