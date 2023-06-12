import { useEffect, useState } from 'react'
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { getVans } from '../../../api';


export const loader = () => {
  return getVans()
}

export const Vans = () => {

  // const [vans, setVans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams();
  let typeFilter = searchParams.get("type")

  // Use the loader data instead of the useEffect
  const vans = useLoaderData()

  // useEffect(() => {
  //   async function loadVan() {
  //     setLoading(true)
  //     try {
  //       const data = await getVans()
  //       setVans(data)
  //     } catch (err) {
  //       setError(err)
  //       console.log(err);
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   loadVan()
  // }, [])

  const displayedVans = typeFilter
    ? vans.filter(item => item.type === typeFilter)
    : vans

  const vanElements = displayedVans.map(van => (
    <div key={van.id} className='van-tile' >
      <Link
        to={`/vans/${van.id}`}
        state={{ search: searchParams.toString(), type: typeFilter }}

      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ))

  const handleFilterChange = (key, val) => {
    setSearchParams(prevParams => {
      if (val == null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, val)
      }
      return prevParams
    })
  }

  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h1>Error ... {error.message} </h1>
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${typeFilter == "simple" ? "selected" : null}`}
        >Simple</button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${typeFilter == "luxury" ? "selected" : null}`}
        >Luxury</button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${typeFilter == "rugged" ? "selected" : null}`}
        >Rugged</button>
        {typeFilter &&
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >Clear filter</button>
        }

      </div>
      <div className="van-list">
        {vanElements}
      </div>
    </div>
  )
} 