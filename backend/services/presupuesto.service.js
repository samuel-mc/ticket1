const db = require('../db/conexion');

const { presupuestoModel } = require('../models/presupuesto.models');
const { ingresoModel } = require('../models/ingreso.models');
const { MesIgreso } = require('../models/mes-ingreso.models');
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

    /* Agregamos los recursos correspondientes */
    agregarIngresos (id_ingreso, concepto, ingresoPorMes) {
        try {
            ingresoModel.create({
                id_ingreso,
                concepto,
                id_presupuesto: this.id_presupuesto
            });

            ingresoPorMes.map(async function(ingresoPorMes) {
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

    /* Borramos de manera logica cierto presupuesto */
    darDeBaja () {
        try {
            presupuestoModel.update({ eliminado: 1}, { where: { id_presupuesto: this.id_presupuesto } })
        } catch (err) {
            throw new Error(err);
        }
    }

}

/* Obtenemos un conjunto de presupuestos */
const getPresupuestos = () => {
    try {
        const presupuesto = db.query('SELECT * FROM presupuestos WHERE eliminado <> 1'); //Selecciona los que no esten eliminados.
        return presupuesto;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { Presupuesto, getPresupuestos };