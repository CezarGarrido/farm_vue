import Http from '../services/http'
export default class Fazenda {
    constructor() {
        this.id = 0;
        this.proprietario_id = 1;
        this.descricao = "";
        this.area_total = null;
        this.geo_json = "";
        this.created_at = null;
        this.updated_at = null;
        this.color = 'green';
    }
    create() {
        let obj = this;
        return new Promise((resolve, reject) => {
            Http.post('/area', obj)
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    GetAllByProprieatioID(id) {
        return new Promise((resolve, reject) => {
            Http.get('/areas/proprietario/' + id)
                .then(resp => {
                    resolve(resp)
                }
                )
                .catch(err => {
                    if (error.response.status === 301) {
                        resolve(resp)
                    } else {
                        reject(err)
                    }
                })
        })
    }
    Delete(id) {
        return new Promise((resolve, reject) => {
            Http.delete('/area/' + id)
                .then(resp => {
                    if (error.response.status === 301) {
                        resolve(resp)
                    } else {
                        reject(resp)
                    }
                },
                    err => {
                        if (err.response.status === 301) {
                            resolve(err)
                        } else {
                            reject(err)
                        }
                    })

        })
    }
}