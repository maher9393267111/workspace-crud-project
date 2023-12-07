import { useRouter } from 'next/router';
 import { Container , Pagination } from 'semantic-ui-react';
// import { Pagination as MantinePagination ,Group } from '@mantine/core'

function ProductPagination({ totalPages }) {
  const router = useRouter();


  const nav = (num) => {
    // navigate({
    //     search: `page=${num}${queryStr ? `&search=${queryStr}` : ''}`,
    // })

    if( num === 1) {
     router.push('/table')
    }
else {
      
    router.push(`/table?page=${num}`)
}
}


  return (
    <Container className=' mt-1 '>



<div className='   flex justify-center   md:justify-end'>




      <Pagination 
      className=' !bg-white xs:!w-[300px] !sm:w-screen  overflow-hidden !text-black'
        defaultActivePage={5}
        totalPages={totalPages}
        onPageChange={(event, data) => {
            console.log('data--->'  , data)
          data.activePage === 1
            ? router.push('/table')
            : router.push(`/table?page=${data.activePage}`)
        }} 
     />

</div>





    </Container>
    )
}

export default ProductPagination;
