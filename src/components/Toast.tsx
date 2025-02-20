'use client';

import { ToastContainer } from 'react-toastify';

const Toast = () => {
   return (
      <div>
         <ToastContainer
            position="bottom-left"
            autoClose={3000}
            pauseOnHover={false}
            hideProgressBar={true}
            closeOnClick={true}
         />
      </div>
   )
}

export default Toast