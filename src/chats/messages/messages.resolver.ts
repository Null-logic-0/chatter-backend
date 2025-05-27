import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { Currentuser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload';
import { GetMessagesArgs } from './dto/get-messages.args';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
    @Currentuser() user: TokenPayload,
  ) {
    return this.messagesService.createMessage(createMessageInput, user._id);
  }
  @Query(() => [Message], { name: 'messages' })
  @UseGuards(GqlAuthGuard)
  getMessages(
    @Args() getMessageArgs: GetMessagesArgs,
    @Currentuser() user: TokenPayload,
  ) {
    return this.messagesService.getMessages(getMessageArgs, user._id);
  }
}
