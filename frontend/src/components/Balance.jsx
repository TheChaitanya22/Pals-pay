import { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error(
          "Failed to fetch balance:",
          error.response?.data || error.message
        );
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="font-bold text-lg mt-10">
      Balance: ₹{balance !== null ? balance : "Loading..."}
    </div>
  );
};

export default Balance;
