import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "./redux/productSlice";

function App() {
  const { isLoggedIn, userName, role, login, logout } = useContext(AuthContext);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Context API + Redux Toolkit</h1>

      {!isLoggedIn ? (
        <>
          <button onClick={() => login("Drishti", "admin")}>
            Login as Admin
          </button>
          <button onClick={() => login("Drishti", "user")}>
            Login as User
          </button>
        </>
      ) : (
        <>
          <h3>
            Welcome {userName} ({role})
          </h3>
          <button onClick={logout}>Logout</button>

          {role === "admin" && (
            <>
              <br /><br />
              <input
                placeholder="Enter product name"
                onChange={e => setProductName(e.target.value)}
              />
              <button
                onClick={() =>
                  dispatch(addProduct({ id: Date.now(), name: productName }))
                }
              >
                Add Product
              </button>
            </>
          )}

          <ul>
            {products.map(p => (
              <li key={p.id}>
                {p.name}
                {role === "admin" && (
                  <button onClick={() => dispatch(removeProduct(p.id))}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
