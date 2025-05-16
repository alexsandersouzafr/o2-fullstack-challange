import { ContentListUnion, GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { tools } from './ai.tools';
import { ProductsService } from 'src/products/products.service';
import { MovementsService } from 'src/movements/movements.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly movementsService: MovementsService,
  ) {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  private config = {
    tools: [
      {
        functionDeclarations: tools,
      },
    ],
  };

  async prompt(input: string) {
    const contents: ContentListUnion = [
      {
        role: 'user',
        parts: [{ text: input }],
      },
    ];

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
      config: this.config,
    });

    if (response.functionCalls) {
      const tool_call = response.functionCalls[0];
      const tool = tool_call.name;
      let result;

      if (tool === 'getTotalSales') {
        const { startDate, endDate } = tool_call.args as {
          startDate: Date;
          endDate: Date;
        };
        result = this.movementsService.findMany(undefined, startDate, endDate);
      }

      if (tool === 'registerStockMovement') {
        const productId = await this.findProductIdByName(
          tool_call.args?.productName as string,
        );

        if (productId) {
          const { quantity, movementType: type } = tool_call.args as {
            quantity: number;
            movementType: 'ENTRY' | 'EXIT';
          };
          result = this.movementsService.create({
            productId,
            quantity,
            type,
          });
        }
      }

      console.log(result);

      const function_response_part = {
        name: tool_call.name,
        response: { result },
      };

      contents.push({ role: 'model', parts: [{ functionCall: tool_call }] });
      contents.push({
        role: 'user',
        parts: [{ functionResponse: function_response_part }],
      });

      const finalResponse = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contents,
        config: this.config,
      });

      return finalResponse;
    }
    return response;
  }

  private async findProductIdByName(name: string): Promise<number | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    });

    return product?.id || null;
  }
}
