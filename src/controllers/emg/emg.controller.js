// Importa el cliente de la base de datos
import { client } from '../../database/database.js';

const getEMG = async (req, res) => {
    try {
        const response = await client.query("SELECT emg_id, emg_date, emg_muscular_tension FROM public.emg");
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting EMG data', err);
        res.status(500).json({ error: 'An error occurred while getting EMG data' });
    }
};

const getEMGById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("SELECT emg_id, emg_date, emg_muscular_tension FROM public.emg WHERE emg_id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error('Error getting EMG data by id', err);
        res.status(500).json({ error: 'An error occurred while getting EMG data by id' });
    }
};

const createEMG = async (req, res) => {
    try {
        const { emg_date, emg_muscular_tension } = req.body;
        const response = await client.query(
            "INSERT INTO public.emg (emg_date, emg_muscular_tension) VALUES ($1, $2) RETURNING *",
            [emg_date, emg_muscular_tension]
        );
        const { emg_id } = response.rows[0];
        res.json({
            message: "EMG data added successfully",
            body: {
                emg: {
                    emg_id,
                    emg_date,
                    emg_muscular_tension,
                },
            },
        });
    } catch (err) {
        console.error('Error creating EMG data', err);
        res.status(500).json({ error: 'An error occurred while creating EMG data' });
    }
};

const updateEMG = async (req, res) => {
    try {
        const { emg_id, emg_date, emg_muscular_tension } = req.body;
        const response = await client.query(
            "UPDATE public.emg SET emg_date = $1, emg_muscular_tension = $2 WHERE emg_id = $3 RETURNING *",
            [emg_date, emg_muscular_tension, emg_id]
        );
        res.json({
            message: "EMG data updated successfully",
            body: {
                emg: {
                    emg_id,
                    emg_date,
                    emg_muscular_tension,
                },
            },
        });
    } catch (err) {
        console.error('Error updating EMG data', err);
        res.status(500).json({ error: 'An error occurred while updating EMG data' });
    }
};

const deleteEMG = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("DELETE FROM public.emg WHERE emg_id = $1 RETURNING *", [id]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'EMG data not found' });
        } else {
            res.json({
                message: "EMG data deleted successfully",
                body: {
                    emg: {
                        emg_id: response.rows[0].emg_id,
                        emg_date: response.rows[0].emg_date,
                        emg_muscular_tension: response.rows[0].emg_muscular_tension,
                    },
                },
            });
        }
    } catch (err) {
        console.error('Error deleting EMG data', err);
        res.status(500).json({ error: 'An error occurred while deleting EMG data' });
    }
};

export {
    getEMG,
    getEMGById,
    createEMG,
    updateEMG,
    deleteEMG,
};

