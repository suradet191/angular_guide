// ต้นฉบับ ตัว
class Product {
  productId: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  created: string;
}

// รับข้อมูล > 1
interface ResponseProducts {
  result: Product[];
  message: string;
}

// รับข้อมูล = 1
interface ResponseProduct {
  result: Product;
  message: string;
}

//
interface ResponseOutOfStock {
  out_of_stock_product: number;
  message: string;
}
