import { useEffect, useState } from "react";

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


  const [keranjang, setKeranjang] = useState<Keranjang[]>(() => {
  const saved = localStorage.getItem('keranjang_simpanan');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('keranjang_simpanan', JSON.stringify(keranjang));
}, [keranjang]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.detail.nama.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleItem = (namaItem: string) => {
    setKeranjang((prev) => {
      const isExist = prev.find((item) => item.nama === namaItem);
      if (isExist) {
        return prev.map((item) =>
          item.nama === namaItem ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { nama: namaItem, qty: 1 }];
    });
  };

  const KurangiItem = (namaItem: string) => {
    setKeranjang((prev) => {
      return prev
        .map((item) =>
          item.nama === namaItem ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0); // Jika qty jadi 0, hapus dari array
    });
  };

  const HapusBaris = (namaItem: string) => {
    const itemDicari = keranjang.find((item) => item.nama === namaItem);
    if (itemDicari) {
      setKeranjang((prev) => prev.filter((item) => item.nama !== namaItem)); // Buang item tersebut
    }
  };

  const totalBayar = keranjang.reduce((acc, item) => {
    const hargaSatuan =
      products.find((o) => o.detail.nama === item.nama)?.harga || 0;
    return acc + hargaSatuan * item.qty;
  }, 0);

  return {
    products, 
    loading,
    error,
    keranjang,      
    searchTerm,     
    setSearchTerm,  
    filteredProducts,
    handleItem,
    KurangiItem,
    HapusBaris,
    totalBayar,
  };
};
