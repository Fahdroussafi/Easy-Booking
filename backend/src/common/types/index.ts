export interface IPagination<T> {
	items: T[];
	meta: {
		currentPage: number;
		itemCount: number;
		itemsPerPage: number;
		totalItems: number;
		totalPages: number;
	};
}
