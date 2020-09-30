import {DefaultCrudRepository} from '@loopback/repository';
import {Registros, RegistrosRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RegistrosRepository extends DefaultCrudRepository<
  Registros,
  typeof Registros.prototype.id,
  RegistrosRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Registros, dataSource);
  }
}
