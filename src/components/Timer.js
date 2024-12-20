
import React, { Component } from 'react';


export class Timer extends Component {
    constructor(props) {
        super(props);
        const time = props.time;
        this.state = {
            seconds:time,
            isActive: false,
            initialTime: time,
        };
        this.interval = null;
    }
    componentDidMount() {
        if (this.state.isActive) {            
            this.startTimer();        
        }   
    }
    componentWillUnmount() {
        this.stopTimer();
    }
    startTimer() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.setState(prevState => {
                if (prevState.seconds > 0) {     
                    const newSeconds = prevState.seconds - 1;
                    this.props.onTick(newSeconds);                 
                    return { seconds:  newSeconds};                  
                    } else {                        
                    this.stopTimer();
                    this.props.onTimeEnd();                       
                    return { seconds: 0 };                    
                    }                
                })
            }, 1000);
        } }
    stopTimer() {
        clearInterval(this.interval);
        this.interval = null; 
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.isActive && !prevState.isActive) {
            this.startTimer();
        } else if (!this.state.isActive && prevState.isActive) {
            this.stopTimer();
        }
    }
    toggle = () => {
        this.setState(prevState => ({ isActive: !prevState.isActive }));
    };

    reset = () => {
        this.stopTimer();
        this.setState({ seconds: this.state.initialTime, isActive: false });
    };

    render() {
        return (
            <div>
                <h1>Timer</h1>
                <h2>Залишилось часу: {this.state.seconds} сек</h2>
                <button onClick={this.toggle}>
                    {this.state.isActive ? 'pause' : 'start'}
                </button>
                <button onClick={this.reset}>reset</button>
            </div>
        );
    }
}
