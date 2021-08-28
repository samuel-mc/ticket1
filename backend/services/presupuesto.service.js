const db = require('../db/conexion');

const { presupuestoModel } = require('../models/presupuesto.models');
const { ingresoModel } = require('../models/ingreso.models');
const { MesIgreso } = require('../models/ingreso-mes.models');
const { CostoDirecto } = require('../models/costodir.models');
const { CostoAdm } = require('../models/costoadm.models');
const { Recurso } = require('../models/recurso.models');

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
            let ingresosPorMes = []
            for (let i = 0; i < ingresos.length; i++) {
                const element = ingresos[i];
                const ingresoPorMes = await MesIgreso.findAll({where: { id_ingreso: element.id_ingreso }});
                ingresosPorMes.push(ingresoPorMes);
            }
            return { ingresos, ingresosPorMes };
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
    agregarCostosDirectos (concepto, mes, cantidad) {
        try {
            CostoDirecto.create({
                concepto,
                mes,
                cantidad,
                id_presupuesto: this.id_presupuesto,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    obtenerCostosDirectos() {
        try {
            const costoDirecto = CostoDirecto.findAll({ where: { id_presupuesto: this.id_presupuesto }})
            return costoDirecto;
        } catch (err) {
            throw new Error(err);
        }
    }

    agregarCostosAdmin (concepto, mes, cantidad) {
        try {
            CostoAdm.create({
                concepto,
                mes,
                cantidad,
                id_presupuesto: this.id_presupuesto,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    obtenerCostosAdmin() {
        try {
            const costosAdm = CostoAdm.findAll({ where: { id_presupuesto: this.id_presupuesto }})
            return costosAdm;
        } catch (err) {
            throw new Error(err);
        }
    }

    static actualizarCostos(tipo, id, concepto, mes, cantidad) {
        try {
            tipo == 'adm' ? CostoAdm.update({ concepto, mes, cantidad },{ where: { id_costoadm: id }}) : CostoDirecto.update({concepto, mes, cantidad}, { where: { id_costodirecto: id }});
        } catch (err) {
            throw new Error(err);
        }
    }

    agregarRecurso(rol, costo, mes, porcentaje) {
        try {
            Recurso.create({
                rol,
                costo,
                mes,
                porcentaje,
                id_presupuesto: this.id_presupuesto
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    obtenerRecursos () {
        try {
            const recursos = Recurso.findAll({ where: { id_presupuesto: this.id_presupuesto }});
            return recursos;
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