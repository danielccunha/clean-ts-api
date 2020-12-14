export interface SurveyAnswerModel {
  answer: string
  image?: string
}

export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}
