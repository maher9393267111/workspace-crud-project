<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    {/* <TableRow>
 
    </TableRow> */}
    <TableRow>
      <TableCell align="center">
        <Checkbox />
      </TableCell>
      <TableCell align="center">Title</TableCell>
      <TableCell align="center">Desc</TableCell>
      <TableCell align="center">usersNumber</TableCell>
    
    </TableRow>
  </TableHead>
  <TableBody>
    {products?.map((value) => (
      <TableRow key={value._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">
          <Checkbox />
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {value?.name}
        </TableCell>
        <TableCell align="center"> {value?.price} </TableCell>
        <TableCell align="center"> {value?.description} </TableCell>
    
      </TableRow> 
    ))}
  </TableBody>
</Table>



</TableContainer>  # pagination-table-mongodb-nextjs
# pagination-table-mongodb-nextjs
# pagination-table-mongodb-nextjs
# pagination-table-mongodb-nextjs
