export interface IPostWithoutId {
  userId: string,
  title: string,
  body: string,
  creationDate: Date,
  estimatedPublicationDate: Date,
  status: string,
  approvalPercentage: number,
  corrections: string,
  platform: string,
  postUrl: string,
  multimediaUrl: string,
  deletedAt: null

}

export interface IPost extends IPostWithoutId {
  id: string
}