import { Link } from "react-router-dom"


 

const Home = () => {
  return (
    <div className="w-full h-screen bg-[url(https://media.ford.com/content/dam/fordmedia/Europe/en/2022/03/smarttrafficlights/ACCoRD_image2.jpg)] mr-10 bg-cover bg-center  flex flex-col bg-red-400 justify-between ">
        <img className="w-24 ml-4 mt-3" src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
        <div className="flex flex-col h-36 rounded-md justify-between  bg-white p-4">
            <h2 className="text-3xl font-bold mb-6">Get Started with Uber</h2>
              <Link className="bg-black mb-4 flex justify-center text-white px-6 py-3 text-1xl font-medium rounded-md  " to='/login'>Continue</Link>
        </div>
    </div>
  )
}

export default Home 