import { observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';
import { countBy } from 'web-utility';

import { ownClient } from './Base';

export interface Case
  extends Record<'name' | 'city' | 'url' | 'comment_url', string> {
  rule: '996' | '965';
  evidences: Record<'title' | 'href', string>[];
}

export class CaseModel extends BaseModel {
  @observable
  accessor statistic = {} as Record<'city', Record<string, number>>;

  @toggle('downloading')
  async getStatistic() {
    const { body: list996 } = await ownClient.get<Case[]>(
      'https://fcc-cd.dev/996-data/996.json',
    );
    return (this.statistic = { city: countBy(list996!, 'city') });
  }
}

export type StatisticTrait = Pick<CaseModel, 'statistic' | 'getStatistic'>;

export default new CaseModel();
