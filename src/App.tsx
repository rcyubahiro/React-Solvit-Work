import { useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "./app/api/product";
import ExpenseTracker from "./pages/ExpenseTracker";
import Login from "@/pages/Login";

function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState(0);
  const { isError, isLoading, isSuccess, data } = useGetProductsQuery();
  const [isUpdating, setIsUpdating] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  if (isLoading) {
    return <div className="text-2xl text-red-700">Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdating) {
      updateProduct({
        id: productId,
        data: { title, price },
      });
      setIsUpdating(false);
    } else {
      createProduct({ title, price });
    }
    setTitle("");
    setPrice(0);
  };

  console.log(productId);

  const handleClick = (product: any) => {
    console.log("Product to be edited", product);
    setTitle(product.title);
    setPrice(product.price);
    setProductId(product.id);
    setIsUpdating(true);
  };

  return (
    <div className="m-8 w-full h-dvh ">
      {/* <Login /> */}
      <form
        action=""
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col  gap-2 w-1/3"
      >
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-slate-400 px-3 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Product name"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border border-slate-400 px-3 py-2 rounded-md"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-green-700 text-white rounded-md shadow-md"
        >
          {isUpdating ? "Update Product" : "Submit"}
        </button>
      </form>
      {/* <ExpenseTracker /> */}
      <h1>Product list</h1>
      {isError && <div className="text-2xl text-red-700">Error...</div>}
      {isSuccess &&
        data?.products?.map((product: any) => (
          <div
            key={product.id}
            className="border p-4 m-2"
            onClick={() => {
              setProductId(product.id);
              handleClick(product);
            }}
          >
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
