const fs = require('fs/promises');
const path = require('path');

class Controller {

    async create(req, res) {
        const objects = req.body;
        const filePath = path.join('./Objects', 'data.json');

        try {
            let data = [];

            try {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                data = JSON.parse(fileContent);
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error;
                }
            }

            let maxId = 0;
            for(let i = 0; i < data.length; i++) {
                if(data[i].id > maxId) {
                    maxId = data[i].id;
                }
            }

            objects.forEach(obj => {
                obj.id = ++maxId;
                data.push(obj);
            });

            console.log(data);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));

            res.send('Objects added successfully');
        } catch (error) {
            console.error('Error handling file:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async get(req, res) {
        const filePath = path.join('./Objects', 'data.json');
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileContent);
            let result = [];

            for(let i = 0; i < data.length; i++) {
                const title = data[i].title;
                const description = data[i].description;

                const htmlContent = `
                    <div class="toast">
                      <div class="toast-header">
                        <strong class="me-auto">${title}</strong>
                        <button type="button" class="btn-close" aria-label="Close" onclick="deleteCurrent(${data[i].id})">Delete</button>
                      </div>
                      <div class="toast-body">
                        ${description}
                      </div>
                    </div>
                `.replace(/\n/g, '').replace(/\s+/g, ' ');
                result.push(htmlContent);
            }


            res.send(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        const id = parseInt(req.params.id);
        const filePath = path.join('./Objects', 'data.json');

        try {
            // Читаємо вміст файлу
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(fileContent);

            const index = data.findIndex(item => item.id === id);

            if (index === -1) {
                return res.status(404).json({ message: 'Object not found' });
            }

            data.splice(index, 1);

            await fs.writeFile(filePath, JSON.stringify(data, null, 2));

            res.status(200).json({ message: 'Object deleted successfully' });

        } catch (error) {
            console.error('Error handling file:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = Controller;