import { useEffect, useState } from "react";
import useEcomStore from "../../Store/ecom-store";

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


    if(inState > 0){
        actionSearchFilters({category: inState})
    }else{
        getProduct()
    }

  };

  // Step 3 Search by Price

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
      <div>
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
    </div>
  );
};

export default SearchCard;
