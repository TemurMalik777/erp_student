import { Controller } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { Groups } from './entities/group.entity';
import { CoursesResolver } from '../courses/courses.resolver';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly courseReslover: CoursesResolver,
  ) {}

  @Mutation(() => Groups)
  async createGroup(
    @Args('createGroup') createGroupDto: CreateGroupDto,
    @Args('courseId') courseId: number,
  ) {
    const course = await this.courseReslover.findOneCourse(+courseId);
    return this.groupsService.create(createGroupDto, course!);
  }

  @Query(() => [Groups])
  findAllGroup() {
    return this.groupsService.findAll();
  }

  @Query(() => Groups)
  findOneGroup(@Args('id', { type: () => ID }) id: number) {
    return this.groupsService.findOne(id);
  }

  @Mutation(() => Groups)
  updateGroup(
    @Args('id', { type: () => ID }) id: number,
    @Args() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Mutation(() => Number)
  removeGroup(@Args('id') id: number) {
    return this.groupsService.remove(id);
  }
}
