// Importa el cliente de la base de datos
import { client } from '../../database/database.js';

const getECG = async (req, res) => {
    try {
        const response = await client.query("SELECT ecg_id, ecg_date, ecg_pulse FROM public.ecg");
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting ECG data', err);
        res.status(500).json({ error: 'An error occurred while getting ECG data' });
    }
};

const getECGById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("SELECT ecg_id, ecg_date, ecg_pulse FROM public.ecg WHERE ecg_id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error('Error getting ECG data by id', err);
        res.status(500).json({ error: 'An error occurred while getting ECG data by id' });
    }
};

const createECG = async (req, res) => {
    try {
        const { ecg_date, ecg_pulse } = req.body;
        const response = await client.query(
            "INSERT INTO public.ecg (ecg_date, ecg_pulse) VALUES ($1, $2) RETURNING *",
            [ecg_date, ecg_pulse]
        );
        const { ecg_id } = response.rows[0];
        res.json({
            message: "ECG data added successfully",
            body: {
                ecg: {
                    ecg_id,
                    ecg_date,
                    ecg_pulse,
                },
            },
        });
    } catch (err) {
        console.error('Error creating ECG data', err);
        res.status(500).json({ error: 'An error occurred while creating ECG data' });
    }
};

const updateECG = async (req, res) => {
    try {
        const { ecg_id, ecg_date, ecg_pulse } = req.body;
        const response = await client.query(
            "UPDATE public.ecg SET ecg_date = $1, ecg_pulse = $2 WHERE ecg_id = $3 RETURNING *",
            [ecg_date, ecg_pulse, ecg_id]
        );
        res.json({
            message: "ECG data updated successfully",
            body: {
                ecg: {
                    ecg_id,
                    ecg_date,
                    ecg_pulse,
                },
            },
        });
    } catch (err) {
        console.error('Error updating ECG data', err);
        res.status(500).json({ error: 'An error occurred while updating ECG data' });
    }
};

const deleteECG = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("DELETE FROM public.ecg WHERE ecg_id = $1 RETURNING *", [id]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'ECG data not found' });
        } else {
            res.json({
                message: "ECG data deleted successfully",
                body: {
                    ecg: {
                        ecg_id: response.rows[0].ecg_id,
                        ecg_date: response.rows[0].ecg_date,
                        ecg_pulse: response.rows[0].ecg_pulse,
                    },
                },
            });
        }
    } catch (err) {
        console.error('Error deleting ECG data', err);
        res.status(500).json({ error: 'An error occurred while deleting ECG data' });
    }
};

export {
    getECG,
    getECGById,
    createECG,
    updateECG,
    deleteECG,
};
