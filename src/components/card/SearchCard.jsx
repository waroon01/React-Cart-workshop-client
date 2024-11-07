import { useEffect, useState } from "react";
import useEcomStore from "../../Store/ecom-store";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from "../../utils/number";


const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const getCatagory = useEcomStore((state) => state.getCatagory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState("");

  const [price, setprice] = useState([1000,30000])
  const [ok, setOk] = useState(false)
  


  useEffect(() => {
    getCatagory();
  }, []);

  // Step 1 Search Text
  // console.log(categories)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      }else{
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // Step 2 Search by category
  const handleCheck = (e) => {
    // console.log(e.target.value);
    const inCheck = e.target.value; // ค่าที่เราเลือกติ๊กถูก
    const inState = [...categorySelected];
    const findCheck = inState.indexOf(inCheck); //ถ้าไม่เจอจะ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    
    setCategorySelected(inState);


    if(inState.length > 0){
        actionSearchFilters({category: inState})
    }else{
        getProduct()
    }

  };

  // Step 3 Search by Price
  useEffect(()=>{
    actionSearchFilters({ price })

  },[ok])

  const handlePrice = (value)=>{
    console.log(value)
    setprice(value)

    setTimeout(()=>{
      setOk(!ok)
    },3000)
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      {/* Search by text */}
      <input
        type="text"
        className="rounded-md w-full mb-4 border px-2"
        placeholder="ค้นหาสินค้า"
        onChange={(e) => setText(e.target.value)}
      />

      <hr />
      {/* Search by Category */}
      <div className="mb-4">
        <h1 className="mt-2">หมวดหมู่สินค้า</h1>
        <div className="t">
          {categories.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input type="checkbox" value={item.id} onChange={handleCheck} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* Search by Price */}
      <div  className="my-4">
        <h1 >ค้นหาราคา</h1>
        <div className="mt-3">
          <div className="flex justify-between mt-2">
            <span className="text-red-400">{numberFormat(price[0]) }</span>
            <span className="text-green-600">{ numberFormat(price[1]) }</span>
          </div>
          <Slider 
            onChange={handlePrice}
            range
            min={0} 
            max={100000}
            defaultValue={[1000, 30000]}
            
          />
        </div>
      </div>


    </div>
  );
};

export default SearchCard;
