const { Presupuesto, getPresupuestos } = require('../services/presupuesto.service')

const { v4: uuidv4 } = require('uuid');

/* Controlador que genera un nuevo presupuesto */
const crearPresupuesto = async (req, res) => {
    const { id_presupuesto_front, proyecto} = req.body;
    const id_usuario = req.id;
    const id_unico = id_presupuesto_front + 'mx-1609'; //Concatenamos el id recibido con una cadena para guardar un nuevo id
    const presupuesto = new Presupuesto(id_unico);
    try {
        await presupuesto.darDeAlta(id_usuario, id_presupuesto_front, proyecto); //Se usa el servicio encargado de guardar el presupuesto
        res.status(201).json({ 'message': 'Presupuesto agregado con exito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el Presupuesto: ' + err.message });
    }
}

/* Controlador que regresa los presupuestos en la base de datos */
const obtenerPresupuestos = async (req, res) => {
    try {
        const id_usuario = req.id;
        presupuestos = await getPresupuestos(id_usuario);
        res.status(200).json(presupuestos[0]);
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al leer los presupuestos: ' + err.message});
    }
}

/* Obtiene solo un presupuesto */
const obtenerUnPresupuesto = async (req, res) => {
    const id_presupuesto = req.params.id;
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        const presupuestoObtenido = await presupuesto.obtener()
        res.status(200).json(presupuestoObtenido);
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al obtener el presupuesto: ' + err.message });
    }
}

const actualizarPresupuesto = async (req, res) => { 
    const { proyecto } = req.body;
    const presupuesto = new Presupuesto(req.params.id);
    try {
        presupuesto.actualizar(proyecto);
        res.status(200).json({ 'message': 'Presupuestoa actualizado con exito'})
    } catch (err) {
        res.status(400).json({ 'message': 'Error al actualizar presupuesto: ' + err.message });
    }
}

/* Elimina un presupuesto */
const eliminarPresupuestos = async (req,res) => {
    const id_presupuesto = req.params.id + 'mx-1609';
    try {
        const presupuesto = new Presupuesto(id_presupuesto);
        presupuesto.darDeBaja();
        res.status(200).json({ 'message': 'Presupuesto eliminado con exito.'});
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al eliminar el presupuestos: ' + err.message });
    }
}

/* Crea un nuevo ingreso */
const crearIngreso = async (req, res) => {
    const { concepto, ingresoPorMes, id_presupuesto_front } = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const id_ingreso = uuidv4();
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarIngresos(id_ingreso, concepto, ingresoPorMes);
        res.status(201).json({ 'message':'Ingreso agregado con éxito.'});
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el ingreso: ' + err.message });
    }
}


/* Obtiene un conjunto de ingresos */
const obtenerIngresos = async (req, res) => {
    const presupuesto = new Presupuesto(req.params.id);
    try {
        const ingresos = await presupuesto.obtenerIngresos();
        res.status(200).json(ingresos);
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al obtener los ingresos: ' + err.message });
    }
}

/* Actualiza la informacion de un igreso */
const actualizarIngresos = async (req, res) => {
    const id = req.params.id;
    const { concepto, ingresoPorMes } = req.body;
    console.log(concepto);
    try {
        await Presupuesto.actualizarIngresos(id, concepto, ingresoPorMes)
        res.status(200).send('Ingresos actualizados')
    } catch (err) {
        res.status(400).json({ 'message': 'Error al actualizar los ingresos: ' + err.message })
    }
}

/* Crea un nuevo costo directo */
const crearCostoDirecto = async (req, res) => {
    const { concepto, costosDirPorMes, id_presupuesto_front } = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const id_costodirecto = uuidv4();
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarCostosDirectos(id_costodirecto, concepto, costosDirPorMes);
        res.status(201).json({ 'message': 'Costo directo agregado con éxito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el costo directo: ' + err.message });
    }
}

