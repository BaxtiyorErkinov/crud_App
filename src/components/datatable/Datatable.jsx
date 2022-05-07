import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = [];
      try {
        const querySpapshot = await getDocs(collection(db, "users"))
        querySpapshot.forEach(data => {
          list.push({
            id: data.id,
            ...data.data()
          })
        })
        setData(list)
      } catch ( err ) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  console.log(data)

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id))
    } catch ( err ) {
      console.log(err)
    }
    setData(data.filter((item) => item.id !== id));
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={ { textDecoration: "none" } }>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={ () => handleDelete(params.row.id) }>
              Delete
            </div>
          </div>
          );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid className="datagrid" rows={ data } columns={ userColumns.concat(actionColumn) } pageSize={ 9 } rowsPerPageOptions={ [9] } checkboxSelection
      />
    </div>
    );
};

export default Datatable;
