import React, { useState } from 'react';
import './App.css';

const nums = [1,2,3,4,5,6,7,8,9,0];
const ops = ['/', '*', '+', '-'];
const ids = {
  1: 'one',
  2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine',0:'zero',
  '/':'divide', '*':'multiply', '+':'add', '-':'subtract'
}

class Test extends React.Component {
  state = {
    lastPressed : undefined,
    calc: '0',
    operations : undefined
  }

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    const {calc,lastPressed} = this.state;
    const {innerText} = e.target;

    switch(innerText){
      case 'AC' : {
        this.setState({
          calc: '0'
        });
        break;
      }

      case '=': {
        const evaluted = eval(calc);
        this.setState({
          calc: evaluted
        });
        break;
      }

      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if(!last.includes('.')){
          this.setState({
            calc: calc + '.'
          })
        }
        break;
      }

      default: {
        let e = undefined;
        if(ops.includes(innerText)){
          if(ops.includes(lastPressed) && innerText !== '-'){
            const lastNumberIndex = calc.split('').reverse().findIndex(char => char !== ' ' && nums.includes(+char) )
            e = calc.slice(0, calc.length - lastNumberIndex + 1) + ` ${innerText} `;  
          }else{
            e = `${calc} ${innerText} `;
          }
        }else{
          e = (calc === '0') ? innerText : (calc + innerText);
        }

        this.setState({
          calc: e,
        });
      }
    }

    this.setState({
      lastPressed: innerText
    })
  }

  render() {
    const {calc} = this.state;
    return (
      <div className="App">
      <div className="App-header">
        <div className="content" style={{backgroundColor:'#282c34', height:'30vh', borderRadius:'10px', width:'340px'}}>
          <div>
            <div id="display">
              {calc}
              </div>
            <div>
              {
                nums.map((num)=>{
                  return (
                    <button className = "btn btn-primary" key={num} onClick={this.handleClick} id={ids[num]}>{num}</button>
                  )
                })
              }
            </div>
            <div>
              {
                ops.map((op)=>{
                  return(
                    <button className = "btn btn-danger" key={op} onClick={this.handleClick} id={ids[op]}>{op}</button>
                  )
                })
              }
            </div>
            <div>
              <button className = "btn btn-warning" onClick={this.handleClick} id="clear">AC</button>
              <button className = "btn btn-warning" onClick={this.handleClick} id="decimal">.</button>
              <button className = "btn btn-warning" onClick={this.handleClick} id="equals">=</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Test;
