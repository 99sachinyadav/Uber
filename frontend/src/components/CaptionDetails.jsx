 



const CaptionDetails = () => {

   
    const caption=JSON.parse(localStorage.getItem("caption"))
  return (
    <div>
              <div className="flex p-4 items-center justify-between    ">
            <div className="flex items-center gap-2">
              <img className="bg-slate-600 w-16 border-2 border-black rounded-full" src="https://img.freepik.com/premium-vector/driver-cartoon-vector_889056-101562.jpg" alt="" />
              <h1 className="text-xl font-semibold">{caption.firstname + caption.lastname}</h1>
            </div>
            <div className="flex flex-col gap-0 items-center leading-tight">
             <h1 className="text-xl font-semibold"> ₹295.20</h1>
             <h3 className="text-gray-700 font-semibold">Earned</h3>
            </div>
           </div>
           <div className="flex p-3 gap-[-10px] mt-6 bg-orange-500 px-4 mx-4 rounded-3xl">
             <div  className="flex w-full items-center flex-col">
             <i className="ri-history-fill text-3xl"></i>
              <h1 className="text-xl font-semibold">10.2</h1>
              <p className="text-gray-900 font">Hours Online</p>
             </div>
             <div  className="flex w-full items-center flex-col">
             <i className="ri-history-fill text-3xl"></i>
              <h1 className="text-xl font-semibold">10.2</h1>
              <p className="text-gray-900 font">Hours Online</p>
             </div>
             <div  className="flex w-full items-center flex-col">
             <i className="ri-history-fill text-3xl"></i>
              <h1 className="text-xl font-semibold">10.2</h1>
              <p className="text-gray-900 font">Hours Online</p>
             </div>
           </div>
    </div>
  )
}

export default CaptionDetails