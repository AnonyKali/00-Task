const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const taskController = require('../controllers/taskController');
const Task = require('../models/taskModel');

describe('Task Controller', () => {
    describe('createTask', () => {
        it('should create a new task', (done) => {
            const req = {
                body: { title: 'Test Task', description: 'Test Description', completed: false }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            sinon.stub(Task, 'create').callsFake((title, description, completed, callback) => {
                callback(null, 1); // Simulate task creation
            });

            taskController.createTask(req, res);

            setImmediate(() => {
                expect(res.status.calledWith(201)).to.be.true;
                expect(res.json.calledWith({ id: 1, title: 'Test Task', description: 'Test Description', completed: false })).to.be.true;
                Task.create.restore();
                done();
            });
        });
    });

    describe('getAllTasks', () => {
        it('should retrieve all tasks', (done) => {
            const req = {};
            const res = {
                json: sinon.spy()
            };
            const tasks = [
                { id: 1, title: 'Test Task', description: 'Test Description', completed: false }
            ];
            sinon.stub(Task, 'getAll').callsFake((callback) => {
                callback(null, tasks);
            });

            taskController.getAllTasks(req, res);

            setImmediate(() => {
                expect(res.json.calledWith(tasks)).to.be.true;
                Task.getAll.restore();
                done();
            });
        });
    });

    describe('updateTask', () => {
        it('should update an existing task', (done) => {
            const req = {
                params: { id: 1 },
                body: { title: 'Updated Task', description: 'Updated description', completed: true }
            };
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returnsThis()
            };
            sinon.stub(Task, 'getAll').callsFake((callback) => {
                callback(null, [{ id: 1 }]); // Simulate task exists
            });
            sinon.stub(Task, 'update').callsFake((id, title, description, completed, callback) => {
                callback(null, 1); // Simulate update
            });

            taskController.updateTask(req, res);

            setImmediate(() => {
                expect(res.status.calledWith(200)).to.be.true;
                expect(res.json.calledWith({ id: 1, title: 'Updated Task', description: 'Updated description', completed: true })).to.be.true;
                Task.getAll.restore();
                Task.update.restore();
                done();
            });
        });

        it('should return 404 if task does not exist', (done) => {
            const req = {
                params: { id: 1 },
                body: { title: 'Updated Task', description: 'Updated description', completed: true }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            sinon.stub(Task, 'getAll').callsFake((callback) => {
                callback(null, []); // Simulate task does not exist
            });

            taskController.updateTask(req, res);

            setImmediate(() => {
                expect(res.status.calledWith(404)).to.be.true;
                expect(res.json.calledWith({ error: 'Task not found' })).to.be.true;
                Task.getAll.restore();
                done();
            });
        });
    });

    describe('deleteTask', () => {
        it('should delete an existing task', (done) => {
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.spy()
            };
            sinon.stub(Task, 'delete').callsFake((id, callback) => {
                callback(null, 1); // Simulate task deletion
            });

            taskController.deleteTask(req, res);

            setImmediate(() => {
                expect(res.status.calledWith(204)).to.be.true;
                expect(res.send.calledOnce).to.be.true;
                Task.delete.restore();
                done();
            });
        });

        it('should return 404 if task does not exist', (done) => {
            const req = { params: { id: 1 } };
            const res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            sinon.stub(Task, 'delete').callsFake((id, callback) => {
                callback(null, 0); // Simulate no rows deleted
            });

            taskController.deleteTask(req, res);

            setImmediate(() => {
                expect(res.status.calledWith(404)).to.be.true;
                expect(res.json.calledWith({ error: 'Task not found' })).to.be.true;
                Task.delete.restore();
                done();
            });
        });
    });
});
