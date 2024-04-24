module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Alfa Search',
        version: '1.0.0',
        description: 'REST API для Alfa Search'
    },
    servers: [
        {
            url: 'http://localhost:4221',
            description: 'Сервер разработки'
        }
    ],
    tags: [
        {
            name: 'entity'
        }
    ],
    paths: {
        '/entity/?page={page}': {
            post: {
                summary: 'Возвращает записи с БД по ФИО, ИП, ИНН',
                tags: [
                    'entity'
                ],
                consumes: "text/plain",
                description: '',
                parameters: [
                    {
                        name: 'page',
                        in: 'path',
                        example: '1',
                        required: true
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                properties: {
                                    query: {
                                        type: 'string',
                                        example: 'попов',
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    "$ref": "#/components/schemas/EntitiesFromDB"
                                }
                            }
                        }
                    }
                }
            }
        },
        '/entity/search/?page={page}': {
            post: {
                summary: 'Возвращает записи с egrul.nalog по ФИО, ИНН, ИП',
                tags: [
                    'entity'
                ],
                description: '',
                parameters: [
                    {
                        name: 'page',
                        in: 'path',
                        example: 1,
                        required: true
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                properties: {
                                    query: {
                                        type: 'string',
                                        example: 'попов',
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    "$ref": "#/components/schemas/EntitiesFromSite"
                                }
                            }
                        }
                    }
                }
            }
        },
        '/entity/update/{id}': {
            put: {
                summary: 'Изменяет запись на данные приходящие с egrul.nalog',
                tags: [
                    'entity'
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true
                    },
                ],
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    "$ref": "#/components/schemas/EntityUpdate"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            "EntitiesFromDB": {
                required: ["query", "page"],
                type: 'object',
                properties: {
                    "candidates": {
                        type: "array",
                        items: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    example: '6621f5153f1d67bc0e143176'
                                },
                                name: {
                                    type: 'string',
                                    example: 'КОММАНДИТНОЕ ТОВАРИЩЕСТВО "ПОПОВ"'
                                },
                                OGRN: {
                                    type: 'string',
                                    example: '1024000948696'
                                },
                                dateStart: {
                                    type: 'string',
                                    format: 'date',
                                    example: '2002-12-30T14:00:00.000Z'
                                },
                                dateEnd: {
                                    type: 'string',
                                    format: 'date',
                                    example: '2021-07-14T14:00:00.000Z'
                                },
                                gPerson: {
                                    type: 'string',
                                    example: 'ДИРЕКТОР: Попов Николай Васильевич'
                                },
                                inn: {
                                    type: 'string',
                                    example: '4025041542'
                                },
                                pdfLink: {
                                    type: 'string',
                                    example: 'ADF60C4848DF1ABD304A7D9E8ADD434A7AFA58CC3D594E16F727818B333FEADB4A3C1F4FD70AD26295BDBB436345ECFF02ADD3F70872FB49077452559CF9BD0BB5F706694BF4C5A08753AF7851DDC54D'
                                },
                                region: {
                                    type: 'string',
                                    example: 'Калужская область'
                                },
                            }
                        }
                    },
                    "count": {
                        type: "integer",
                        example: '421'
                    }
                }
            },
            "EntitiesFromSite": {
                required: ["query", "page"],
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        c: {
                            type: 'string',
                            example: 'Попов'
                        },
                        p: {
                            type: 'string',
                            example: '773201050'
                        },
                        tot: {
                            type: 'string',
                            example: '37977'
                        },
                        pg: {
                            type: 'string',
                            example: '1'
                        },
                        o: {
                            type: 'string',
                            example: '1024000948696'
                        },
                        r: {
                            type: 'string',
                            format: 'date',
                            example: '2002-12-30T14:00:00.000Z'
                        },
                        e: {
                            type: 'string',
                            format: 'date',
                            example: '2021-07-14T14:00:00.000Z'
                        },
                        g: {
                            type: 'string',
                            example: 'ДИРЕКТОР: Попов Николай Васильевич'
                        },
                        i: {
                            type: 'string',
                            example: '4025041542'
                        },
                        t: {
                            type: 'string',
                            example: 'ADF60C4848DF1ABD304A7D9E8ADD434A7AFA58CC3D594E16F727818B333FEADB4A3C1F4FD70AD26295BDBB436345ECFF02ADD3F70872FB49077452559CF9BD0BB5F706694BF4C5A08753AF7851DDC54D'
                        },
                        rn: {
                            type: 'string',
                            example: 'Калужская область'
                        },
                    }

                }
            },
            "EntityUpdate": {
                required: "id",
                type: "object",
                properties: {
                    id: {
                        type: 'string',
                        example: '6621f5153f1d67bc0e143176'
                    },
                    OGRN: {
                        type: 'string',
                        example: '1024000948696'
                    },
                    dateStart: {
                        type: 'string',
                        format: 'date',
                        example: '2002-12-30T14:00:00.000Z'
                    },
                    dateEnd: {
                        type: 'string',
                        format: 'date',
                        example: '2021-07-14T14:00:00.000Z'
                    },
                    gPerson: {
                        type: 'string',
                        example: 'ДИРЕКТОР: Попов Николай Васильевич'
                    },
                    inn: {
                        type: 'string',
                        example: '4025041542'
                    },
                    pdfLink: {
                        type: 'string',
                        example: 'ADF60C4848DF1ABD304A7D9E8ADD434A7AFA58CC3D594E16F727818B333FEADB4A3C1F4FD70AD26295BDBB436345ECFF02ADD3F70872FB49077452559CF9BD0BB5F706694BF4C5A08753AF7851DDC54D'
                    },
                    region: {
                        type: 'string',
                        example: 'Калужская область'
                    },
                }
            }
        }
    }
}