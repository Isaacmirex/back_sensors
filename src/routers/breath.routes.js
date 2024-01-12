import { Router } from "express";
const router_breath = Router();
import {
    getBreath,
    getBreathById,
    createBreath,
    updateBreath,
    deleteBreath
} from '../controllers/breath/breath.controller.js';

/**
 * @openapi
 * /v1/breath:
 *   get:
 *     tags:
 *       - Breath
 *     summary: Get a list of breath data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bt_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the breath data
 *                       bt_date:
 *                         type: timestamp
 *                         example: 2022-01-11 12:34:56
 *                         description: The timestamp of the breath data
 *                       bt_breath_frequency:
 *                         type: decimal
 *                         example: 20.5
 *                         description: The breath frequency data
 * 
 *   post:
 *     tags:
 *       - Breath
 *     summary: Create a new breath data entry
 *     requestBody:
 *       description: JSON object containing breath data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bt_date:
 *                 type: timestamp
 *                 example: 2022-01-11 12:34:56
 *                 description: The timestamp of the breath data
 *               bt_breath_frequency:
 *                 type: decimal
 *                 example: 20.5
 *                 description: The breath frequency data
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     bt_id:
 *                       type: integer
 *                       example: 1
 *                     bt_date:
 *                       type: timestamp
 *                       example: 2022-01-11 12:34:56
 *                     bt_breath_frequency:
 *                       type: decimal
 *                       example: 20.5
 * 
 *   put:
 *     tags:
 *       - Breath
 *     summary: Update an existing breath data entry
 *     requestBody:
 *       description: Breath data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bt_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the breath data to update
 *               bt_date:
 *                 type: timestamp
 *                 example: 2022-01-11 12:34:56
 *                 description: The updated timestamp of the breath data
 *               bt_breath_frequency:
 *                 type: decimal
 *                 example: 25.0
 *                 description: The updated breath frequency data
 *             required:
 *               - bt_id
 *               - bt_date
 *               - bt_breath_frequency
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     bt_id:
 *                       type: integer
 *                       example: 1
 *                     bt_date:
 *                       type: timestamp
 *                       example: 2022-01-11 12:34:56
 *                     bt_breath_frequency:
 *                       type: decimal
 *                       example: 25.0
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 error:
 *                   type: string
 *                   example: Breath data not found
 * /v1/breath/{id}:
 *   get:
 *     tags:
 *       - Breath
 *     summary: Get breath data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the breath data to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     bt_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the breath data
 *                     bt_date:
 *                       type: timestamp
 *                       example: 2022-01-11 12:34:56
 *                     bt_breath_frequency:
 *                       type: decimal
 *                       example: 20.5
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 error:
 *                   type: string
 *                   example: Breath data not found
 * 
 *   delete:
 *     tags:
 *       - Breath
 *     summary: Delete breath data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the breath data to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     // Define properties of the response data if any
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 error:
 *                   type: string
 *                   example: Breath data not found
 */

router_breath.get('/v1/breath', getBreath);
router_breath.get('/v1/breath/:id', getBreathById);
router_breath.post('/v1/breath', createBreath);
router_breath.put('/v1/breath', updateBreath);
router_breath.delete('/v1/breath/:id', deleteBreath);

export { router_breath };
