const db = require('../db/conexion');

const { presupuestoModel } = require('../models/presupuesto.models');
const { ingresoModel } = require('../models/ingreso.models');
const { MesIgreso } = require('../models/ingreso-mes.models');
const { CostoDirecto } = require('../models/costodir.models');
const { CostoDirectoMes } = require('../models/costodir-mes.models');
const { CostoAdm } = require('../models/costoadm.models');
const { CostoAdmMes } = require('../models/costoadm-mes.models');
const { Recurso } = require('../models/recurso.models');
const { RecursoMes } = require('../models/recurso-mes.models');

/* Clase para implementar el modelo presupuesto */
class Presupuesto {
    constructor (id_presupuesto) {
        this.id_presupuesto = id_presupuesto;
    }

    /* Agregamos el presupuesto a la base de datos */
    darDeAlta (id_usuario, id_presupuesto_front, proyecto) {
        try {
            presupuestoModel.create({
                id_presupuesto: this.id_presupuesto, //Tomamos como id, el que se determina al instanciar la clase
                id_presupuesto_front,
                id_usuario,
                version: 1,
                eliminado: 0,
                proyecto
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    /** Se obtiene el presupuesto solicitado de la base de datos */
    obtener() {
        try {
            const presupuesto = presupuestoModel.findOne({ where: { id_presupuesto: this.id_presupuesto }});
            return presupuesto;
        } catch (err) {
            throw new Error(err);
        }
    }

    /** Modifica el nombre de un proyecto en la base de datos.  */
    actualizar(proyecto) {
        try {
            presupuestoModel.update({ proyecto }, { where: { id_presupuesto: this.id_presupuesto } })
        } catch (err) {
            throw new Error(err);
        }
    }

    /* Borramos de manera logica cierto presupuesto */
    darDeBaja () {
        try {
            presupuestoModel.update({ eliminado: 1}, { where: { id_presupuesto: this.id_presupuesto } })
        } catch (err) {
            throw new Error(err);
        }
    }

    /* Agregamos los recursos ingresos */
    agregarIngresos (id_ingreso, concepto, ingresoPorMes) {
        try {
            ingresoModel.create({ // Ingresamos en la bd cada ingreso recibido
                id_ingreso,
                concepto,
                id_presupuesto: this.id_presupuesto
            });

            ingresoPorMes.map(async function(ingresoPorMes) { // Ingresamos en la bd el conjunto de cantidaddes recibidas
                await MesIgreso.create({
                    id_ingreso,
                    mes: ingresoPorMes.mes,
                    cantidad: ingresoPorMes.cantidad
                });
                console.log('Ingreso por mes agregado: ', ingresoPorMes.mes); 
            });    
        } catch (err) {
            throw new Error(err);
        }
    }

    /** Sustraemos el conjunto de ingresos de la base de datos*/
    async obtenerIngresos () {
        try {
            const ingresos = await ingresoModel.findAll({ where: { id_presupuesto: this.id_presupuesto }});
            let entradas = []
            for (let i = 0; i < ingresos.length; i++) {
                const element = ingresos[i];
                const ingresoPorMes = await MesIgreso.findAll({where: { id_ingreso: element.id_ingreso }});
                entradas.push(ingresoPorMes);
            }
            return { ingresos, entradas };
        } catch (err) {
            throw new Error(err);
        }
    }

    static actualizarIngresos (id_ingreso, concepto, ingresoPorMes) {
        try {
            /* Si hay un cambio, se modifica el concepto del ingreso */
            ingresoModel.update({ concepto }, { where: { id_ingreso } });
            ingresoPorMes.map(async function(ingresoPorMes) { // Ingresamos en la bd el conjunto de cantidaddes recibidas
                await MesIgreso.update({
                    cantidad: ingresoPorMes.cantidad
                } , { where: { id: ingresoPorMes.id }}
                );
            });    
        } catch (err) {
            throw new Error(err);
        }
    }
    agregarCostosDirectos (id_costodirecto, concepto, costosDirPorMes) {
        try {
            CostoDirecto.create({
                id_costodirecto,
                concepto,
                id_presupuesto: this.id_presupuesto,
            });
            costosDirPorMes.map(async function(costosDirPorMes) { // Ingresamos en la bd el conjunto de costos recibidos
                await CostoDirectoMes.create({
                    id_costodirecto,
                    mes: costosDirPorMes.mes,
                    cantidad: costosDirPorMes.cantidad
                });
            });  
        } catch (err) {
            throw new Error(err);
        }
    }

    async obtenerCostosDirectos() {
        try {
            const costosDirectos = await CostoDirecto.findAll({ where: { id_presupuesto: this.id_presupuesto }})
            let entradas = []
            for (let i = 0; i < costosDirectos.length; i++) {
                const element = costosDirectos[i];
                const costoPorMes = await CostoDirectoMes.findAll({where: { id_costodirecto: element.id_costodirecto }});
                entradas.push(costoPorMes);
            }
            return { costosDirectos, entradas };
        } catch (err) {
            throw new Error(err);
        }
    }

    agregarCostosAdm (id_costoadm, concepto, costosAdmPorMes) {
        try {
            CostoAdm.create({
                id_costoadm,
                concepto,
                id_presupuesto: this.id_presupuesto,
            });
            costosAdmPorMes.map(async function(costosAdmPorMes) { // Ingresamos en la bd el conjunto de costos recibidos
                await CostoAdmMes.create({
                    id_costoadm,
                    mes: costosAdmPorMes.mes,
                    cantidad: costosAdmPorMes.cantidad
                });
            });  
        } catch (err) {
            throw new Error(err);
        }
    }

    async obtenerCostosAdmin() {
        try {
            const costosAdm = await CostoAdm.findAll({ where: { id_presupuesto: this.id_presupuesto }})
            let entradas = []
            for (let i = 0; i < costosAdm.length; i++) {
                const element = costosAdm[i];
                const costoPorMes = await CostoAdmMes.findAll({where: { id_costoadm: element.id_costoadm }});
                entradas.push(costoPorMes);
            }
            return { costosAdm, entradas };
        } catch (err) {
            throw new Error(err);
        }
    }

    static actualizarCostos(tipo, id, concepto, costosPorMes) {
        try {
            if(tipo == 'adm') {
                CostoAdm.update({ concepto },{ where: { id_costoadm: id }})
                costosPorMes.map(async function(costosPorMes) { // Ingresamos en la bd el conjunto de costos recibidos
                    await CostoAdmMes.update({
                        mes: costosPorMes.mes,
                        cantidad: costosPorMes.cantidad
                    } , { where: { id: costosPorMes.id }}
                    );
                });
            } else {
                CostoDirecto.update({ concepto }, { where: { id_costodirecto: id }});
                costosPorMes.map(async function(costosPorMes) { // Ingresamos en la bd el conjunto de costos recibidos
                    await CostoDirectoMes.update({
                        mes: costosPorMes.mes,
                        cantidad: costosPorMes.cantidad
                    } , { where: { id: costosPorMes.id }}
                    );
                });
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    agregarRecurso(id_recurso, rol, costo, recursosPorMes) {
        try {
            Recurso.create({
                id_recurso,
                rol,
                costo,
                id_presupuesto: this.id_presupuesto
            });
            recursosPorMes.map(async function(recursosPorMes) { // Ingresamos en la bd el conjunto de costos recibidos
                await RecursoMes.create({
                    id_recurso,
                    mes: recursosPorMes.mes,
                    porcentaje: recursosPorMes.porcentaje
                });
            });  
        } catch (err) {
            throw new Error(err);
        }
    }

    async obtenerRecursos () {
        try {
            const recursos = await Recurso.findAll({ where: { id_presupuesto: this.id_presupuesto }})
            let entradas = []
            for (let i = 0; i < recursos.length; i++) {
                const element = recursos[i];
                const recursosPorMes = await RecursoMes.findAll({where: { id_recurso: element.id_recurso }});
                entradas.push(recursosPorMes);
            }
            return { recursos, entradas };
        } catch (err) {
            throw new Error(err);
        }
    }
    static actualizarRecurso(id_recurso, rol, costo, recursosPorMes) {
        try {
            Recurso.update({
                rol,
                costo
            } , {
                where: { id_recurso }
            });
            recursosPorMes.map(async function(recursosPorMes) { // Ingresamos en la bd el conjunto de costos recibidos
                await RecursoMes.update({
                    mes: recursosPorMes.mes,
                    porcentaje: recursosPorMes.porcentaje
                } , { where: { id: recursosPorMes.id } });
            });  
        } catch (err) {
            throw new Error(err);
        }
    }
}

/* Obtenemos un conjunto de presupuestos */
const getPresupuestos = (id_usuario) => {
    try {
        //Selecciona los presuspuestos que no esten eliminados y coincidan con el usuario loggeado.
        const presupuesto = db.query(`SELECT * FROM presupuestos WHERE eliminado <> 1 AND id_usuario = '${id_usuario}'`); 
        return presupuesto;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { Presupuesto, getPresupuestos };