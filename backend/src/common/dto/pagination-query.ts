import {ApiPropertyOptional} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import {IsOptional, IsString} from "class-validator";
import {PAGINATION_LIMIT, SORT_DIRECTION} from "../constants";
import {validateOptionalQueryNumber, validateSortDirection} from "../helpers";

export class SearchSortPagination {
	@IsOptional()
	@ApiPropertyOptional({default: 1})
	@Transform(({value}) => validateOptionalQueryNumber(value, 1))
	page: number;

	@IsOptional()
	@ApiPropertyOptional({default: PAGINATION_LIMIT})
	@Transform(({value}) =>
		validateOptionalQueryNumber(value, PAGINATION_LIMIT),
	)
	limit: number;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({default: ""})
	search: string;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({default: "id"})
	orderBy: string;

	@IsOptional()
	@ApiPropertyOptional({default: "asc", enum: ["asc", "desc"]})
	@Transform(({value}) => validateSortDirection(value, SORT_DIRECTION))
	orderDir: string;
}
