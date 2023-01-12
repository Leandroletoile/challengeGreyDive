import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { FetchDb } from "../helpers/FetchDb"


export const InfoPage = () => {

  const [usersData, setUsersData] = useState([])

  FetchDb(usersData, setUsersData, "users");

  const navigate = useNavigate()

  const onNavigateBack = () => {

    navigate(-1)

  }



  return (

    <>

      <div className="container">

        {usersData.length === 0 ? (

          <div className="align-self-center d-flex container mb-4 spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

        ) : (

          <div className="row s-flex align-items-center justify-content-center">

            <table className="table tableInfo mt-4">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Birth Date</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((d, i) => (
                  <tr key={i}>
                    <td className="table-secondary">{d.full_name.charAt(0).toUpperCase() + d.full_name.slice(1)}</td>
                    <td className="table-secondary">{d.email}</td>
                    <td className="table-secondary">{d.birth_date}</td>
                    <td className="table-secondary">{d.country_of_origin.charAt(0).toUpperCase() + d.country_of_origin.slice(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        <button
          onClick={onNavigateBack}
          className="btn-block btnSubmit mb-5"
        >
          Volver
        </button>


      </div>


    </>

  )
}
