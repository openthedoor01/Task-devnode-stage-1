const { createConnection } = require('../config/db_config');

class TaskModel {
    async getAllTasks() {
        const connection = await createConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM tasks');
            return { rows, fields };
        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }
    }

    async getTaskById(id) {
        const connection = await createConnection();
        try {
            const [rows, fields] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Task not found');
            }
            return { task: rows[0], fields };
        } catch (error) {
            throw new Error(` ${error.message}`);
        } finally {
            await connection.end();
        }
    }

    async createTask(taskData) {
        const connection = await createConnection();
        try {

            const [result] = await connection.query('INSERT INTO tasks SET ?', taskData);
            return { id: result.insertId };
        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }
    }

    async updateTask(taskData, id) {
        const connection = await createConnection();
        try {

            const [result] = await connection.query('UPDATE tasks SET ? WHERE id = ?', [taskData, id]);
            return result;
        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }
    }


    async deleteTask(id) {
        const connection = await createConnection();

        try {

            const [result] = await connection.query('DELETE FROM tasks WHERE id = ?', [id]);
            return result;


        } catch (error) {
            throw new Error(`${error.message}`);
        } finally {
            await connection.end();
        }

    }
}

module.exports = TaskModel;

