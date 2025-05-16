import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  prompt(@Body() text: { text: string }) {
    return this.aiService.prompt(text.text);
  }
}
