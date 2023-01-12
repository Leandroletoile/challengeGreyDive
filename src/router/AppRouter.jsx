import { FormPage } from '../pages/FormPage'
import { InfoPage } from '../pages/InfoPage'
import { Route, Routes } from "react-router-dom"


export const AppRouter = () => {
    return (
        <>

            <Routes>

                <Route path='/*' element={<FormPage />} />

                <Route path='/infopage' element={<InfoPage />} />


            </Routes>

        </>
    )
}
