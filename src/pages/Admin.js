import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useState, useEffect } from "react";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const Admin = () => {
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const columns = [
    {
      title: "Image",
      field: "image",
      render: (rowData) => (
        <img
          src={rowData.image}
          style={{ width: 100, borderRadius: "50px" }}
          alt={rowData.title}
        />
      ),

      sorting: false,
      validate: (rowData) =>
        rowData.image === undefined || "" ? "Image cannot be empty" : true,
    },

    {
      title: "Name",
      field: "title",
      validate: (rowData) =>
        rowData.title === undefined || "" ? "Title cannot be empty" : true,
      render: (rowData) =>
        rowData.title.length > 30
          ? rowData.title.substring(0, 20) + " ..."
          : rowData.title,
    },
    {
      title: "Price",
      field: "price",
      type: "numeric",
      validate: (rowData) =>
        rowData.price === undefined || "" ? "Price cannot be empty" : true,
    },
    {
      title: "Category",
      field: "category",
      validate: (rowData) =>
        rowData.category === undefined || ""
          ? "Category cannot be empty"
          : true,
    },

    {
      title: "Description",
      field: "description",
      validate: (rowData) =>
        rowData.description === undefined || ""
          ? "Description cannot be empty"
          : true,
      sorting: false,
      render: (rowData) =>
        rowData.description.length > 30
          ? rowData.description.substring(0, 20) + "  More ..."
          : rowData.description,
    },
    { title: "ID", field: "_id", editable: "never", sorting: false },
  ];

  const [data, setData] = useState([]);

  return (
    <MaterialTable
      options={{
        headerStyle: {
          backgroundColor: "#126264",
          color: "#FFF",
          fontSize: "18px",
        },

        exportAllData: true,
        exportButton: true,
        pageSize: 20,
        pageSizeOptions: [10, 20, 50],
      }}
      icons={tableIcons}
      title="Edit Products List"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
              })
                .then((res) => res.json())
                .then((product) => {
                  setData([...data, product]);
                });
              resolve();
            }, 1000);
          }),

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              fetch(`http://localhost:8080/products/${oldData._id}`, {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
              });
              resolve();
            }, 1000);
          }),

        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              fetch(`http://localhost:8080/products/${oldData._id}`, {
                method: "DELETE",
              });

              resolve();
            }, 1000);
          }),
      }}
    />
  );
};

export default Admin;
