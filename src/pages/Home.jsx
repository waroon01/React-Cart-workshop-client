import BestSeller from "../components/home/BestSeller"
import ContentCarousal from "../components/home/ContentCarousal"
import NewProduct from "../components/home/NewProduct"

const Home = () => {
  return (
    <div>
      <ContentCarousal />
      <p className="text-2xl text-center my-4 text-blue-600 font-bold">สินค้าขายดี</p>
      <BestSeller />
      <p className="text-2xl text-center my-4 text-blue-600 font-bold">สินค้าใหม่</p>
      <NewProduct />
    </div>
  )
}

export default Home
