import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Registros extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
  })
  link?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tecnologias: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Registros>) {
    super(data);
  }
}

export interface RegistrosRelations {
  // describe navigational properties here
}

export type RegistrosWithRelations = Registros & RegistrosRelations;
