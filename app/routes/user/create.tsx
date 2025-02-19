import { DefaultLayout } from "components/layout/default";
import { useEffect, useState } from "react";
import { IUser, setUsers } from "store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router";
import { Route } from "./+types/create";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Menambahkan Pengguna" },
    { name: "description", content: "Menambahkan Pengguna" },
  ];
}

const userSchema = Yup.object().shape({
  name: Yup.string().required('Nama harus diisi'),
  email: Yup.string().email('Format email salah').required('Email harus diisi'),
  address: Yup.object().shape({
    street: Yup.string().required("Alamat jalan harus diisi"),
    suite: Yup.string().required("Rumah/Apartemen harus diisi"),
    city: Yup.string().required("Kota harus diisi"),
    zipcode: Yup.string().required("Kode pos harus diisi"),
    geo: Yup.object().shape({
      lat: Yup.string(),
      lgn: Yup.string(),
    })
  }),
  company: Yup.object().shape({
    name: Yup.string().required("Nama perusahaan harus diisi"),
    bs: Yup.string(),
    catchPhrase: Yup.string()
  }),
  phone: Yup.string(),
  website: Yup.string()
});

export default function UserEdit() {
  const userState = useSelector((state: RootState) => state.user)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState<IUser>({
    id: 0,
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    company: {
      name: '',
      bs: '',
      catchPhrase: ''
    },
    email: '',
    name: '',
    phone: '',
    website: ''
  })

  const handleSave = (val: IUser) => {
    const userTemp = [...userState.users]
    userTemp.push({
      ...val,
      id: userTemp[userTemp.length - 1].id + 1
    })
    dispatch(setUsers(userTemp))
    alert('Data pengguna berhasil ditambahkan')
    navigate('/')
  }

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-4">Menambahkan Pengguna</h1>
      <Formik
        initialValues={user}
        enableReinitialize
        validationSchema={userSchema}
        onSubmit={values => {
          // same shape as initial values
          handleSave(values)
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
              <input
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.name && touched.name ? (
                <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.name}</div>
              ) : null}
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.email && touched.email ? (
                <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.email}</div>
              ) : null}
            </div>

            <div className="mb-5">
              <label htmlFor="company.name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Perusahaan</label>
              <input
                type="company.name"
                id="company.name"
                value={values.company.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.company?.name && touched.company?.name ? (
                <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.company?.name}</div>
              ) : null}
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="mt-5">
              <p className="text-lg font-bold mb-2">Data Alamat</p>
              <div className="mb-5">
                <label htmlFor="address.street" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jalan</label>
                <input
                  type="text"
                  id="address.street"
                  value={values.address.street}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.address?.street && touched.address?.street ? (
                  <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.address?.street}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label htmlFor="address.suite" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rumah</label>
                <input
                  type="text"
                  id="address.suite"
                  value={values.address.suite}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.address?.suite && touched.address?.suite ? (
                  <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.address?.suite}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label htmlFor="address.city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kota</label>
                <input
                  type="text"
                  id="address.city"
                  value={values.address.city}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.address?.city && touched.address?.city ? (
                  <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.address?.city}</div>
                ) : null}
              </div>
              <div className="mb-5">
                <label htmlFor="address.zipcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Pos</label>
                <input
                  type="text"
                  id="address.zipcode"
                  value={values.address.zipcode}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.address?.zipcode && touched.address?.zipcode ? (
                  <div className="text-xs dark:text-red-300 text-red-600 mt-2">{errors.address?.zipcode}</div>
                ) : null}
              </div>
            </div>
            {/* <Field name="firstName" />
               
                  <button type="submit">Submit</button> */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 rounded-md text-sm cursor-pointer p-2 px-4"
            // onClick={() => handleSave(val)}
            >
              Simpan
            </button>
          </Form>
        )}
      </Formik>
    </DefaultLayout>
  )
}