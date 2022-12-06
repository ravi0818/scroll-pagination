import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const ref = useRef();
  const fetchData = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products?skip=${skip}&limit=5`
    );
    const newData = response.data.products;
    setData((prev) => [...prev, ...newData]);
    console.log(newData);
    setSkip((prev) => prev + 5);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      // console.log(scrollTop + clientHeight + 1, scrollHeight);
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        console.log(scrollTop + clientHeight + 1, scrollHeight);
        fetchData();
      }
    }
  };

  return (
    <div
      ref={ref}
      onScroll={() => onScroll()}
      style={{
        height: "100vh",
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
      }}
    >
      {data.map((item) => {
        return (
          <div
            style={{
              padding: "2rem",
              border: "1px solid grey",
              margin: "1rem",
            }}
          >
            <img src={item.thumbnail} alt={item.title} height={200} />
            <div>
              <div>
                <h2>
                  {item.title} - {item.brand}
                </h2>
              </div>
              <div>
                <h3>Rs. {item.price}/-</h3>
              </div>
              <div>{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
