import React from 'react'
import { useState } from 'react';
const Qrcode = () => {
    const[img,setImg]=useState("");
    const[data,setData]=useState("")
    const[size,setSize]=useState("150");
    const[loading,setLoading]=useState(false);
    async function generateQR(){
        setLoading(true)
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;
            setImg(url);
        }catch(error){
            console.error("Error");
        }
        finally{
            setLoading(false);
        }
    }
    function download(){
        fetch(img)
        .then((res)=> res.blob())
        .then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((err)=>{
            console.log("Error occured: "&{err});
        })
    }
  return (
    <div class="container">
        <h1>QRCode Generator</h1>
        {loading && <p>Loading</p>}
        {img && <img src={img} alt="Enter data"></img>}
        <label htmlFor='lab'>Data for QRCode:</label>
        <input type="text" id='lab' placeholder='Enter data' onChange={(e)=>setData(e.target.value)} onClick={(e)=>(e.target.value="")}></input>
        <label htmlFor='siz'>Data for Size (Eg:150):</label>
        <input type="text"placeholder='Enter size' id='siz' onChange={(e)=>(setSize(e.target.value))} onClick={(e)=>(e.target.value="")}></input>
        <button className='but' onClick={generateQR}>Generate QR</button>
        <button className='but' onClick={download}>Download</button>
    </div>
  )
}

export default Qrcode
