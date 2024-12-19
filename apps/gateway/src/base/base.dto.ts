import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 系统参数详情查询
 */
export class BaseTestDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
