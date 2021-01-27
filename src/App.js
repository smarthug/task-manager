import { useEffect } from 'react';
import { useTaskManager } from './taskManager'


function TestTask(time, name) {
  return new Promise(resolve => {

    setTimeout(() => {
      console.log(name);
      resolve(name+'testTask done');
    }, time)
  })
}

async function awaitTestTask(time, name) {
  
   let tmp;

  setTimeout(() => {
    console.log(name);
    tmp = name;
    // resolve('testTask done?');
  }, time)
  // await;
  return tmp;

}

function App() {


  return (
    <div className="App">
      <TestCompA />
      <TestCompB />
    </div>
  );
}

export default App;


function TestCompA() {
  const [pushTask, status] = useTaskManager();


  useEffect(() => {
    pushTask(() => TestTask('5000', '5000'));
    pushTask(() => TestTask('1000', '1000'));
    pushTask(() => TestTask('2000', '2000'));
    status();


  }, [])

  function but() {
    status();
  }

  return (
    <div className="App">
      <button onClick={but}>A</button>
    </div>
  );
}


function TestCompB() {
  const [pushTask, status] = useTaskManager();



  useEffect(() => {
    // pushTask(5);
    status();
  }, [])

  function handleClick() {
    pushTask(() => TestTask('2000', '2000'))
    // pushTask(() => awaitTestTask('2000', '2000'))
  }

  return (
    <div className="App">
      <button onClick={handleClick}>pushTask</button>
    </div>
  );
}