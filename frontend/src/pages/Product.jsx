import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Loader, SimilarProducts, Title } from '../components/index.js';
import { toast } from 'react-toastify';

function Product() {
  const navigate = useNavigate()
  const { productId } = useParams();
  const { products, updateAddToCart, isAuthenticated } = useContext(ShopContext);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [displayedImage, setDisplayedImage] = useState('');
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    const product = products.find(product => product._id === productId);
    if (product) {
      setCurrentProduct(product);
      setDisplayedImage(product.images[0]);
    }
  }, [products, productId]);

  useEffect(() => {
    if (!currentProduct) {
      const navigateTimeout = setTimeout(() => {
        navigate('/error', {
          state: {
            code: 404,
            message: 'Product not found or product ID is incorrect',
            goback: '/products'
          }
        });
      }, 4000);

      return () => clearTimeout(navigateTimeout);
    }
  }, [currentProduct, navigate]);

  const addToCart = () => {
    if (!size) {
      toast.error('Please select a size before adding to cart.');
      return;
    }
    if (!color) {
      toast.error('Please select a color before adding to cart.');
      return;
    }

    updateAddToCart({
      _id: currentProduct._id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.images[0],
      size,
      color,
      quantity,
    })
  };

  const renderDescription = (description) => {
    const sentences = description.split('.').map(sentence => sentence.trim()).filter(sentence => sentence);

    return (
      <>
        {sentences.map((sentence, index) => (
          <p key={index}>{sentence}.</p>
        ))}
      </>
    );
  };

  if (!currentProduct) return <Loader />

  return (
    <section className="px-[2vw] sm:px-[4vw] md:px-[6vw] my-8">
      <nav className='capitalize opacity-70'>
        <Link to={'/'}>Home / </Link>
        <Link to={'/products'}>Products / </Link>
        <span>{currentProduct.category} / </span>
        <span>{currentProduct.name}</span>
      </nav>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-8 mt-4">
        <aside className="col-span-1 flex flex-row md:flex-col gap-4 order-2 md:order-1">
          {currentProduct.images.map((image, index) => (
            <div key={index} className={`rounded-md cursor-pointer overflow-hidden border-2 border-primary p-0.5 min-w-[3rem] max-w-[4rem] md:max-w-max ${displayedImage === image ? 'border-secondary' : ''}`}>
              <img
                src={image}
                alt={`${currentProduct.name} image ${index + 1}`}
                loading='lazy'
                onMouseOver={() => setDisplayedImage(image)}
              />
            </div>
          ))}
        </aside>

        <div className="col-span-4 order-1 md:order-2 max-w-[30rem]">
          <img
            src={displayedImage}
            alt={currentProduct.name}
            className="w-full h-full rounded-md border border-black/10 max-h-[30rem]"
          />
        </div>

        <div className="col-span-6 flex flex-col gap-4 order-3">
          <h1 className='text-xl font-semibold'>{currentProduct.name}</h1>
          <h2 className='text-3xl font-bold'>${currentProduct.price.toFixed(2)}</h2>

          <h3>
            <span className='font-bold'>Availability: </span>
            {currentProduct.inStock ? 'In Stock' : 'Out of Stock'}
          </h3>

          <div className="font-bold">
            <h3>Sizes</h3>
            <div className="flex rounded-md gap-2 pt-1">
              {currentProduct.sizes.map((s, index) => (
                <button
                  key={index}
                  className={`text-base font-normal rounded-md bg-primary w-max text-white 
                    ${s.toLowerCase() !== 'one size' ? 'min-w-8 aspect-square' : 'px-2 py-1'} 
                    ${size === s ? 'bg-secondary' : ''}`}
                  aria-label={`Select size ${s}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="font-bold">
            <h3>Colors</h3>
            <div className="flex rounded-md gap-3 pt-1">
              {currentProduct.colors.map((c, index) => (
                <button
                  key={index}
                  className={`rounded-full p-3 shadow-md border border-transparent outline-none outline-1
                    ${color === c ? 'outline-black' : ''}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                  onClick={() => setColor(c)}
                >
                </button>
              ))}
            </div>
          </div>

          <div className="font-bold">
            <h3>Quantity</h3>
            <input type="number" className='px-2 py-1 border-none outline-none max-w-16 rounded-md bg-primary/20 mt-1 font-normal'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value <= 10 && e.target.value > 0 ? e.target.value : quantity)}
            />
          </div>

          <button className={`bg-secondary/70 text-white py-2 px-4 rounded-md w-max transition duration-300 ease-in-out ${isAuthenticated() ? 'hover:bg-secondary' : ''}`}
            onClick={addToCart}
            disabled={isAuthenticated() ? false : true}
          >
            Add to Cart
          </button>

        </div>

      </div>

      <article className='text-sm lg:max-w-[37rem] space-y-2 my-8'>
        <h1 className='text-xl font-medium'>Description</h1>
        {renderDescription(currentProduct.description)}
      </article>


      {/* <Title text1={'Reviews'} text2={''} line={true} /> */}

      <div className="my-8"></div>

      <SimilarProducts id={currentProduct._id} category={currentProduct.category} subcategory={currentProduct.subCategory} />

    </section >

  );
}

export default Product;