import React from 'react'

const Tombol = ({angka, nomor}) => {
   const click = () => {
       console.log(nomor, "hallo")
   }
    return (
        <div>
           <button className="btn btn-secondary" value={nomor} onClick={()=>click(nomor)}>{angka}</button> 
        </div>
    )
}

export default Tombol
