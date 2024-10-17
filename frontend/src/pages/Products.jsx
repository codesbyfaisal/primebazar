import { useContext, useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Loader, ProductCard, Title } from '../components/index.js';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';

const Products = () => {
  const { products, isLoading } = useContext(ShopContext)
  const [allProducts, setAllProducts] = useState([])
  const [value, setValue] = useState([3, 300]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the filter and not the toggle button
      if (
        filterRef.current &&
        !buttonRef.current.contains(event.target) &&
        !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef, buttonRef]);

  const toggleFilter = (event) => {
    // Prevent other click events from triggering
    event.stopPropagation();

    // Toggle the filter open state
    setIsFilterOpen((prevState) => !prevState);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value))
    } else setCategory((prev) => [...prev, e.target.value])
  }

  const handleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value))
    } else setSubCategory((prev) => [...prev, e.target.value])
  }

  const handleSort = (e) => {
    setSort(e.target.value)
  }

  const applyFilter = () => {
    let productsCopy = products.slice()

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }
    productsCopy = productsCopy.filter((item) => item.price >= value[0] && item.price <= value[1])

    if (sort === 'asc') {
      productsCopy = productsCopy.sort((a, b) => a.price - b.price)
    } else if (sort === 'desc') {
      productsCopy = productsCopy.sort((a, b) => b.price - a.price)
    } else if (sort === 'latest') {
      productsCopy = productsCopy.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    if (search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setAllProducts(productsCopy)
  }

  useEffect(() => {
    applyFilter()
  }, [products, category, subCategory, value, sort, search])

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className='px-[2vw] sm:px-[4vw] md:px-[6vw] flex gap-4 my-12'>

      {/* Filters */}
      <div className="w-[23%] min-w-60 hidden lg:flex flex-col gap-4 mt-2 text-sm">
        <h1 className='text-2xl'>Filters</h1>

        {/* Search Bar */}
        <div className='rounded-md px-4 flex items-center gap-2 w-full bg-white shadow-sm mt-2'>
          <input type="search" id="search" className='py-2 w-full border-none outline-none' placeholder='Search Products' onChange={(e) => setSearch(e.target.value)} autoFocus={true} />
          <img src={assets.search_icon} alt="" className='w-4 h-4' />
        </div>

        <div className="bg-white/80 px-3 py-4 rounded-md">
          {/* Price Range */}
          <h3 className='text-lg font-normal mb-2'>Price Range</h3>
          <Box sx={{ width: '100%' }}>
            <Slider
              getAriaLabel={() => 'Minimum distance shift'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              disableSwap
              min={0}
              max={300}
              sx={{
                color: 'darkgray',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#af9f8f',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#af9f8f',
                  borderColor: '#af9f8f',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#333',
                },
              }}
            />
          </Box>

          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center py-1 pl-1 border border-gray-300 rounded-full text-inherit shadow-sm w-1/2">
              <label htmlFor="min">min</label>
              <input
                type="number"
                id="min"
                name="min"
                className="bg-transparent outline-none ml-1 pl-1 border-l border-gray-300 w-full"
                value={value[0]}
                onChange={(e) => setValue([Number(e.target.value), value[1]])}
              />
            </div>

            <div className="flex items-center py-1 pl-1 border border-gray-300 rounded-full text-inherit shadow-sm w-1/2">
              <label htmlFor="max">max</label>
              <input
                type="number"
                id="max"
                name="max"
                className="bg-transparent outline-none ml-1 pl-1 border-l border-gray-300 w-full"
                value={value[1]}
                onChange={(e) => setValue([value[0], Number(e.target.value)])}
              />
            </div>
          </div>

        </div>

        {/* Categories */}
        <ul className='bg-white/80 px-3 py-4 rounded-md text-inherit grid gap-1 [&>li]:flex [&>li]:items-center [&>li]:gap-1.5 [&>li>input]:size-4 [&>li>input]:text-black [&>li>input]:cursor-pointer'>
          <li className='text-lg font-normal mb-1'>Categories</li>
          <li><input type="checkbox" id="men" onChange={handleCategory} value={'men'} />Mens</li>
          <li><input type="checkbox" id="women" onChange={handleCategory} value={'women'} />Womens</li>
          <li><input type="checkbox" id="boy" onChange={handleCategory} value={'boy'} />Boys</li>
          <li><input type="checkbox" id="girl" onChange={handleCategory} value={'girl'} />Girls</li>
          <li><input type="checkbox" id="kids" onChange={handleCategory} value={'kids'} />Kids</li>
        </ul>

        <ul className='bg-white/80 px-3 py-4 rounded-md text-inherit grid gap-1 [&>li]:flex [&>li]:items-center [&>li]:gap-1.5 [&>li>input]:size-4 [&>li>input]:text-black [&>li>input]:cursor-pointer'>
          <li className='text-lg font-normal mb-1'>Type</li>
          <li><input type="checkbox" id="outerwear" value={'outerwear'}
            onChange={handleSubCategory} />Outerwear</li>
          <li><input type="checkbox" id="dresses" value={'dresses'}
            onChange={handleSubCategory} />Dresses</li>
          <li><input type="checkbox" id="footwear" value={'footwear'}
            onChange={handleSubCategory} />Footwear</li>
          <li><input type="checkbox" id="bottoms" value={'bottoms'}
            onChange={handleSubCategory} />Bottoms</li>
          <li><input type="checkbox" id="accessories" value={'accessories'}
            onChange={handleSubCategory} />Accessories</li>
          <li><input type="checkbox" id="t-shirts" value={'t-shirts'}
            onChange={handleSubCategory} />T-Shirts</li>
          <li><input type="checkbox" id="activewear" value={'activewear'}
            onChange={handleSubCategory} />Activewear</li>
          <li><input type="checkbox" id="knitwear" value={'knitwear'}
            onChange={handleSubCategory} />Knitwear</li>
          <li><input type="checkbox" id="bags" value={'bags'}
            onChange={handleSubCategory} />Bags</li>
          <li><input type="checkbox" id="sleepwear" value={'sleepwear'}
            onChange={handleSubCategory} />Sleepwear</li>
          <li><input type="checkbox" id="shirts" value={'shirts'}
            onChange={handleSubCategory} />Shirts</li>
        </ul>
      </div>

      {/* Products */}
      <div className="lg:w-10/12 grid gap-6">
        <div className="flex flex-col gap-4 justify-between sm:items-center sm:flex-row">
          <Title text1="all" text2="products" line={true} />

          {/* Mobile Filters */}
          <div className="flex items-center justify-between gap-4 relative">
            <button className='bg-white/90 py-2 px-3 rounded-md flex items-center gap-2 lg:hidden'
              onClick={toggleFilter}
              ref={buttonRef}>Filters
              <img src={assets.dropdown_icon} alt="" className='w-3 h-3' />
            </button>

            <div className={`${isFilterOpen ? 'grid' : 'hidden'} lg:hidden gap-2 text-sm absolute top-[120%] bottom-0 z-50 w-full max-w-[20rem] h-max bg-white rounded-md overflow-hidden shadow-lg`}
              ref={filterRef}>
              {/* Search Bar */}
              <div className='px-4 py-2 flex items-center gap-2 w-full shadow-sm mt-4'>
                <input type="search" id='search1' className='w-full border-none outline-none' placeholder='Search Products' onChange={(e) => setSearch(e.target.value)} />
                <img src={assets.search_icon} alt="" className='w-4 h-4' />
              </div>

              <div className="shadow-sm py-2 px-4">
                {/* Price Range */}
                <h3 className='text-lg font-normal mb-2'>Price Range</h3>
                <Box sx={{ width: '100%' }}>
                  <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    disableSwap
                    min={0}
                    max={300}
                    sx={{
                      color: 'darkgray',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#af9f8f',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#af9f8f',
                        borderColor: '#af9f8f',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#333',
                      },
                    }}
                  />
                </Box>

                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center py-1 pl-2 border border-gray-300 rounded-full text-inherit shadow-sm w-1/2">
                    <label htmlFor="min1">min</label>
                    <input
                      type="number"
                      id="min1"
                      name="min1"
                      className="bg-transparent outline-none ml-1 pl-1 border-l border-gray-300 w-full"
                      value={value[0]}
                      onChange={(e) => setValue([Number(e.target.value), value[1]])}
                    />
                  </div>

                  <div className="flex items-center py-1 pl-2 border border-gray-300 rounded-full text-inherit w-1/2 ">
                    <label htmlFor="max1">max</label>
                    <input
                      type="number"
                      id="max1"
                      name="max1"
                      className="bg-transparent outline-none ml-1 pl-1 border-l border-gray-300 w-full"
                      value={value[1]}
                      onChange={(e) => setValue([value[0], Number(e.target.value)])}
                    />
                  </div>
                </div>

              </div>

              {/* Categories */}
              <ul className='bg-white/80 px-3 py-2 shadow-sm text-inherit grid gap-1 [&>li]:flex [&>li]:items-center [&>li]:gap-1.5 [&>li>input]:size-4 [&>li>input]:text-black [&>li>input]:cursor-pointer'>
                <li className='text-lg font-normal mb-1'>Categories</li>
                <li><input type="checkbox" id="men1" onChange={handleCategory} value={'men'} />Mens</li>
                <li><input type="checkbox" id="women1" onChange={handleCategory} value={'women'} />Womens</li>
                <li><input type="checkbox" id="boy1" onChange={handleCategory} value={'boy'} />Boys</li>
                <li><input type="checkbox" id="girl1" onChange={handleCategory} value={'girl'} />Girls</li>
                <li><input type="checkbox" id="kids1" onChange={handleCategory} value={'kids'} />Kids</li>
              </ul>

              <ul className='bg-white/80 px-3 py-2 shadow-sm text-inherit grid gap-1 [&>li]:flex [&>li]:items-center [&>li]:gap-1.5 [&>li>input]:size-4 [&>li>input]:text-black [&>li>input]:cursor-pointer'>
                <li className='text-lg font-normal mb-1'>Type</li>
                <li><input type="checkbox" id="outerwear1" value={'outerwear'}
                  onChange={handleSubCategory} />Outerwear</li>
                <li><input type="checkbox" id="dresses1" value={'dresses'}
                  onChange={handleSubCategory} />Dresses</li>
                <li><input type="checkbox" id="footwear1" value={'footwear'}
                  onChange={handleSubCategory} />Footwear</li>
                <li><input type="checkbox" id="bottoms1" value={'bottoms'}
                  onChange={handleSubCategory} />Bottoms</li>
                <li><input type="checkbox" id="accessories1" value={'accessories'}
                  onChange={handleSubCategory} />Accessories</li>
                <li><input type="checkbox" id="t-shirts1" value={'t-shirts'}
                  onChange={handleSubCategory} />T-Shirts</li>
                <li><input type="checkbox" id="activewear1" value={'activewear'}
                  onChange={handleSubCategory} />Activewear</li>
                <li><input type="checkbox" id="knitwear1" value={'knitwear'}
                  onChange={handleSubCategory} />Knitwear</li>
                <li><input type="checkbox" id="bags1" value={'bags'}
                  onChange={handleSubCategory} />Bags</li>
                <li><input type="checkbox" id="sleepwear1" value={'sleepwear'}
                  onChange={handleSubCategory} />Sleepwear</li>
                <li><input type="checkbox" id="shirts1" value={'shirts'}
                  onChange={handleSubCategory} />Shirts</li>
              </ul>
            </div>

            <div className="bg-white/80 pr-3 rounded-md overflow-hidden">
              <select name="sort" className='pl-3 py-2 outline-none text-sm font-normal cursor-pointer' onChange={handleSort}>
                <option value="latest">Sort by: Latest</option>
                <option value="asc">Sort by: Low to High</option>
                <option value="desc">Sort by: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            allProducts.length === 0 ? <div className='flex flex-col items-center text-center col-span-full bg-white rounded-md p-4 select-none pointer-events-none'><img src={assets.noproduct_img} loading='lazy' className='max-w-[20rem]' />
              <p className='text-lg font-semibold mt-4'>No Products Found</p></div> : allProducts.map((product, index) => (
                <ProductCard key={index} id={product._id} images={product.images} name={product.name} price={product.price} sale={product.sale ? product.saleOff : product.sale} />)
              )
          }
        </div>
      </div>
    </section>
  );
};

export default Products;