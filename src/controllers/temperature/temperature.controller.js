// Importa el cliente de la base de datos
import { client } from '../../database/database.js';

const getTemperature = async (req, res) => {
    try {
        const response = await client.query("SELECT temp_id, temp_date, temp_temperature FROM public.temperature");
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting temperature data', err);
        res.status(500).json({ error: 'An error occurred while getting temperature data' });
    }
};

const getTemperatureById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("SELECT temp_id, temp_date, temp_temperature FROM public.temperature WHERE temp_id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error('Error getting temperature data by id', err);
        res.status(500).json({ error: 'An error occurred while getting temperature data by id' });
    }
};

const createTemperature = async (req, res) => {
    try {
        const { temp_date, temp_temperature } = req.body;
        const response = await client.query(
            "INSERT INTO public.temperature (temp_date, temp_temperature) VALUES ($1, $2) RETURNING *",
            [temp_date, temp_temperature]
        );
        const { temp_id } = response.rows[0];
        res.json({
            message: "Temperature data added successfully",
            body: {
                temperature: {
                    temp_id,
                    temp_date,
                    temp_temperature,
                },
            },
        });
    } catch (err) {
        console.error('Error creating temperature data', err);
        res.status(500).json({ error: 'An error occurred while creating temperature data' });
    }
};

const updateTemperature = async (req, res) => {
    try {
        const { temp_id, temp_date, temp_temperature } = req.body;
        const response = await client.query(
            "UPDATE public.temperature SET temp_date = $1, temp_temperature = $2 WHERE temp_id = $3 RETURNING *",
            [temp_date, temp_temperature, temp_id]
        );
        res.json({
            message: "Temperature data updated successfully",
            body: {
                temperature: {
                    temp_id,
                    temp_date,
                    temp_temperature,
                },
            },
        });
    } catch (err) {
        console.error('Error updating temperature data', err);
        res.status(500).json({ error: 'An error occurred while updating temperature data' });
    }
};

const deleteTemperature = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("DELETE FROM public.temperature WHERE temp_id = $1 RETURNING *", [id]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'Temperature data not found' });
        } else {
            res.json({
                message: "Temperature data deleted successfully",
                body: {
                    temperature: {
                        temp_id: response.rows[0].temp_id,
                        temp_date: response.rows[0].temp_date,
                        temp_temperature: response.rows[0].temp_temperature,
                    },
                },
            });
        }
    } catch (err) {
        console.error('Error deleting temperature data', err);
        res.status(500).json({ error: 'An error occurred while deleting temperature data' });
    }
};

export {
    getTemperature,
    getTemperatureById,
    createTemperature,
    updateTemperature,
    deleteTemperature,
};