/* Obtiene un conjunto de costos directos  */
const obtenerCostoDirecto = async (req, res) => {
    const presupuesto = new Presupuesto(req.params.id);
    try {
        const costosDirectos = await presupuesto.obtenerCostosDirectos();
        res.status(200).json(costosDirectos);
    } catch (err) {
        res.status(400).json({ 'message': 'Error al obtener los costos directos: '+ err.message });
    }
}

const actualizarCostosDirectos = async (req, res) => {
    const id = req.params.id;
    const { concepto, costosDirPorMes } = req.body;
    try {
        console.log('Costos dir');
        await Presupuesto.actualizarCostos('dir', id, concepto, costosDirPorMes);
        res.status(200).json({ 'message': 'Costo directo actualizado'})
    } catch (err) {
        res.status(400).json({ 'message': 'Error al actualizar: ' + err.message });
    }
      
}

/* Crea un nuevo costo administrativo */
const crearCostoAdm = async (req, res) => {
    const { concepto, costosAdmPorMes, id_presupuesto_front } = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const id_costoadm = uuidv4();
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarCostosAdm(id_costoadm, concepto, costosAdmPorMes);
        res.status(201).json({ 'message': 'Costo directo agregado con éxito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el costo directo: ' + err.message });
    }
}

/* Obtiene un conjunto de costos administrativos  */
const obtenerCostoAdm = async (req, res) => {
    const id_presupuesto = req.params.id;
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        const costosAdm = await presupuesto.obtenerCostosAdmin();
        res.status(200).json(costosAdm);
    } catch (err) {
        res.status(400).json( { 'message': 'Error al obtener los costos adminisatrativos: ' + err });
    }
}

const actualizarCostoAdm = async (req, res) => {
    const id = req.params.id;
    const { concepto, mes, cantidad } = req.body;
    try {
        await Presupuesto.actualizarCostos('adm', id, concepto, mes, cantidad);
        res.status(200).json({ 'message': 'Costo administrativo actualizado'})
    } catch (err) {
        res.status(400).json({ 'message': 'Error al actualizar: ' + err.message });
    }
      
}

/* Crea un nuevo recurso */
const crearRecurso = async (req, res) => {
    const { rol, costo, recursosPorMes, id_presupuesto_front} = req.body;
    const id_presupuesto = id_presupuesto_front + 'mx-1609';
    const id_recurso = uuidv4();
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        await presupuesto.agregarRecurso(id_recurso, rol, costo, recursosPorMes);
        res.status(201).json({ 'message': 'Recurso agregado con exito.' });
    } catch (err) {
        res.status(400).json({ 'message': 'Problema al crear el recurso: ' + err.message  });
    }
}

/* Obtiene un conjunto de recursos  */
const obtenerRecursos = async (req, res) => {
    const id_presupuesto = req.params.id;
    const presupuesto = new Presupuesto(id_presupuesto);
    try {
        const recursos = await presupuesto.obtenerRecursos();
        res.status(200).json(recursos);
    } catch (err) {
        res.status(400).json( { 'message': 'Error al obtener los recursos: ' + err });
    }
}

const actualizarRecursos = async (req, res) => {
    const id_recurso = req.params.id;
    const { rol, costo, recursosPorMes } = req.body;
    try {
        await Presupuesto.actualizarRecurso(id_recurso, rol, costo, recursosPorMes);
        res.status(200).json({ 'message': 'Costo administrativo actualizado'})
    } catch (err) {
        res.status(400).json({ 'message': 'Error al actualizar: ' + err.message });
    }

}

module.exports = { 
    crearPresupuesto,
    obtenerPresupuestos,
    obtenerUnPresupuesto,
    actualizarPresupuesto,
    eliminarPresupuestos,

    crearIngreso,
    obtenerIngresos,
    actualizarIngresos,
    
    crearCostoDirecto,
    obtenerCostoDirecto,
    actualizarCostosDirectos,
    
    crearCostoAdm,
    obtenerCostoAdm,
    actualizarCostoAdm,
    
    crearRecurso,
    obtenerRecursos,
    actualizarRecursos
}