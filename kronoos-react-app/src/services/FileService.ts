import { api } from "../config/axios";

export class FileService {
    static instance: FileService;
    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new FileService();
        }

        return this.instance;
    }

    async uploadAndValidate(formData: FormData) {

       const {data} =  await api.post('/upload',
           formData,
           {headers: { 'Content-Type': 'x-www-form-urlencoded' },

           }
       );
        return data;
    }

}
