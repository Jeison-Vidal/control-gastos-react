import React from 'react'
import Gasto from './Gasto'

const ListadoGasto = ({ gastos, setGastoEditar, eliminarGasto, gastosfiltrados, filtro }) => {
  return (
    <div className='listado-gastos contenedor'>
      <h2>
        {gastos.length ? 'Gastos' : 'No hay gastos aun'}
      </h2>
      {filtro ? (gastosfiltrados.map(gasto => (

        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
      ))

      ) : (gastos.map(gasto => (

        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
          ))
      
      
      
           )
  



      }
{/* 
{(gastos.map(gasto => (

<Gasto
  key={gasto.id}
  gasto={gasto}
  setGastoEditar={setGastoEditar}
  eliminarGasto={eliminarGasto}
/>
  ))



   )
} */}



    </div>
  )
}

export default ListadoGasto