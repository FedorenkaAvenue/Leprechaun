import {
    Pagination as PaginationUI, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@primitives/ui/pagination";
import { PaginationModel } from "@shared/models/Pagination";

interface Props {
    pagination: PaginationModel<unknown>['pagination']
}

const Pagination = ({ pagination: { currentPage, pageCount, totalCount } }: Props) => (
    totalCount > 0
        ? (
            <PaginationUI>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={pageCount <= 1}
                            href={{ query: { page: currentPage - 1 } }}
                        />
                    </PaginationItem>
                    {
                        [...new Array(pageCount)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    href={{ query: { page: i + 1 } }}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }
                    {/* <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem> */}
                    <PaginationItem>
                        <PaginationNext
                            disabled={currentPage === pageCount}
                            href={{ query: { page: currentPage + 1 } }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </PaginationUI>
        )
        : null
);

export default Pagination;
