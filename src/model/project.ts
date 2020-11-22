/** @format */
import dayjs from 'dayjs'
import User from './user'
import Category from './category'
import Tag from './tag'

class Project {
  id: number
  name: string
  description: string
  image:string
  content: string
  github:string
  role:string
  url:string
  startedAt:string
  endedAt:string
  createdAt: string
  updatedAt?: string
  author?: User
  category?: Category
  tags?: Tag[]
  constructor(data: Project.RawData) {
    this.id = data.id
    this.name = data.name
    this.image = data.image
    this.description = data.description
    this.content = data.content
    this.github=data.github
    this.role=data.role
    this.url=data.url
    this.startedAt = dayjs(data.startedAt).format('YYYY-MM-DD')
    this.endedAt = dayjs(data.endedAt).format('YYYY-MM-DD')
    this.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD')
    this.updatedAt = dayjs(data.updatedAt).format('YYYY-MM-DD')
    this.author = new User(data.author)
    this.category = new Category(data.category)
    this.tags = data.tags.map(item => {
      return new Tag(item)
    })
  }
}

namespace Project {
  export interface RawData {
    id: number
    name: string
    image: string
    description: string
    content: string
    github:string
    role:string
    url:string
    startedAt:Date
    endedAt:Date
    createdAt: Date
    updatedAt: Date
    author: User.RawData
    category: Category.RawData
    tags: Tag[]
  }
}

export default Project
