import React, { useEffect, useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {  // Function
        const [selected, setSelected] = useState(null);
        const [enableMultiSelection, setEnableMultiSelection] = useState(false);
        const [multiple, setMultiple] = useState([]);

        function handelsingleselection(getCurrentId) {
            setSelected(getCurrentId === selected ? null : getCurrentId);
            console.log(getCurrentId);
        } // ./ End Function

        function handlemultiSelection(getCurrentId) {  // Function
            let cpyMultiple = [...multiple];
            const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

            console.log("findIndexOfCurrentId", findIndexOfCurrentId);
            if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
            else cpyMultiple.splice(findIndexOfCurrentId, 1);

            setMultiple(cpyMultiple);
        } //  ./ End Function

     console.log(selected, multiple);

    //    Changing color methods 
        const [typeColor, setTypeColor] = useState('hex');
        const [color, setColor] = useState("#000000");
        
        function uti (length) {  // Function
            return Math.floor(Math.random()*length);
        }; //  ./ End Function
        
        function handleCreateRandomHexColor () {  // Function
            const hex = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
            let hexColor = '#';

            for (let i=0; i<6; i++) {
                hexColor += hex[uti(hex.length)]
            }
            setColor(hexColor);
        } //  ./ End Function

        function handleCreateRandomRgbColor () {  // Function
            const r = uti(256);
            const g = uti(256);
            const b = uti(256);

            console.log('r',r);
            console.log('g',g);
            console.log('b',b);
            setColor(`rgb(${r},${g},${b})`);
            console.log('RGB',color);
        } //  ./ End Function

        useEffect( ()=> {
            if (typeColor === 'rgb') 
                handleCreateRandomRgbColor();
            else
                handleCreateRandomHexColor();
        }, [typeColor]);


    return (
       
            <div className="wrapper" style={{background: color}}>
                <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                    Enable multi-selection
                </button>
                <div className="accordian">
                    {data && data.length > 0 ? (data.map((dataItem) => (<div key={dataItem.id} className="item">
                        <div className="title"
                                                onClick={
                                                enableMultiSelection
                                                    ? () => handlemultiSelection(dataItem.id)
                                                    : () => handelsingleselection(dataItem.id)
                                                }
                        >
                            <h3>{dataItem.question}</h3>
                            <span> + </span>
                        </div>
                        {enableMultiSelection
                        ? multiple.indexOf(dataItem.id) !== -1 && (
                            <div className="content"> {dataItem.answer}</div>
                        )
                        : selected === dataItem.id && (
                            <div className="contenet">{dataItem.answer}</div>
                        )}
                        {/* {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (<div className="content">{dataItem.answer}</div>) : null} */}
                        </div>
                    ))
                    ) : ( <div> No data found ! </div>)
                    }

                    {/* *************  Next is  Changing Color  **************** */}
                </div>
                        <div style={ {
                            width: '100vw',
                            height: '25vh',
                            background: color,
                        }}>
                            <button onClick={()=> setTypeColor('hex')}>Create HEX Color</button>
                            <button onClick={()=> setTypeColor('rgb')}>Create RGB Color</button>
                            <button onClick={typeColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>Generate Random Color</button>
                            <div 
                            style={ {
                                
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                fontSize: '60scrollSnapPointsX',
                                marginTop: '50px',
                            }}
                             >
                                <h3>{typeColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
                                <h1>{color}</h1>
                            </div>

                            
                        </div>
            </div>
     
        
    );

    
}



