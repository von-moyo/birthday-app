import { useState, useMemo } from 'react'

export function usePagination<T>(list: T[], threshold: number = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(list.length / threshold)

  const paginatedList = useMemo<T[]>(() => {
    const start = (currentPage - 1) * threshold
    return list.slice(start, start + threshold)
  }, [list, currentPage, threshold])

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleGoToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return {
    currentPage,
    totalPages,
    paginatedList,
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
  }
}
