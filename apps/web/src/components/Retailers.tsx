import getRetailers from "@/api/retailersAPI";
import type { Retailer } from "@/types/Retailer";
import { useEffect, useState } from "react";
import CardRetailer from "./CardRetailer";

function Retailers() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  useEffect(()=>{

    async function loadRetailers() {
      const retailersJson = await getRetailers();
      setRetailers(retailersJson);
    }

    loadRetailers();
  }, [])
    
  return (
    <>
      Retailers
      {retailers.map((retailer) => (
        <CardRetailer key={String(retailer.id)} retailer={retailer} />
      ))}
    </>
  );
}

export default Retailers;
