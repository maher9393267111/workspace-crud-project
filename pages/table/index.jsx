import React from "react";
import axios from "axios";
const baseUrl = "http://localhost:3000";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  TextField,
  Modal,
  Box,
  TablePagination,
  Checkbox,
} from "@mui/material";
import products from "../api/products";
import ProductPagination from "../../components/ProductPagination";
// import MantineStyle from '../../components/mantinestyle'

export default function TablePage({ totalPages, totalDocs, products }) {
  return (
    <div className=" m-12 w-[75%] !mx-auto py-12">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {/* <TableRow>
 
    </TableRow> */}
            <TableRow>
              <TableCell align="center">
                <Checkbox />
              </TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((value) => (
              <TableRow
                key={value._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {value?.name}
                </TableCell>
                <TableCell align="center"> {value?.price} </TableCell>
                <TableCell align="center">
                  {" "}
                  {value?.description.slice(1, 19)}....{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="flex flex-wrap my-12">
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            {/* <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>Authors table</h6>
              </div> */}
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Name
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Price
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Description
                      </th>

                      {/* <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((value) => (
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <img
                                src="https://www.creative-tim.com/learning-lab/assets/tailwind-soft-ui-dashboard/img/team-3.jpg"
                                className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                                alt="user1"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal">
                                {value?.name}
                              </h6>
                              <p className="mb-0 text-xs leading-tight text-slate-400">
                                john@creative-tim.com
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 text-xs font-semibold leading-tight">
                            {value?.price}$
                          </p>
                          {/* <p className="mb-0 text-xs leading-tight text-slate-400">
                            $
                          </p> */}
                        </td>
                        {/* <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                            Online
                          </span>
                        </td> */}
                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight text-slate-400">
                            {value?.description.slice(1, 20)}...
                          </span>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <a
                            href="javascript:;"
                            className="text-xs font-semibold leading-tight text-red-400"
                          >
                            {" "}
                            Edit{" "}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductPagination totalPages={totalPages} />
    </div>
  );
}

// import React from 'react'
// import { Pagination } from 'semantic-ui-react'

// const PaginationExamplePagination = () => (
//   <Pagination defaultActivePage={5} totalPages={10} />
// )

// export default PaginationExamplePagination

TablePage.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 3;
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  // console.log(response?.message?.error)
  return response.data;
};

{
  /*  */
}
