import { useState } from "react";

const notas = () => {
    // DEBE ESTAR DENTRO DE OTRA FUNCION GLOBAL! useEffect que corre solo la primera vez cuando carga la pag porque el segundo argumento esta vacio. 
    //Si el argumento tuviera algo, then cada vez que cambie ese argumento, corre la funtion dentro. 
    //Un useEffec es una function dentro de otra function siendo la interna la que se ejecuta cuando cambia el segundo argumento. NUNCA DEBE NO TENER SEGUNDO ARGUMENTO PORQUE SI NO, QUEDA EN LOOP Y ROMPE EL WEBSITE
    /*
    useEffect(() => {
        console.log("hola");
    }, [])
    */

    //Onchange = Agrega a variable cada cambio que se va dando dentro del imput. En la parte de console.log podria ir el setter del useState. 
    //La forma de abajo es la más básica pero para menos código, dentro del onchange dentro del imput, agregar lo que correria la function (example 2)
    // example 1 = const identificadorProducto = (e) => { console.log(e.target.value) }; 
    // example 2= Dentro del la form or tabla: <input onChange={(e)=> {console.log(e.target.value)}} type="text" required /> / Same, console.log can be chnaged to setter

    //onClick = cuando click en el boton, se ejecuta lo que este en la variable. Donde ese haga click debe tener type="button"
     /*
     onClick={()=>{toastExito,sendBackend}}
     */
    //UseState = permite crear setters de una variable. Can be used along with OnChange and OnClick. Primer argunmento is like getter, sencond setter from Java
    // const [productID,setProductID]=useState("");

    // IF Simplificado (Renderización condicional). SAME SINTAX "IF" EXCEL (IF=x=y,j(true),k(false)) ---> variable ? X : Y (If variable is true, equal to X, else equal to Y)
    // You can use an useEffect along with it which was bringing a variable from a useState
    /*
    const [edad,setEdad] = useState(0); // set to 0 by default
    const [esMenor,setEsMenor] = useState(false); // set to false by default
    useEffect(() => {
        if(edad>18){
            "pasa K"
            setEsMenor(false);
        }else{
            "pasa J"
            setEsMenor(true);
        }
    }, [edad])
    
    {esMenor?"Pasa X: Pasa Y"} -- Si variable esMenor es true, X, otherwise Y. ** USE {} when within HTML code for JS code to work
    */

   // TOGGLE (Similar to IF above but without else) Use it when want something to show when button clicked and then hide, when clicked again
   /* 
    const [mostrarCampos,setMostrarCampos] = useState(false);
    <buttom>onClick={()=>setMostrarCampos(!mostrarCampos)}</buttom> // bc ! esta dentro de () means, everytime set.. es diferente a mostra.. muestre this or that. 

    {mostrarCampos && ("Show whatever you want to happen")} 
    */

    // MAP = > Cuando entra un .json pero queremos que devuelva HTML / Sirve para que cargue datos de una DB
    /*
    {listaProductos.map(productos)}=>{ 
        <td>{producto.valor}</td> . // Se pone whatever este como variables en las columnas, en este caso "valor", se repite con tods las columns
    }
    */

    // CONCATENACIÒN DE STRINGS/ CLASE CONDICIONAL (YOU CAN CONCATENATE A CHANGING VARIABLE MAYBE MODIFIED BY A STATE WITH A NORMAL STRING)
    // FORMA BÀSICA Y NO RECOMENDADA BY PROF  - USING + like usual code PY or Java
    // FORMA RECOMEDADA -> STRING LITERALS = (USAR COMILLAS AL REVES)
    /*
    className={ `abc${colorBoton}`} // Within a CSS class (Tailwind works) + {} (code JS within HTLM goes with braces) + $ + variable within
    */ 
   // onSubmit = similar to the other ones on... however recommeded to use in forms. 
   /*
    const dataBackEnd = (e) =>{
        e.preventDefault(); // this is for the pag to load quicker when submitting. Without this kinda opens another pag to send the info 
        // poner todo lo que involucre enviar info al backend here
    }   
   <form onSubmit={dataBackEnd}>
   </form>
   */

   // useRef = Use it along with forms to avoid creating a lot of useStates in case there are many fields to be filled in the form.
   // This is the recommedned by the prof and makes sense. 
    /*
    import {useRef} from "React"; // 1- Import useRef
    const form = useRef(null); // 2 - Crear const for form , set to null 
    <form ref={form} onSubmit={submitirInfo}> // 3 - put the ref word in the HTML form & also put OnSubmit
    const submitirInfo = (e) =>{  // 4 - create const for OnSubmit as stated above line 64
        e.preventDefault();
        const fd = new FormData(form.current); 5 - create const "FormData", inbuilt React function for forms (creates a dictionary, key and value*)

        const nuevoProducto = {}; // 6 - create const to itirate thru FormData dictionary 
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
            console.log(nuevoProducto) // In case you wanna show the dictionary in console
        })
    }
    */

    //CRUD(CREATE, READ, UPDATE, DELETE) - ESTANDAR REST (GET,POST,PUT/PATCH/DELETE) // ANOTHER POPULAR STANDARD IS GRAPHQL 

    // Mensajes cuando el cursor pasa sobre algo. TOOLTIP -https://mui.com/components/tooltips/ // Import Material UI (ONLY CORE) to make it work

    // POP UP - DIALOG // Use it only when user needs to accept or deny an action. (pagos, borrar algo, etc..)  - https://mui.com/components/dialogs/

    // LOADING - PROGRESO // https://mui.com/components/progress/ - Mostrar loading 

    // ACORDEON - https://mui.com/components/accordion/ - Desglose 

    // Paginación // TABS https://mui.com/components/tabs/ - Cuando deben haber varias paginas en algo 

    // USAR CALENDARIOS, FECHAS Y DEMÁS  - https://material-ui-pickers.dev/ 

}