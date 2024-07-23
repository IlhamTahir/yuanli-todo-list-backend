import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskListCreateRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: '任务列表名称不能为空',
  })
  @MinLength(2, {
    message: '任务列表名称长度不能小于2个字符',
  })
  @MaxLength(20, {
    message: '任务列表名称长度不能大于20个字符',
  })
  name: string;
}
