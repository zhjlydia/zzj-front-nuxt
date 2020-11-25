/**
 * 列表
 *
 * @format
 */

export interface PaginationData<T> {
  /**
   * 数据列表
   */
  list: T[]
  /**
   * 当前页数
   */
  index: number
  /**
   * 分页大小
   */
  size: number
  /**
   * 总数
   */
  total: number
}

/**
 * 翻页选项
 */
export interface PaginationOptions {
  /**
   * 页面索引
   */
  index?: number
  /**
   * 页面容量
   */
  size?: number
}

/**
 * 面包屑
 */
export interface BreadcrumbItem {
  /**
   * 页面路径
   */
  routerName?: string
  /**
   * 页面名称
   */
  name: string
}
