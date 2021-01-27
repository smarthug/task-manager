import React, { useState, useEffect } from 'react';
// pushTask , status
//useTask?
const waiting = React.createRef();
waiting.current = [];

// const isRunning = React.createRef();
// isRunning.current = false;


//createTaskManager
export function useTaskManager() {

    function pushTask(task) {
        waiting.current.push(task);

        
        if (waiting.current.length === 1) {
            next();
        }
    }

    function next() {
       

        const task = waiting.current[0];

        if (task) {
            run(task)
        } else {
            console.log("all ended")
        }
    }

    function run(task) {

        // return new Promise(resolve => {
        //     resolve(task);
        // })
        //     .then(task => task())
        //     .then((resp) => {
        //         console.log(resp)
        //         const task = waiting.current.shift();
        //     })
        //     .then(next);


        return task()
            .then((resp) => {
                console.log(resp)
                waiting.current.shift();
            })
            .then(next);
    }

    function status() {
        console.log(waiting.current)
    }

    return [pushTask, status]
}



// hooks 와 class 같이 쓸까 ????
// new Task 가 자연스럽지 않을까??

// 클래스 , 프로토타입 대신 함수를 쓰자 .... 
// ref 를 쓰던가 ... 
// single ton으로 존재할려면 createRef 가 맞는가 ???
