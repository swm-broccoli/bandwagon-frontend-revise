import waveShape from '../../../assets/wave_shape.svg';

function WaveItem() {
  return (
    <div
      className={`absolute w-[200%] h-full z-20 bottom-0 opacity-30 first-of-type:opacity-50 first-of-type:animate-wave-animation animate-wave-animation-2 last-of-type:animate-wave-animation-3`}
      style={{
        backgroundImage: `url(${waveShape})`,
        backgroundRepeat: 'repeat-x',
      }}
    ></div>
  );
}

function Wave() {
  return (
    <div className='w-full h-full absolute left-0 bottom-0 overflow-x-hidden'>
      <WaveItem />
      <WaveItem />
      <WaveItem />
    </div>
  );
}

export default Wave;
