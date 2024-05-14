import './App.css';
import {useEffect,useState} from "react";

function Button(props:any){
  const value=props.value;
  const setNumber1=props.props.setNumber1;
  const setNumber2=props.props.setNumber2;
  const number1=props.props.number1;
  const number2=props.props.number2;
  const operator=props.props.operator;
  const error=props.props.error;
  const setOperator=props.props.setOperator;
  const clicked=()=>{
    if (!error){
      if (operator===""){
	if (Number(number1)===0){
	  if (number1==="0."){
	    setNumber1("0."+String(value));
	  }else{
	    setNumber1(String(value));
	  }
	}else{
	  setNumber1(number1+String(value));
	}
      }else{
	if (operator==="="){
	  setOperator("");
	  setNumber1(String(value));
	}else{
	  if (Number(number2)===0){
	    if (number2==="0."){
	      setNumber2("0."+String(value));
	    }else{
	      setNumber2(String(value));
	    }
	  }else{
	    setNumber2(number2+String(value));
	  }
	}
      }
    }
  };
  return (
    <button id="button" onClick={clicked}>{value}</button>
  );
}

function OpetratorButton(props:any){
  const value=props.value;
  const number1=props.props.number1;
  const number2=props.props.number2;
  const setNumber1=props.props.setNumber1;
  const setNumber2=props.props.setNumber2;
  const operator=props.props.operator;
  const setOperator=props.props.setOperator;
  const setError=props.props.setError;
  const error=props.props.error;
  const clicked=()=>{
    if (!error){
      if (operator){
	switch (operator){
	  case "+":
	    setNumber1(Number(number1)+Number(number2));
	    break;
	  case "-":
	    setNumber1(Number(number1)-Number(number2));
	    break;
	  case "×":
	    setNumber1(Number(number1)*Number(number2));
	    break;
	  case "÷":
	    if (Number(number2)===0 || (Number(number1)===57 && Number(number2)===3)){
	      setError(true);
	    }else{
	      setNumber1(Number(number1)/Number(number2));
	    }
	    break;
	}
	setNumber2("");
      }
      setOperator(value);
    }
  };
  return (
    <button id="button" onClick={clicked} style={{background:"#f66",...props.style}}>{value}</button>
  );
}

function App(){
  const [number1,setNumber1]=useState<string>("0");
  const [number2,setNumber2]=useState<string>("");
  const [operator,setOperator]=useState<string>("");
  const [error,setError]=useState<boolean>(false);
  const props={
    setNumber1,setNumber2,number1,number2,operator,setOperator,setError,error
  };
  useEffect(()=>{
    document.title="計算機";
  },[]);
  return (
    <div className="App">
      <div id="container">
	<div id="result-container">
	  <p id="result" style={{color:error?"red":"black"}}>{error?"error":number2!==""?number2:number1}</p>
	  <p id="mode">{operator}</p>
	</div>
	<div style={{display:"flex"}}>
	  <div id="buttons-container">
	    <div id="buttons">
	      <Button value={7} props={props}/>
	      <Button value={8} props={props}/>
	      <Button value={9} props={props}/>
	    </div>
	    <div id="buttons">
	      <Button value={4} props={props}/>
	      <Button value={5} props={props}/>
	      <Button value={6} props={props}/>
	    </div>
	    <div id="buttons">
	      <Button value={1} props={props}/>
	      <Button value={2} props={props}/>
	      <Button value={3} props={props}/>
	    </div>
	    <div id="buttons">
	      <Button value={0} props={props}/>
	      <button id="button" onClick={()=>{
		if (!error){
		  if (operator===""){
		    if (Number(number1)===0){
		      setNumber1("0.");
		    }else{
		      setNumber1(number1+".");
		    }
		  }else{
		    if (Number(number2)===0){
		      setNumber2("0.");
		    }else{
		      setNumber2(number2+".");
		    }
		  }
		}
	      }}>.</button>
	      <button id="button" onClick={()=>{
		setNumber1("0");
		setNumber2("");
		setError(false);
		setOperator("")}} style={{background:"#f66"}}>C</button>
	    </div>
	  </div>
	  <div style={{display:"flex",flexDirection:"column"}}>
	    <OpetratorButton value={"+"} props={props}/>
	    <OpetratorButton value={"-"} props={props}/>
	    <OpetratorButton value={"×"} props={props}/>
	    <OpetratorButton value={"÷"} props={props}/>
	  </div>
	</div>
	<OpetratorButton value={"="} props={props} style={{width:"calc(50px * 4 + 3px * 8)"}}/>
      </div>
    </div>
  );
}

export default App;
