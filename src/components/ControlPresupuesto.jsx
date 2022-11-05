import React from "react";
import { useEffect ,useState} from "react";
import Swal from 'sweetalert2'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
const ControlPresupuesto = ({presupuesto,gastos,setGastos,setPresupuesto,setIsValidPresupuesto}) => {
//  le damos formato de peso colombiano a nuestro valor ingresado se debe revisar que el valor que se va  a convertir si sea tipo number porque si no, no funciona la conversion

  const [disponible,setDisponible]=useState(0);
  const [gastado,setGastado]=useState(0);
  const [procentaje,setPorcentaje]=useState(0)

    const formatearCantidad=(cantidad)=>{
       return cantidad.toLocaleString('es-CO',{style:'currency',currency:'COP'})
       
    }
    useEffect(() => {

      // calcular el porcentaje para el circulo
    
     const totalGastado=gastos.reduce((total,gasto)=>gasto.cantidad + total,0);
     const totalDisponible=presupuesto - totalGastado;
     const nuevoProsepuesto=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
     
     setDisponible(totalDisponible)
     setGastado(totalGastado)
     setTimeout(() => {
      setPorcentaje(nuevoProsepuesto)
     }, 500);
    }, [gastos])
  const handleResetApp=()=>{

    let timerInterval
    Swal.fire({
      title: 'Se borrara su presupuesto',
      html: 'Solo Tomara unos segundos <b></b> milliseconds.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false)
      }
    })
   
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div className="">
        <CircularProgressbar
        styles={buildStyles({
          pathColor: procentaje> 100 ? 'red' : '#3b82f6',
          trailColor:'#f5f5f5',
          textColor:procentaje> 100 ? 'red' : '#3b82f6'


        })}
        value={procentaje}
        text={`${procentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
           <span> Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible <0 ? 'negativo' : ''}`}>
           <span> Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
           <span> Gastado: </span>{formatearCantidad(gastado)}
        </p>
      

      </div>
    </div>
  );
};

export default ControlPresupuesto;
