const { sam_card } = require('../models/index')

const insertSam =  async(req, res) => {
    const 
    {
        ns_tarjeta,
        environment_log,
        events_log,
        contracts_log,
        purchase_log,
        fecha_hora,
        folio
    } = req.body
    // console.log(req.body)

    return await sam_card.create({
        ns_tarjeta: req.body.ns_tarjeta,
        environment_log: req.body.environment_log,
        events_log: req.body.events_log,
        contracts_log: req.body.contracts_log,
        purchase_log: req.body.purchase_log,
        fecha_hora: req.body.fecha_hora,
        folio: req.body.folio
    }).then(sam_card => {
        if (sam_card) {
            res.send({sam_card});
        } else {
            res.status(400).json({msg:'Error inserting record'});
        }
    })   

}
module.exports = {
    insertSam
}