export interface SurveyAnswer {
  image: string
  answer: string
}

export interface AddSurveyModel {
  question: string
  answers: [SurveyAnswer]
}

export interface AddSurvey {
  add(survey: AddSurveyModel): Promise<void>
}
