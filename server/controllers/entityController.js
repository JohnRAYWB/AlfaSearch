const axios = require("axios")
const Entity = require("../models/entity")

module.exports = new class EntityController {
    async getEntitiesFromDB(request, response) {
        try {
            const candidates = await Entity.find(
                {
                    $or:
                        [
                            {name: {$regex: new RegExp(request.body.query, 'i')}},
                            {gPerson: {$regex: new RegExp(request.body.query, 'i')}},
                            {inn: {$regex: new RegExp(request.body.query, 'i')}},
                        ]
                }
            ).limit(20).skip(request.query.page)

            if (candidates.length === 0) {
                return response.json('В базе данных нет того что вы ищите')
            } else {
                return response.json(candidates)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getEntities(request, response) {
        try {
            const queryToken = (await axios.post("https://egrul.nalog.ru/", {
                "query": request.body.query,
                "page": request.query.page
            }))

            const searchingEntities = await axios.get(`https://egrul.nalog.ru/search-result/${queryToken.data['t']}`)

            searchingEntities.data['rows'].map(async (entity) => {
                if (entity.o) {
                    const candidate = await Entity.findOne({OGRN: entity.o})

                    if (!candidate) {
                        const dateStart = entity.r ? new Date(entity.r.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) : null
                        const dateEnd = entity.e ? new Date(entity.e.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) : null
                        await Entity.create({
                            name: entity.n,
                            gPerson: entity.g,
                            inn: entity.i,
                            OGRN: entity.o,
                            region: entity.rn,
                            dateStart: dateStart,
                            dateEnd: dateEnd,
                            pdfLink: entity.t,
                        })
                    }
                }
            })

            return response.json(searchingEntities.data['rows'])
        } catch (e) {
            console.log(e)
        }
    }
}