/** @format */
import dayjs from 'dayjs'
import User from './user'
import Category from './category'
import Tag from './tag'

export interface ArticleConfig {
  style: Record<string, string>
}

class Article {
  id: number
  title: string
  description: string
  image: string
  content: string
  config: ArticleConfig | null
  createdAt: string
  updatedAt?: string
  author?: User
  category?: Category
  tags?: Tag[]
  constructor(data: Article.RawData) {
    this.id = data.id
    this.title = data.title
    this.image = data.image
    this.description = data.description
    this.content = data.content
    this.config = null
    if (data.config) {
      try {
        let config = JSON.parse(data.config)
        this.config = config
      } catch (e) {}
    }
    this.createdAt = dayjs(data.createdAt).format('YYYY-MM-DD')
    this.updatedAt = dayjs(data.updatedAt).format('YYYY-MM-DD')
    this.author = new User(data.author)
    this.category = new Category(data.category)
    this.tags = data.tags.map((item) => {
      return new Tag(item)
    })
  }
}

namespace Article {
  export interface RawData {
    id: number
    title: string
    image: string
    description: string
    content: string
    config: string
    createdAt: Date
    updatedAt: Date
    author: User.RawData
    category: Category.RawData
    tags: Tag[]
  }
}

export default Article
