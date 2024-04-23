export function usePagination (pages, pagesCount, currentPage) {
    if(pagesCount > 10) {
        if(currentPage > 5) {
            for(let i = currentPage - 4; i < currentPage + 5; i++) {
                if(i === pagesCount) break
                pages.push(i)
            }
        } else {
            for(let i = 0; i < 10; i++) {
                if(i === pagesCount) break
                pages.push(i)
            }
        }
    } else {
        for(let i = 0; i < pagesCount; i++) {
            pages.push(i)
        }
    }
}