import { useEffect, useState } from "react";
import { useKasirStore } from "../store/useKasirStore";

export interface Product {
  id: string;
  detail: {
    nama: string;
    vendor: string;
  };
  harga: number;
}

export interface Keranjang {
  nama: string;
  qty: number;
}

export interface DummyProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
}

// const products:Product[] = [
//     {id: "1", detail: {nama: "Weekly Diamond", vendor: "mobile legend"}, harga:16000},
//     {id: "2", detail: {nama: "Battle Pass", vendor: "mobile legend"}, harga:72000},
//     {id: "3", detail: {nama: "Skin Legend", vendor: "mobile legend"}, harga:1200000},
//     {id: "4", detail: {nama: "Special Set", vendor: "mobile legend"}, harga:100000},
// ];



export const useKasir = () => {
  const [products, setProducts] = useState<Product[]>([]); // State untuk data dari API
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState<string | null>(null); // State jika gagal ambil data
  const { keranjang, tambahItem, kurangiItem, hapusItem } = useKasirStore();


  
  useEffect(()=>{
    const getData = async () => {
      try{
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products/category/smartphones');
        const data = await response.json();

        const formatData = data.products.map((p: DummyProduct) => ({
          id: String(p.id),
          detail: {nama: p.title, vendor:p.brand},
          harga: p.price * 15000
        }));
        setProducts(formatData);
      }catch(err){
        if(err instanceof Error){
          setError(err.message);
        }
      }finally{
        setLoading(false);
      }
    };
    getData();
  }, []);

  const totalBayar = keranjang.reduce((acc, item) => {
    const hargaSatuan = products.find((o) => o.detail.nama === item.nama)?.harga || 0;
    return acc + hargaSatuan * item.qty;
  }, 0);




  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.detail.nama.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  

  return {
    products, 
    loading,
    error,
    keranjang,      
    searchTerm,     
    setSearchTerm,  
    filteredProducts: products,
    handleItem: tambahItem,
    KurangiItem: kurangiItem,
    HapusBaris: hapusItem,
    totalBayar,
  };
};
