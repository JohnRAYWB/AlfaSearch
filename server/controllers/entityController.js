const axios = require("axios")
const Entity = require("../models/entity")

module.exports = new class EntityController {
    async getEntities(request, response) {
        try {
            const candidates = await Entity.find(
                {$or:
                    [
                        {name: request.body.query},
                        {inn: request.body.query},
                        {OGRN: request.body.query}
                    ]
                }
            )

            if (candidates.length === 0) {
                const queryToken = (await axios.post("https://egrul.nalog.ru/", {
                    "query": request.body.query,
                    "limit" : "5",
                    "page": request.query.page
                }))

                const searchingEntities = await axios.get(`https://egrul.nalog.ru/search-result/${queryToken.data['t']}`)

                return response.json(searchingEntities.data['rows'])
            } else {
                return response.json(candidates)
            }
        } catch (e) {
            console.log(e)
        }
    }
}