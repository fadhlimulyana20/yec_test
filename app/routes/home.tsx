// import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome";
import { DefaultLayout } from "components/layout/default";
import type { Route } from "./+types/home";
import TableKey from "components/molecules/table";
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setIsUserFetched, setUsers } from "store/slice/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Daftar Pengguna" },
    { name: "description", content: "Fadtar Pengguna" },
  ];
}

// export default function Home() {
//   return <Welcome />;
// }


function ModalDelete({
  open,
  onClose,
  onDelete
}: {
  open: boolean;
  onClose: () => any;
  onDelete: () => any;
}) {
  return (
    <div
      id="deleteModal" tabIndex={-1}
      aria-hidden="true"
      className={`${open ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full backdrop-blur-xs bg-gray-800/50`}
    >
      <div
        className="relative p-4 w-full max-w-md h-auto mx-auto my-32">
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button onClick={() => onClose()} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Close modal</span>
          </button>
          <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          <p className="mb-4 text-gray-500 dark:text-gray-300">Apakah anda yakin menghapus data ini?</p>
          <div className="flex justify-center items-center space-x-4">
            <button onClick={() => onClose()} type="button" className="cursor-pointer py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              Batalkan
            </button>
            <button onClick={() => onDelete()} className="cursor-pointer py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [isFetching, setIsFetching] = useState(false)
  let navigate = useNavigate();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [userIDSelected, setUserIDSelected] = useState(0)

  const fetchUser = async () => {
    setIsFetching(true)
    try {
      const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
      dispatch(setUsers(res.data))
      dispatch(setIsUserFetched(true))
    } catch (e: any) {
      alert(e)
    } finally {
      setIsFetching(false)
    }
  }

  const tableOptions = [
    {
      name: 'ID',
      accessor: 'id',
    },
    {
      name: 'Nama',
      accessor: 'name',
    },
    {
      name: 'Email',
      accessor: 'email',
    },
    {
      name: 'ALamat',
      type: 'custom',
      accessor: 'address',
      customAccessor: (val: any) => (`${val.street}, ${val.city}`)
    },
    {
      name: 'Perusahaan',
      accessor: 'company.name',
    },
  ]

  const tableActions = [
    {
      name: 'Edit',
      action: (id: any) => {
        navigate(`/user/edit/${id}`)
      }
    },
    {
      name: 'Hapus',
      action: (id: any) => {
        setUserIDSelected(id)
        setModalDeleteOpen(true)
      }
    }
  ]

  useEffect(() => {
    if (!user.isUsersFetched) {
      fetchUser()
    }
  }, [user.isUsersFetched])

  return (
    <>
      <ModalDelete
        open={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onDelete={() => {
          const userTemp = user.users.filter((o) => o.id !== userIDSelected)
          dispatch(setUsers(userTemp))
          setModalDeleteOpen(false)
        }}
      />
      <DefaultLayout>

        <div className="flex mb-2 items-center justify-between">
          <h1 className="text-2xl font-bold">Daftar Pengguna</h1>
          <button
            className="bg-green-600 hover:bg-green-700 p-2 rounded-lg cursor-pointer text-sm"
            onClick={() => navigate("/user/create")}
          >
            Tambah Pengguna
          </button>
        </div>
        <div className="flex mb-4 gap-2 items-center">

        </div>
        {isFetching ? (
          <h5>Memuat data..</h5>
        ) : (
          <TableKey data={user.users} options={tableOptions} actions={tableActions} />
        )}
      </DefaultLayout>
    </>
  );
};

export default Home