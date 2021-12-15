import React,{useState,useEffect,useRef} from 'react'



function FlashCard({flashcard}) {
    const [flip, setflip] = useState(false)
    const [height,setheight]=useState('initial');
    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight(){
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
         setheight(Math.max(frontHeight,backHeight,100));
    }

    useEffect(setMaxHeight, [flashcard.question,flashcard.answer,flashcard.options])
    useEffect(() => {
      window.addEventListener('resize',setMaxHeight)
      return ()=>window.removeEventListener('resize',setMaxHeight);
    }, [])
    return (
        <div 
         className={`card  ${flip?'flip':''}`}
         style={{height:height}}
         onClick={()=>{setflip(!flip)}}
         >
         <div className="front" ref={frontEl}>
          {flashcard.question}
        <div className="flashcard-options">
            {flashcard.options.map(options=>{
                 return <div className="flashcard-option" key={options}>{options}</div>
            })}
        </div>
        </div>
        <div className="back" ref={backEl}>{flashcard.answer}</div>
    
        </div>
    )
}

export default FlashCard
