import { MainComponent } from './MainComponent';
import {Timer } from './Timer';
import { useState } from 'react';

const myTime = 15;

export const Component = () => {
  const [showAnotherComponent, setShowAnotherComponent] = useState(false);    
  const handleTimeEnd = () => {              
    setShowAnotherComponent(true);
    console.log("Час вийшов!")
  };
  const handleBackToTimer = () => {        
    setShowAnotherComponent(false);        
  };

  return (
    <div className="App">
        {!showAnotherComponent ? (
        <Timer time={myTime}
            onTick={(time) => console.log("Залишилось часу: " + time)}
            onTimeEnd={handleTimeEnd}/>
        ) : (
        <div>                    
            <MainComponent />                    
            <button onClick={handleBackToTimer}>Повернутися до таймера</button>                
            </div>            
        )}
    </div>
  );
}