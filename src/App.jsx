import { useRef, useState } from 'react'
import './App.css'

function App() {

  const SATV = useRef();
  const SATM = useRef();
  const ACTC = useRef();
  const ACTE = useRef();
  const ACTM = useRef();

  const [recommendations, setRecommendations] = useState([]);

  console.log(recommendations)

  const PostRec = async () => {
    await fetch(`http://127.0.0.1:8000/get_recommendations?SATV=${SATV.current.value}&SATM=${SATM.current.value}&ACTC=${ACTC.current.value}&ACTE=${ACTE.current.value}&ACTM=${ACTM.current.value}`).then((res) => {
      return res.json();
    }).then((res) => {
      setRecommendations(res)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2>Input your marks</h2>
        <div className="flex gap-3 flex-col items-center">
          <div className="flex gap-2 w-80 justify-between items-center">
            <span>
              SAT Verbal
            </span>
            <input type="number" ref={SATV} />
          </div>
          <div className="flex gap-2 w-80 justify-between items-center">
            <span>
              SAT Maths
            </span>
            <input type="number" ref={SATM} />
          </div>
          <div className="flex gap-2 w-80 justify-between items-center">
            <span>
              ACT Composite
            </span>
            <input type="number" ref={ACTC} />
          </div>
          <div className="flex gap-2 w-80 justify-between items-center">
            <span>
              ACT English
            </span>
            <input type="number" ref={ACTE} />
          </div>
          <div className="flex gap-2 w-80 justify-between items-center">
            <span>
              ACT Math
            </span>
            <input type="text " ref={ACTM} />
          </div>
        </div>

        <button onClick={PostRec}>Get Recommendations</button>
      </div>

      {recommendations.length > 0 &&
        <div className="flex flex-col">
          <span className='font-bold py-5'>Recommended Colleges</span>
          <table className='w-full'>
            <tr>
              <th>University Name</th>
              <th>SAT Verbal Scores</th>
              <th>SAT Math Scores</th>
              <th>ACT Composite Scores</th>
              <th>ACT English Scores</th>
              <th>ACT Math Scores</th>
            </tr>

            {recommendations.map((college) => {

              return (
                <tr>
                  <td>{college["institution name"]}</td>
                  <td>{college["SAT Verbal 25th"]}</td>
                  <td>{college["SAT Math 25th"]}</td>
                  <td>{college["ACT Composite 25th"]}</td>
                  <td>{college["ACT English 25th"]}</td>
                  <td>{college["ACT Math 25th"]}</td>
                </tr>
              )
            })}


          </table>
        </div>
      }
    </>
  )
}

export default App
