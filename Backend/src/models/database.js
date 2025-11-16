import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Faz a leitura e cria o arquivo com o objeto com as informações de cada aluno
// Usado como um banco de dados no backend
const __file = fileURLToPath(import.meta.url);
const __dir = path.dirname(__file);
const DATA_FILE = path.join(__dir, '../../data/students.json');

const verifyDataFile  = async () => {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.mkdir(path.dirname(DATA_FILE), {recursive: true} );
        await fs.writeFile(DATA_FILE, JSON.stringify({ students: []}, null, 2));
    }
};


export const readData = async () => {
    await verifyDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}

export const writeData = async (data) => {
    await verifyDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(20);
}

