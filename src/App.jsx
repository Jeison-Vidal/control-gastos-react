import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { v4 as uuidv4 } from 'uuid';
import ListadoGasto from './components/ListadoGasto';
import { object } from 'prop-types';
import Filtro from './components/Filtro';


function App() {
 const [presupuesto,setPresupuesto]=useState(
  Number(localStorage.getItem('presupuesto')??0)
 );
 const [isValidPresupuesto,setIsValidPresupuesto]=useState(false);
 const [modal,setModal]=useState(false);
 const [animarModal,setAnimarModal]=useState(false);
 const [gastos,setGastos]=useState(

  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) :[]

 )
 const [gastoEditar,setGastoEditar]=useState({})
 const[filtro,setFiltro]=useState('')
 const[gastosfiltrados,setGastosFiltrado]=useState([])



 useEffect(() => {
  if(Object.keys(gastoEditar).length>0){
    setModal(true);
  
    setTimeout(()=>{
  
     setAnimarModal(true);
    },500);
  }
}, [gastoEditar])
 const handleNuevoGasto =()=>{

  
  setModal(true);
  setGastoEditar({});
  setTimeout(()=>{

   setAnimarModal(true);
  },500);

 }
 const guardarGasto=(gasto)=>{
      if(gasto.id){
        const gastosActualizados=gastos.map(gastosState=>gastosState.id=== gasto.id ? gasto : gastosState)
        setGastos(gastosActualizados)
        setGastoEditar({});

      }
      else{
         gasto.id=uuidv4();
        gasto.fecha=Date.now();
        setGastos([...gastos,gasto])
      }

 

  
  setAnimarModal(false);
  setTimeout(() => {
    setModal(false);
  }, 500);

}
const eliminarGasto = id =>{

  const  gastosActualizados=gastos.filter(gasto=>gasto.id !== id);
  setGastos(gastosActualizados);
  
}

useEffect(() => {
localStorage.setItem('presupuesto',presupuesto ?? 0)


}, [presupuesto])

useEffect(() => {
   localStorage.setItem('gastos',JSON.stringify(gastos)?? [])

   
   }, [gastos])



useEffect(() => {
    if(filtro){
    const resultadoFiltro=gastos.filter(gasto=>gasto.categoria===filtro);
    setGastosFiltrado(resultadoFiltro)
    
    }
    
    
    }, [filtro])


useEffect(() => {
 const presupuestoLS= Number(localStorage.getItem('presupuesto',presupuesto ?? 0))
  if(presupuestoLS>0){

    setIsValidPresupuesto(true)
  }
  
  }, [])

  return (
    <div className={modal ? 'fijar': ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}

        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
        <main>
        <Filtro 
        filtro={filtro}
        setFiltro={ setFiltro}
        />
        <ListadoGasto
        gastosfiltrados={gastosfiltrados}
        filtro={filtro}
        gastos={gastos}
        setGastoEditar={setGastoEditar}
        eliminarGasto={eliminarGasto}
        />
        </main>
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}


      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App
