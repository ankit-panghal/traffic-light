import { useEffect, useState } from "react"


const config = {
  red: {
    id: 1,
    duration: 5000,
    next: 'green',
  },
  yellow: {
    id: 2,
    duration: 2000,
    next: 'red',
  },
  green: {
    id: 3,
    duration: 3000,
    next: 'yellow',
  },
};

const App = () => {
  const [currentActiveLight, setCurrentActiveLight] = useState('red');
  const [currentDuration, setCurrentDuration] = useState(config[currentActiveLight].duration);

  useEffect(() => {
    let timerId;
    if (currentDuration <= 0) {
      clearInterval(timerId);
      setCurrentActiveLight(config[currentActiveLight].next);
      setCurrentDuration(Number(config[config[currentActiveLight].next].duration));
    } else {
      timerId = setInterval(() => {
        setCurrentDuration((prevDuration) => prevDuration - 1000);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [currentDuration, currentActiveLight]);

  return (
    <div className="flex flex-col items-center gap-10 p-8 h-screen bg-zinc-600">
      <div className=" flex flex-col items-center justify-center gap-4 bg-zinc-900 w-48 h-96 rounded-[40px] p-6">
      {Object.keys(config).map((light) => (
          <div
            key={config[light].id}
            className='w-24 h-24 rounded-full bg-gray-500'
            style={{ background: currentActiveLight === light ? light : '' }}
          ></div>
        ))}
        </div>
      <div className="time text-white text-2xl"><span>{Math.floor(currentDuration / 1000)}</span> seconds</div>
    </div>
  )
}

export default App