import React, { useState, useEffect } from 'react';

const waiting = React.createRef();
waiting.current = [];

export function useTaskManager() {

    return [pushTask, status, setFinishedAction]
}

function setFinishedAction(){
    
}

//setFinishedAction
// only for once , options , keeps on option , 

function pushTask(task, ...params) {
    // for those 0.000001% error cases
    const prevLength = waiting.current.length;
    waiting.current.push({ task: task, params: params });
    // console.log('prev', prevLength);


    if (waiting.current.length === 1 && prevLength ===0) {
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

function run({ task, params }) {
    return new Promise((resolve) => {
        resolve(task(...params))
    })
        .then((resp) => {
            waiting.current.shift();
        })
        .then(next);

//     return task(...params)
//         .then((resp) => {
//             console.log(resp)
//             waiting.current.shift();
//         })
//         .then(next);
}

function status() {
    console.log(waiting.current)
}