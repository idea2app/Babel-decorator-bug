import { observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';

import { ownClient } from './Base';

export type CityCoordinateMap = Record<string, [number, number]>;

export class SystemModel extends BaseModel {
  @observable
  accessor cityCoordinate: CityCoordinateMap = {};

  @toggle('downloading')
  async getCityCoordinate() {
    const { body } = await ownClient.get<CityCoordinateMap>(
      'https://ideapp.dev/public-meta-data/china-city-coordinate.json',
    );
    return (this.cityCoordinate = body!);
  }
}

export default new SystemModel();
