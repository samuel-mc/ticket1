const db = require('../db/conexion');

const { presupuestoModel } = require('../models/presupuesto.models');
const { ingresoModel } = require('../models/ingreso.models');
const { MesIgreso } = require('../models/mes-ingreso.models');
const { CostoDirecto } = require('../models/costodir.models');
const { CostoAdm } = require('../models/costoadm.models');
const { Recurso } = require('../models/recurso.models');

class Presupuesto {
    constructor (id_presupuesto) {
        this.id_presupuesto = id_presupuesto;
    }

    darDeAlta (id_usuario, id_presupuesto_front, proyecto) {
        try {
            presupuestoModel.create({
                id_presupuesto: this.id_presupuesto,
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

    darDeBaja () {
        try {
            presupuestoModel.update({ eliminado: 1}, { where: { id_presupuesto: this.id_presupuesto } })
        } catch (err) {
            throw new Error(err);
        }
    }

}

const getPresupuestos = () => {
    try {
        const presupuesto = db.query('SELECT * FROM presupuestos WHERE eliminado <> 1');
        return presupuesto;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { Presupuesto, getPresupuestos };