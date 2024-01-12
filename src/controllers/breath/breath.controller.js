// Importa el cliente de la base de datos
import { client } from '../../database/database.js';

const getBreath = async (req, res) => {
    try {
        const response = await client.query("SELECT bt_id, bt_date, bt_breath_frequency FROM public.breath");
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting breath data', err);
        res.status(500).json({ error: 'An error occurred while getting breath data' });
    }
};

const getBreathById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("SELECT bt_id, bt_date, bt_breath_frequency FROM public.breath WHERE bt_id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error('Error getting breath data by id', err);
        res.status(500).json({ error: 'An error occurred while getting breath data by id' });
    }
};

const createBreath = async (req, res) => {
    try {
        const { bt_date, bt_breath_frequency } = req.body;
        const response = await client.query(
            "INSERT INTO public.breath (bt_date, bt_breath_frequency) VALUES ($1, $2) RETURNING *",
            [bt_date, bt_breath_frequency]
        );
        const { bt_id } = response.rows[0];
        res.json({
            message: "Breath data added successfully",
            body: {
                breath: {
                    bt_id,
                    bt_date,
                    bt_breath_frequency,
                },
            },
        });
    } catch (err) {
        console.error('Error creating breath data', err);
        res.status(500).json({ error: 'An error occurred while creating breath data' });
    }
};

const updateBreath = async (req, res) => {
    try {
        const { bt_id, bt_date, bt_breath_frequency } = req.body;
        const response = await client.query(
            "UPDATE public.breath SET bt_date = $1, bt_breath_frequency = $2 WHERE bt_id = $3 RETURNING *",
            [bt_date, bt_breath_frequency, bt_id]
        );
        res.json({
            message: "Breath data updated successfully",
            body: {
                breath: {
                    bt_id,
                    bt_date,
                    bt_breath_frequency,
                },
            },
        });
    } catch (err) {
        console.error('Error updating breath data', err);
        res.status(500).json({ error: 'An error occurred while updating breath data' });
    }
};

const deleteBreath = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("DELETE FROM public.breath WHERE bt_id = $1 RETURNING *", [id]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Breath data not found' });
        } else {
            res.json({
                message: "Breath data deleted successfully",
                body: {
                    breath: {
                        bt_id: response.rows[0].bt_id,
                        bt_date: response.rows[0].bt_date,
                        bt_breath_frequency: response.rows[0].bt_breath_frequency,
                    },
                },
            });
        }
    } catch (err) {
        console.error('Error deleting breath data', err);
        res.status(500).json({ error: 'An error occurred while deleting breath data' });
    }
};

export {
    getBreath,
    getBreathById,
    createBreath,
    updateBreath,
    deleteBreath,
};
