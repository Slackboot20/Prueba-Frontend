import React, { useState } from 'react';
import './Component.css';
import MenuItemModal from './MenuItemModal';

export default function Component() {
  const data = {
    categories: [
      { categori_id: 1, name: "Drinks" },
      { categori_id: 2, name: "Lunch" },
      { categori_id: 3, name: "Food" },
      { categori_id: 4, name: "Sea" }
    ],
    products: [
      { id: 1, name: "Lorem", price: "60.000", available: true, best_seller: true, categories: [1, 4], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 2, name: "ipsum", price: "20.000", available: false, best_seller: false, categories: [4], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 3, name: "dolor", price: "10.000", available: true, best_seller: true, categories: [4], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 4, name: "sit", price: "35.000", available: false, best_seller: false, categories: [1, 2], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 5, name: "amet", price: "12.000", available: true, best_seller: true, categories: [1, 4], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 6, name: "consectetur", price: "120.000", available: true, best_seller: false, categories: [1, 4], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 7, name: "adipiscing", price: "50.000", available: false, best_seller: false, categories: [1, 3], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 8, name: "elit", price: "2.000", available: true, best_seller: false, categories: [1, 3], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 9, name: "Maecenas", price: "150.000", available: true, best_seller: true, categories: [2, 4], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" },
      { id: 10, name: "eu", price: "200.000", available: false, best_seller: true, categories: [2, 3], img: "http://lorempixel.com/200/100/food/", description: "Lorem ipsum dolor sit amet" }
    ]
  };

  const menuItems = data.categories.map((category) => {
    const items = data.products.filter((product) =>
      product.categories.includes(category.categori_id)
    ).map((product) => ({
      id: product.id,
      image: product.img,
      name: product.name,
      description: product.description,
      price: parseInt(product.price.replace('.', ''), 10),
      available: product.available,
      best_seller: product.best_seller
    }));

    return {
      category: category.name,
      id: category.name.toLowerCase(),
      items
    };
  });

  const [filter, setFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('');
  const [priceComparison, setPriceComparison] = useState('greater');
  const [sortBy, setSortBy] = useState('name-asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalIsOpen(false);
  };

  const handlePurchase = (item) => {
    if (!purchasedItems.some(purchasedItem => purchasedItem.id === item.id)) {
      setPurchasedItems([...purchasedItems, item]); // Agregar al carrito si no está presente
    }
    closeModal()
  };

  const removeFromCart = (item) => {
    setPurchasedItems(purchasedItems.filter(purchasedItem => purchasedItem.id !== item.id)); // Eliminar del carrito
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sortProducts = (items) => {
    let sortedItems = [...items];

    if (sortBy === 'name-asc') {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sortedItems.sort((a, b) => b.price - a.price);
    }

    return sortedItems;
  };

  const filterProducts = (items) => {
    let filteredItems = items;

    if (searchQuery) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === 'available') {
      filteredItems = filteredItems.filter(item => item.available);
    }
    if (filter === 'unavailable') {
      filteredItems = filteredItems.filter(item => !item.available);
    }
    if (filter === 'best_seller') {
      filteredItems = filteredItems.filter(item => item.best_seller);
    }

    if (priceFilter) {
      const priceValue = parseInt(priceFilter.replace('.', ''), 10);
      if (priceComparison === 'greater') {
        filteredItems = filteredItems.filter(item => item.price > priceValue);
      } else if (priceComparison === 'less') {
        filteredItems = filteredItems.filter(item => item.price < priceValue);
      }
    }

    return sortProducts(filteredItems);
  };


  return (
    <div>
      <header className="header">
        <img src="https://media.istockphoto.com/id/981368726/es/vector/restaurante-de-comida-y-bebidas-logotipo-tenedor-cuchillo-fondo-vector-imagen.jpg?s=612x612&w=0&k=20&c=3mPGCDXyBeuGpxeuTlHkECM5rAW5cy07bDFi0i0ZCbw=" alt="logo-restaurant" className="logo" />
      </header>

      <div className='horizontal-bar'>

      <div className="filter-button-container">
        <button onClick={() => setIsDropdownOpen(prev => !prev)}>
          Filtrar Productos
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={() => setFilter('all')}>Todos</button>
            <button onClick={() => setFilter('available')}>Disponibles</button>
            <button onClick={() => setFilter('unavailable')}>No Disponibles</button>
            <button onClick={() => setFilter('best_seller')}>Más Vendidos</button>
          </div>
        )}
      </div>

        <div className="price-filter">
          <input
            type="number"
            placeholder="Precio"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
          <select onChange={(e) => setPriceComparison(e.target.value)} value={priceComparison}>
            <option value="greater">Mayor que</option>
            <option value="less">Menor que</option>
          </select>
        </div>
        
        <div className='filter-order'>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (Ascendente)</option>
            <option value="price-desc">Precio (Descendente)</option>
          </select>
        </div>


        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      <div className="button-container">
        {menuItems.map((section, index) => (
          <button key={index} onClick={() => scrollToSection(section.id)}>
            {section.category}
          </button>
        ))}
      </div>

      <div className="cart-container">
        <h2>Carrito</h2>
          {purchasedItems.length === 0 ? (
            <p>El carrito está vacío</p>
              ) : (
          <ul>
              {purchasedItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <span>{item.name} - {item.price}</span>
                    </div>
                    <button onClick={() => removeFromCart(item)} className="remove-button">Eliminar</button>
                  </li>
              ))}
          </ul>
          )}
        </div>


      <div>
        {menuItems.map((section, index) => (
          <div id={section.id} key={index}>
            <h2 className="section-title">{section.category}</h2>
            <div className="menu-items">
              {filterProducts(section.items).length > 0 ? (
                filterProducts(section.items).map((item, idx) => (
                  <button
                    className={`menu-item ${!item.available ? "unavailable" : ""} ${item.best_seller ? "best-seller" : ""}`}
                    key={idx}
                    onClick={() => openModal(item)}
                    disabled={!item.available}
                  >
                    <img src={item.image} alt={item.name} className="menu-image" />
                    <div className="menu-details">
                      <h2>{item.name}</h2>
                      <p className="menu-description">{item.description}</p>
                      <p className="menu-price">{item.price}</p>
                      {item.available && <p className="menu-status available">Available</p>}
                      {!item.available && <p className="menu-status unavailable">Unavailable</p>}
                      {item.best_seller && <p className="menu-highlight">Best Seller</p>}
                    </div>
                  </button>
                ))
              ) : (
                <p>No se encontraron productos para esta categoría con los filtros seleccionados.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <MenuItemModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        item={selectedItem}
        onPurchase={handlePurchase}
        isPurchased={selectedItem && purchasedItems.includes(selectedItem.id)}
      />

      <div>
        <h3>Todos los derechos reservados 2024</h3>
      </div>
    </div>
  );
}