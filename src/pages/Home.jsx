import React, { Suspense, useState,useRef,useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import { soundoff, soundon } from "../assets/icons";
import Rickroll from "../assets/Rickroll.mp3";
import Blog from './Blog'



const home = () => {
    
    const audioRef = useRef(new Audio(Rickroll));
  audioRef.current.volume = 0.8;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating  ] = useState(false);
  const [currentStage, setCurrentStage] = useState(1)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1,4.7,0];
        if (window.innerWidth < 768) {
            screenScale = [0.9,0.9,0.9];    
        }else {
            screenScale = [1,1,1];
        } return[screenScale, screenPosition, rotation]
    }

    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;
        
        if (window.innerWidth < 768) {
            screenScale = [1.5,1.5,1.5];
            screenPosition = [0, -1.5,0]    
        }else {
            screenScale = [3,3,3];
            screenPosition = [0, -4,-4]

        } return[screenScale, screenPosition]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [planeScale, planePosition,] = adjustPlaneForScreenSize();

  return (
   <section className="w-full h-screen relative">
    <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
    {currentStage && <HomeInfo currentStage={currentStage} />}
    </div>
    <Canvas className={`w-full h-screen bg-transparent" ${isRotating ?
    'cursor-grabbing' : 'cursor-grab'}`}
    camera={{near: 0.1,far: 1000}}>
    <Suspense fallback={<Loader/>}>
    <directionalLight position={[1,1,1]} intensity={2}/>
    <ambientLight intensity={0.5}/>
    <hemisphereLight skycolor="#ble1ff" groundColor="#000000" intensity={1}/>
    <Sky 
    isRotating = {isRotating}/>
    <Bird/>
    <Plane
    scale={planeScale}
    position={planePosition}
    isRotating={isRotating}
    rotation={[0,20,0]}
    />
    <Island 
     position = {islandPosition}
     scale = {islandScale}
     rotation = {islandRotation}
     isRotating = {isRotating}
     setIsRotating = {setIsRotating}
     setCurrentStage={setCurrentStage}
     />
    </Suspense>
    </Canvas>
    <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>


   </section>
  )
}

export default home
 