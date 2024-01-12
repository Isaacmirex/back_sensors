// Importa el cliente de la base de datos
import { client } from '../../database/database.js';

const getUser = async (req, res) => {
    try {
        const response = await client.query("SELECT usr_id, usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height FROM public.\"user\"");
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting user data', err);
        res.status(500).json({ error: 'An error occurred while getting user data' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("SELECT usr_id, usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height FROM public.\"user\" WHERE usr_id = $1", [id]);
        res.json(response.rows[0]);
    } catch (err) {
        console.error('Error getting user data by id', err);
        res.status(500).json({ error: 'An error occurred while getting user data by id' });
    }
};

const createUser = async (req, res) => {
    try {
        const { usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height } = req.body;
        const response = await client.query(
            "INSERT INTO public.\"user\" (usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height]
        );
        const { usr_id } = response.rows[0];
        res.json({
            message: "User data added successfully",
            body: {
                user: {
                    usr_id,
                    usr_birth_date,
                    usr_gender,
                    usr_full_name,
                    usr_city,
                    usr_weight,
                    usr_height,
                },
            },
        });
    } catch (err) {
        console.error('Error creating user data', err);
        res.status(500).json({ error: 'An error occurred while creating user data' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { usr_id, usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height } = req.body;
        const response = await client.query(
            "UPDATE public.\"user\" SET usr_birth_date = $1, usr_gender = $2, usr_full_name = $3, usr_city = $4, usr_weight = $5, usr_height = $6 WHERE usr_id = $7 RETURNING *",
            [usr_birth_date, usr_gender, usr_full_name, usr_city, usr_weight, usr_height, usr_id]
        );
        res.json({
            message: "User data updated successfully",
            body: {
                user: {
                    usr_id,
                    usr_birth_date,
                    usr_gender,
                    usr_full_name,
                    usr_city,
                    usr_weight,
                    usr_height,
                },
            },
        });
    } catch (err) {
        console.error('Error updating user data', err);
        res.status(500).json({ error: 'An error occurred while updating user data' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await client.query("DELETE FROM public.\"user\" WHERE usr_id = $1 RETURNING *", [id]);

        if (response.rows.length === 0) {
            res.status(404).json({ error: 'User data not found' });
        } else {
            res.json({
                message: "User data deleted successfully",
                body: {
                    user: {
                        usr_id: response.rows[0].usr_id,
                        usr_birth_date: response.rows[0].usr_birth_date,
                        usr_gender: response.rows[0].usr_gender,
                        usr_full_name: response.rows[0].usr_full_name,
                        usr_city: response.rows[0].usr_city,
                        usr_weight: response.rows[0].usr_weight,
                        usr_height: response.rows[0].usr_height,
                    },
                },
            });
        }
    } catch (err) {
        console.error('Error deleting user data', err);
        res.status(500).json({ error: 'An error occurred while deleting user data' });
    }
};

export {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
