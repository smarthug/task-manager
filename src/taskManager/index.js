import React, {  useEffect } from 'react';

const waiting = React.createRef();
waiting.current = [];

const onStart = React.createRef();
onStart.current = () => { };

const onFinished = React.createRef();
onFinished.current = () => { };

export function useTaskManager({ onTaskStart, onAllTasksFinished } = {}) {

    useEffect(() => {
        if (onTaskStart) {

            onStart.current = onTaskStart;
        }

        if (onAllTasksFinished) {

            onFinished.current = onAllTasksFinished;
        }
    }, [])

    return [pushTask, status]
}



function pushTask(task, ...params) {
    // for those 0.000001% error cases 1 -> 0 , 1g
    const prevLength = waiting.current.length;
    waiting.current.push({ task: task, params: params });



    if (waiting.current.length === 1 && prevLength === 0) {
        onStart.current();
        next();
    }
}

function next() {


    const task = waiting.current[0];

    if (task) {
        run(task)
    } else {
        onFinished.current();
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