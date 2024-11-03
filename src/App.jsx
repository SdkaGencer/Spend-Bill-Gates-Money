import { useState } from 'react';
import products from '../public/data.json'; // JSON dosyamızı içeri aktarıyoruz

function App() {
  const [balance, setBalance] = useState(100000000000);
  const [quantities, setQuantities] = useState({}); // Her ürün için miktarları tutacak bir durum
  const [totalSpent, setTotalSpent] = useState(0); // Toplam harcama için durum

  const handleBuy = (product) => {
    // Eğer bakiye üründen yüksekse alım yap
    if (balance >= product.price) {
      setBalance(prevBalance => prevBalance - product.price); // Bakiyeyi azalt
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [product.id]: (prevQuantities[product.id] || 0) + 1, // Miktarı artır
      }));
      setTotalSpent(prevTotal => prevTotal + product.price); // Toplam harcamayı güncelle
    } else {
      alert('Yeterli bakiyeniz yok!');
    }
  };

  const handleSell = (product) => {
    // Eğer üründen en az 1 tane varsa sat
    if (quantities[product.id] > 0) {
      setBalance(prevBalance => prevBalance + product.price); // Bakiyeyi artır
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [product.id]: prevQuantities[product.id] - 1, // Miktarı azalt
      }));
      setTotalSpent(prevTotal => prevTotal - product.price); // Toplam harcamayı güncelle
    } else {
      alert('Bu üründen hiç almadınız!');
    }
  };


  return (
    <div>
      <h1>Spend Bill Gates' Money</h1>
      <h2 className='balance'>Current Balance: ${balance.toLocaleString()}</h2> {/* sayılar arasınsa virgül */}

      <div className='product-container' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div className="product-card" key={product.id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px', width: '200px' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toLocaleString()}</p>
            <p>Quantity: {quantities[product.id] || 0}</p> {/* Ürün miktarını göster */}
            <button onClick={() => handleBuy(product)} disabled={balance < product.price}> Buy</button>

            <button onClick={() => handleSell(product)} disabled={!quantities[product.id]}>Sell</button>
          </div>
        ))}
      </div>
      
      <div className='purchased'>
        {/* Satın alınan ürünlerin listesi */}
        <h2>Your Receipt:</h2>
        <ul>
          {Object.keys(quantities).map(productId => {
            const quantity = quantities[productId];
            if (quantity > 0) {
              const product = products.find(p => p.id === parseInt(productId));
              return (
                <li key={productId}>
                  {product.name} x {quantity} - ${product.price * quantity}
                </li>
              );
            }
            return null;
          })}
        </ul>
        <hr />
        <h2 style={{color:'darkblue' }} >Total Spent: ${totalSpent.toLocaleString()}</h2> {/* Toplam harcamayı göster */}
      </div>

    </div>
  );
}

export default App;
