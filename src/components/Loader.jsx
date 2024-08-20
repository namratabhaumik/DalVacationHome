import React from 'react'
import {MoonLoader} from "react-spinners"

const Loader = () => {
    return (
        <div className='flex justify-center items-center m-60'>
            <MoonLoader color="red" />
        </div>
    )
}

export default Loader