import { useForm } from 'react-hook-form'
import { Header } from '../components/Header'
import { items } from '../data/data.json'
import { getDocs, collection, addDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha"



export const FormPage = () => {


  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()


  const [captchaState, setCaptchaState] = useState(false)

  const onCaptchaState = () => {
    setCaptchaState(true)
    console.log(captchaState)
  }


  const onSubmit = handleSubmit(async (values, e) => {

    e.preventDefault()
    delete values.undefined


    if (new Date(values.birth_date) > new Date()) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Fecha de nacimiento incorrecta'
      })
      return
    }


    const usersData = await getDocs(collection(FirebaseDB, "users"))

    let arrayUsers = []

    usersData.forEach(doc => {
      arrayUsers.push(doc.data())
    })

    const repitedUser = arrayUsers.find(user => user.email === values.email)

    if (repitedUser) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Usuario ya existe'
      })
      return
    }


    if (captchaState === true) {
      const uploadedUser = await addDoc(collection(FirebaseDB, "users"), values)

      if (uploadedUser) {

        Swal.fire({
          title: 'Usuario agregado',
          text: "Quieres ver todos los usuarios?",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#d30070',
          cancelButtonColor: '#181818',
          confirmButtonText: 'Ver',
          cancelButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/infopage")
          }
        })
      }
    } else {
      if (captchaState === false) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'Comprobar si eres robot'
        })
        return
      }
    }
  })



  return (

    <>

      <Header />


      <form onSubmit={onSubmit}>
        {
          items.map((item, index) => (

            <div style={{ display: "flex", flexDirection: "column", marginBlock: "1rem" }} key={index}>

              {
                item.label === "Enviar" ? null :
                  item.label ? (

                    <label
                      style={{ marginBottom: "1rem" }}
                      htmlFor={item.name}
                    >{item.label}
                    </label>
                  ) : null
              }

              {
                item.type === "select" ? (

                  <select {...register(`${item.name}`)} name={item.name} id={item.name} className="form-control" >

                    {
                      item.options?.map((option, index) => (
                        <option key={index} value={option.value}> {option.label} </option>
                      ))
                    }

                  </select>

                )

                  :

                  item.type === "recaptcha"

                    ?

                    (

                      <ReCAPTCHA
                        className='d-flex align-self-center mt-2 mb-2'
                        sitekey={import.meta.env.VITE_SITE_KEY}
                        onChange={onCaptchaState}
                      />

                    )
                    :

                    (
                      <input
                        key={index}
                        {...register(`${item.name}`)}
                        type={item.type ? item.type : "text"}
                        required={item.required ? true : false}
                        placeholder={item.placeholder ? item.placeholder : ""}
                        name={item.name ? item.name : ""}
                        className={
                          item.type === "text" ? "form-control" :
                            item.type === "select" ? "form-select" :
                              item.type === "date" ? "form-control" :
                                item.type === "checkbox" ? "form-check btn-block" :
                                  item.type === "submit" ? "btn btnSubmit mb-4" :
                                    item.type === "email" ? "form-control" : null
                        }
                      />
                    )
              }
            </div>
          ))
        }
      </form>
    </>

  )
}
