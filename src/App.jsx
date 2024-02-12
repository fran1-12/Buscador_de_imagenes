import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import './App.css'
const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGENES_PER_PAGE = 20;
function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async () => {
    try {
      const {data} = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGENES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );      
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log('error', error);            
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };
  
  const handleSelection = (selection)=> {
    searchInput.current.value = selection;
    fetchImages();
  }
  
  const handleRefresh = () => {
    window.location.reload();
  };

return (
    <div className='container'>
      <h1 className='title'>BUSCADOR DE IMÁGENES</h1>
      <div className='search-section'>
            <Form onSubmit={handleSearch}>
               <Form.Control 
               type='search'
               placeholder='Escriba algo para empezar a buscar...' 
               className='search-input'
               ref={searchInput}
               />
            </Form>
      </div>          
      <div className='filters'>
          <div onClick={() => handleSelection('naturaleza')} >Naturaleza</div>
          <div onClick={() => handleSelection('pajaros')}>Pájaros</div>
          <div onClick={() => handleSelection('gatos')}>Gatos</div>
          <div onClick={() => handleSelection('zapatos')}>Zapatos</div>
          <div onClick={() => handleRefresh()}>Refrescar</div>
      </div>       
      <div className='images'>
          {
            images.map((image)=>{
              return(
                <img 
                  key={image.id}
                  src={image.urls.small}
                  alt={image.alt_description}
                  className='image'
                />
              )
            })

          }
      </div>
    </div>
  )
}

export default App
