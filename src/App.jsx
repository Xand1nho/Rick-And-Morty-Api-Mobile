
import { useState, useEffect } from 'react'
import s from './App.module.css'
import { api } from './constants/baseUrl.js'
import { Card } from './components/card'
import { InfoModal } from './components/infoModal'
import logo from '/logo.webp'
import { Spinner } from './components/spinner.jsx'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';


function App() {
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchPage, setSearchPage] = useState("")
  const [searchStatus, setSearchStatus] = useState("")
  const [modal, setModal] = useState();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api.get(`/character/?name=${searchName}&page=${searchPage}&status=${searchStatus}`).then((response) => {
      setData(response.data.results)
      setLoading(false)
      setErro(false)
    }).catch((error) => {
      if (error.response.status === 404) {
        setErro(true)
        console.error("Error, Characters Not Found!!!", error)
      }
      if (error.response.status === 500) {
        setErro(true)
        console.error("Error, Internal Server Error!!!", error)
      }
      console.error("Error, Could Not Get API!!!", error)
      setLoading(false)
      setErro(true)
    })
  }, [searchPage, searchName, searchStatus])

  return (
    <>

     {modal !== undefined && (
  <InfoModal
    data={data[modal]}
    close={() => setModal(undefined)}
    onNext={() => modal < data.length - 1 && setModal(modal + 1)}
    onPrev={() => modal > 0 && setModal(modal - 1)}
    hasNext={modal < data.length - 1}
    hasPrev={modal > 0}
  />
)}

      <main>

        <img src={logo} alt="Logo" className={s.logo} />

        <div className={s.wrapPagination}>
          <ResponsivePagination
            current={searchPage}
            total={42}
            onPageChange={setSearchPage}
          />
        </div>

        <div className={s.wrapInputs}>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
            className={s.inputName}
          />

          <div className={s.radioGroup}>
            <label>
              <input
                type="radio"
                value=""
                checked={searchStatus === ""}
                onChange={(e) => setSearchStatus(e.target.value)}
              />
              All
            </label>

            <label>
              <input
                type="radio"
                value="Alive"
                checked={searchStatus === "Alive"}
                onChange={(e) => setSearchStatus(e.target.value)}
              />
              Alive
            </label>

            <label>
              <input
                type="radio"
                value="Dead"
                checked={searchStatus === "Dead"}
                onChange={(e) => setSearchStatus(e.target.value)}
              />
              Dead
            </label>

            <label>
              <input
                type="radio"
                value="Unknown"
                checked={searchStatus === "Unknown"}
                onChange={(e) => setSearchStatus(e.target.value)}
              />
              Unknown
            </label>
          </div>
        </div>

        {erro &&
          <div className={s.wrapErro}>
            <h2>Error when searching for characters ⛔</h2>
          </div>}

        {loading ? <Spinner /> :
          <div className={s.wrapCards}>
            {data.map((item, index) => {
              return (
                !erro && <div key={`${searchPage}-${searchName}-${searchStatus}-${index}`} className={s.wrapCard}>
                  <Card image={item.image} name={item.name} species={item.species} />
                  <button onClick={() => setModal(index)} className={s.infoBtn}>➕ Info {item.name}</button>
                </div>
              )
            })}
          </div>
        }

      </main>

    </>
  )
}

export default App
