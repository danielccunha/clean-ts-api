import {
  AddSurvey,
  AddSurveyModel,
  AddSurveyRepository
} from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor(private addSurveyRepository: AddSurveyRepository) {}

  async add(survey: AddSurveyModel): Promise<void> {
    this.addSurveyRepository.add(survey)
  }
}
