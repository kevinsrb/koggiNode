import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class TaskDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  description!: string;
}
