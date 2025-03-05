import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  handleNextPage: () => void
  handlePrevPage: () => void
  handleGoToPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
  handleGoToPage,
}) => {
  const getPageNumbers = () => {
    const maxButtons = 13 // 15 total including prev & next buttons
    const pages: (number | string)[] = []

    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1, 2) // Always show first two pages

    const remainingSlots = maxButtons - 4 // Reserve slots for first two, last two, and ellipses
    let start = Math.max(3, currentPage - Math.floor(remainingSlots / 2))
    const end = Math.min(totalPages - 2, start + remainingSlots - 1)

    if (end >= totalPages - 2) {
      start = totalPages - remainingSlots - 1
    }

    if (start > 3) {
      pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages - 1, totalPages) // Always show last two pages

    return pages
  }

  return (
    <section className="my-3 flex gap-1 text-admin-darkGray">
      <Button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className="h-8 w-8 border border-border-pagination p-0 transition-colors duration-300 ease-in-out bg-blue-500 hover:bg-blue-500/50 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        {getPageNumbers().map((pageNumber, index) => (
          <div
            key={`${pageNumber}-${index}`}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-[12px] cursor-pointer',
              pageNumber === '...'
                ? 'cursor-default'
                : pageNumber === currentPage
                  ? 'cursor-default bg-blue-500 text-white'
                  : 'cursor-pointer border border-border-pagination/40 hover:bg-blue-500/50'
            )}
            onClick={() =>
              typeof pageNumber === 'number'
                ? handleGoToPage(pageNumber)
                : undefined
            }
          >
            {pageNumber}
          </div>
        ))}
      </div>

      <Button
        disabled={currentPage === totalPages}
        onClick={handleNextPage}
        className="h-8 w-8 border border-border-pagination/40 p-0 transition-colors duration-300 ease-in-out cursor-pointer bg-blue-500 hover:bg-blue-500/50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </section>
  )
}

export { Pagination }
