import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { PromptDto } from './prompt.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  prompt(@Body() body: PromptDto) {
    return this.aiService.prompt(body.text);
  }
}
