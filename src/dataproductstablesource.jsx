import { checkboxClasses } from "@mui/material";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "Name",
    headerName: "Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },

  {
    field: "protein",
    headerName: "Protein",
    width: 100,
  },
  {
    field: "additives",
    headerName: "Additives",
    width: 100,
  },
  {
    field: "bakingmaterial",
    headerName: "Baking Material",
    width: 150,
  },
  {
    field: "fooddecoration",
    headerName: "Food decoration",
    width: 150,
  },
  {
    field: "available",
    headerName: "Available",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    name: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
    
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    price: "100",
    protein: "pro",
    additives: "35",
    bakingmaterial: "35",
    fooddecoration: "35",
  },
];
