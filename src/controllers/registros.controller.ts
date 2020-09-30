import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Registros} from '../models';
import {RegistrosRepository} from '../repositories';

export class RegistrosController {
  constructor(
    @repository(RegistrosRepository)
    public registrosRepository : RegistrosRepository,
  ) {}

  @post('/registros', {
    responses: {
      '200': {
        description: 'Registros model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registros)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registros, {
            title: 'NewRegistros',
            exclude: ['id'],
          }),
        },
      },
    })
    registros: Omit<Registros, 'id'>,
  ): Promise<Registros> {
    return this.registrosRepository.create(registros);
  }

  @get('/registros/count', {
    responses: {
      '200': {
        description: 'Registros model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Registros) where?: Where<Registros>,
  ): Promise<Count> {
    return this.registrosRepository.count(where);
  }

  @get('/registros', {
    responses: {
      '200': {
        description: 'Array of Registros model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Registros, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Registros) filter?: Filter<Registros>,
  ): Promise<Registros[]> {
    return this.registrosRepository.find(filter);
  }

  @patch('/registros', {
    responses: {
      '200': {
        description: 'Registros PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registros, {partial: true}),
        },
      },
    })
    registros: Registros,
    @param.where(Registros) where?: Where<Registros>,
  ): Promise<Count> {
    return this.registrosRepository.updateAll(registros, where);
  }

  @get('/registros/{id}', {
    responses: {
      '200': {
        description: 'Registros model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Registros, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Registros, {exclude: 'where'}) filter?: FilterExcludingWhere<Registros>
  ): Promise<Registros> {
    return this.registrosRepository.findById(id, filter);
  }

  @patch('/registros/{id}', {
    responses: {
      '204': {
        description: 'Registros PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registros, {partial: true}),
        },
      },
    })
    registros: Registros,
  ): Promise<void> {
    await this.registrosRepository.updateById(id, registros);
  }

  @put('/registros/{id}', {
    responses: {
      '204': {
        description: 'Registros PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registros: Registros,
  ): Promise<void> {
    await this.registrosRepository.replaceById(id, registros);
  }

  @del('/registros/{id}', {
    responses: {
      '204': {
        description: 'Registros DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registrosRepository.deleteById(id);
  }
}
