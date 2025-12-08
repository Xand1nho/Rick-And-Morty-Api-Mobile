import { useState, useEffect} from 'react'
import s from './App.module.css'
import {api} from './api/api'
import { Card } from './components/card.jsx'
import Tilt from 'react-parallax-tilt'
import InfoModal from './components/infoModal'

function App() {
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchPage, setSearchPage] = useState("")
  const [modal, setModal] = useState(); 


  useEffect(() => {
    api.get(`/character/?name=${searchName}&page=${searchPage}`).then((response) =>{
      setData(response.data.results)
      console.log(response.data.results)
    }). catch((error) => {
      console.log("NÃO FOI POSSÍVEL ACESSAR API", error)
    
    })
    }, [searchPage, searchName])
  return (
    
    <>
    
      {modal !== undefined && <InfoModal data={data[modal]} close={() => setModal()}/>}
    <h1 className={s.title}>Rick and Morty Characters</h1>
    <main>
      <div style={{display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center", justifyContent: "center"}}>
      <input type="text" value={searchPage} onChange={(e) => setSearchPage(e.target.value)} placeholder='1/42'/>
      <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder='Procure um Persongem'/>
      </div>
    
      <div className={s.wrapCards}>
        {data.map((item, index) => {
          return(
            <div key={index}> 
              <Tilt tiltReverse={true}>
              <Card image={item.image} name={item.name} species={item.species}/>
            </Tilt>
            <button onClick={() => setModal(index)} className={s.infoBtn}>Info {item.name}</button>
            </div>
          )
        })}
      </div>

    </main>



    </>
  )
}

export default App
