// Importa el cliente de la base de datos
import { client } from '../../database/database.js';

const getController = async (req, res) => {
    try {
        const response = await client.query("SELECT ctr_id, usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date FROM public.controller");
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting controller data', err);
        res.status(500).json({ error: 'An error occurred while getting controller data' });
    }
};

const getControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("SELECT ctr_id, usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date FROM public.controller WHERE ctr_id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error('Error getting controller data by id', err);
        res.status(500).json({ error: 'An error occurred while getting controller data by id' });
    }
};

const createController = async (req, res) => {
    try {
        const { usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date } = req.body;
        const response = await client.query(
            "INSERT INTO public.controller (usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date]
        );
        const { ctr_id } = response.rows[0];
        res.json({
            message: "Controller data added successfully",
            body: {
                controller: {
                    ctr_id,
                    usr_id,
                    emg_id,
                    temp_id,
                    bt_id,
                    ecg_id,
                    ctr_currently_date,
                },
            },
        });
    } catch (err) {
        console.error('Error creating controller data', err);
        res.status(500).json({ error: 'An error occurred while creating controller data' });
    }
};

const updateController = async (req, res) => {
    try {
        const { ctr_id, usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date } = req.body;
        const response = await client.query(
            "UPDATE public.controller SET usr_id = $1, emg_id = $2, temp_id = $3, bt_id = $4, ecg_id = $5, ctr_currently_date = $6 WHERE ctr_id = $7 RETURNING *",
            [usr_id, emg_id, temp_id, bt_id, ecg_id, ctr_currently_date, ctr_id]
        );
        res.json({
            message: "Controller data updated successfully",
            body: {
                controller: {
                    ctr_id,
                    usr_id,
                    emg_id,
                    temp_id,
                    bt_id,
                    ecg_id,
                    ctr_currently_date,
                },
            },
        });
    } catch (err) {
        console.error('Error updating controller data', err);
        res.status(500).json({ error: 'An error occurred while updating controller data' });
    }
};

const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("DELETE FROM public.controller WHERE ctr_id = $1 RETURNING *", [id]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Controller data not found' });
        } else {
            res.json({
                message: "Controller data deleted successfully",
                body: {
                    controller: {
                        ctr_id: response.rows[0].ctr_id,
                        usr_id: response.rows[0].usr_id,
                        emg_id: response.rows[0].emg_id,
                        temp_id: response.rows[0].temp_id,
                        bt_id: response.rows[0].bt_id,
                        ecg_id: response.rows[0].ecg_id,
                        ctr_currently_date: response.rows[0].ctr_currently_date,
                    },
                },
            });
        }
    } catch (err) {
        console.error('Error deleting controller data', err);
        res.status(500).json({ error: 'An error occurred while deleting controller data' });
    }
};

export {
    getController,
    getControllerById,
    createController,
    updateController,
    deleteController,
};
