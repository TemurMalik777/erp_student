import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateGroupDto } from './create-group.dto';

// @InputType()
export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  // @Field({ nullable: true })
  // name?: string;
  // @Field({ nullable: true })
  // course?: number;
  // @Field()
  // start_date?: string;
  // @Field()
  // end_date?: string;
  // @Field()
  // status?: boolean;
}
