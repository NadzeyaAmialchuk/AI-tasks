import axios, { AxiosResponse } from 'axios';

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface DefectiveProduct {
  id: number;
  title: string;
  defects: string[];
}

async function testProductData(): Promise<void> {
  try {
   
    const response: AxiosResponse<Product[]> = await axios.get('https://fakestoreapi.com/products');
   
    if (response.status !== 200) {
      console.error(`Error: Expected status code 200, got ${response.status}`);
      return;
    }
    console.log('Test 1 passed: Server responded with status code 200');
    
    const products: Product[] = response.data;
    const defectiveProducts: DefectiveProduct[] = [];
    
    products.forEach((product: Product) => {
      const defects: string[] = [];
      
     if (!product.title || product.title.trim() === '') {
        defects.push('Empty title');
      }
      
      if (product.price < 0) {
        defects.push('Negative price');
      }
      
      if (product.rating?.rate > 5) {
        defects.push('Rating exceeds 5');
      }
      
      if (defects.length > 0) {
        defectiveProducts.push({
          id: product.id,
          title: product.title,
          defects: defects
        });
      }
    });
   
    if (defectiveProducts.length === 0) {
      console.log('Test 2 passed: No products with defects found');
    } else {
      console.log('Test 2 found defects in the following products:');
      console.table(defectiveProducts);
    }
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error testing product data:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}

testProductData();