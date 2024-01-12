import { Router } from "express";
const router_controller = Router();
import {
    getController,
    getControllerById,
    createController,
    updateController,
    deleteController
} from '../controllers/controller/controller.controller.js';

/**
 * @openapi
 * /v1/controller:
 *   get:
 *     tags:
 *       - Controller
 *     summary: Get a list of controller data
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
 *                       ctr_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the controller data
 *                       usr_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the user associated with the controller data
 *                       emg_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the EMG data associated with the controller data
 *                       temp_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the temperature data associated with the controller data
 *                       bt_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the breath data associated with the controller data
 *                       ecg_id:
 *                         type: integer
 *                         example: 1
 *                         description: The ID of the ECG data associated with the controller data
 *                       ctr_currently_date:
 *                         type: date
 *                         example: 2022-01-11
 *                         description: The date associated with the controller data
 * 
 *   post:
 *     tags:
 *       - Controller
 *     summary: Create a new controller data entry
 *     requestBody:
 *       description: JSON object containing controller data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usr_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the user associated with the controller data
 *               emg_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the EMG data associated with the controller data
 *               temp_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the temperature data associated with the controller data
 *               bt_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the breath data associated with the controller data
 *               ecg_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the ECG data associated with the controller data
 *               ctr_currently_date:
 *                 type: date
 *                 example: 2022-01-11
 *                 description: The date associated with the controller data
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
 *                     ctr_id:
 *                       type: integer
 *                       example: 1
 *                     usr_id:
 *                       type: integer
 *                       example: 1
 *                     emg_id:
 *                       type: integer
 *                       example: 1
 *                     temp_id:
 *                       type: integer
 *                       example: 1
 *                     bt_id:
 *                       type: integer
 *                       example: 1
 *                     ecg_id:
 *                       type: integer
 *                       example: 1
 *                     ctr_currently_date:
 *                       type: date
 *                       example: 2022-01-11
 * 
 *   put:
 *     tags:
 *       - Controller
 *     summary: Update an existing controller data entry
 *     requestBody:
 *       description: Controller data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ctr_id:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the controller data to update
 *               usr_id:
 *                 type: integer
 *                 example: 1
 *                 description: The updated ID of the user associated with the controller data
 *               emg_id:
 *                 type: integer
 *                 example: 1
 *                 description: The updated ID of the EMG data associated with the controller data
 *               temp_id:
 *                 type: integer
 *                 example: 1
 *                 description: The updated ID of the temperature data associated with the controller data
 *               bt_id:
 *                 type: integer
 *                 example: 1
 *                 description: The updated ID of the breath data associated with the controller data
 *               ecg_id:
 *                 type: integer
 *                 example: 1
 *                 description: The updated ID of the ECG data associated with the controller data
 *               ctr_currently_date:
 *                 type: date
 *                 example: 2022-01-11
 *                 description: The updated date associated with the controller data
 *             required:
 *               - ctr_id
 *               - usr_id
 *               - emg_id
 *               - temp_id
 *               - bt_id
 *               - ecg_id
 *               - ctr_currently_date
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
 *                     ctr_id:
 *                       type: integer
 *                       example: 1
 *                     usr_id:
 *                       type: integer
 *                       example: 1
 *                     emg_id:
 *                       type: integer
 *                       example: 1
 *                     temp_id:
 *                       type: integer
 *                       example: 1
 *                     bt_id:
 *                       type: integer
 *                       example: 1
 *                     ecg_id:
 *                       type: integer
 *                       example: 1
 *                     ctr_currently_date:
 *                       type: date
 *                       example: 2022-01-11
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
 *                   example: Controller data not found
 * /v1/controller/{id}:
 *   get:
 *     tags:
 *       - Controller
 *     summary: Get controller data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the controller data to retrieve
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
 *                     ctr_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the controller data
 *                     usr_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the user associated with the controller data
 *                     emg_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the EMG data associated with the controller data
 *                     temp_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the temperature data associated with the controller data
 *                     bt_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the breath data associated with the controller data
 *                     ecg_id:
 *                       type: integer
 *                       example: 1
 *                       description: The ID of the ECG data associated with the controller data
 *                     ctr_currently_date:
 *                       type: date
 *                       example: 2022-01-11
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
 *                   example: Controller data not found
 * 
 *   delete:
 *     tags:
 *       - Controller
 *     summary: Delete controller data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the controller data to delete
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
 *                   example: Controller data not found
 */
router_controller.get('/v1/controller', getController);
router_controller.get('/v1/controller/:id', getControllerById);
router_controller.post('/v1/controller', createController);
router_controller.put('/v1/controller', updateController);
router_controller.delete('/v1/controller/:id', deleteController);

export { router_controller };
