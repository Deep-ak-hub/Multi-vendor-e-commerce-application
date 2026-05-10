import { useEffect, useState } from "react";
import ProductCard from "./components/product-card";

function App() {
  const [state, setState] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/for-home`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState(res);
      });
  }, []);

  
  // console.log("state: ",state);
  
  return (
    <>
    {console.log(state)}
      <div className="flex items-center justify-left flex-wrap gap-6">
        {state?.data?.map((product) => {
          return <ProductCard card={product} key={product._id} />;
        })}
      </div>
    </>
  );
}

export default App;
