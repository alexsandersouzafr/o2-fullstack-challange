import { Type } from '@google/genai';
import { Tool } from './types';

export const tools: Tool[] = [
  {
    name: 'getTotalSales',
    description:
      'Consulta o total de vendas (saídas de estoque) em um período específico.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        startDate: {
          type: Type.STRING,
          description: 'Data inicial no formato dd/mm/yyyy ou dd-mm-yyyy',
        },
        endDate: {
          type: Type.STRING,
          description: 'Data final no formato dd/mm/yyyy ou dd-mm-yyyy',
        },
      },
      required: ['startDate', 'endDate'],
    },
  },
  {
    name: 'registerStockMovement',
    description:
      'Registra uma movimentação de estoque (entrada ou saída) para um produto.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        productName: { type: Type.STRING, description: 'Nome do produto' },
        quantity: { type: Type.INTEGER, description: 'Quantidade movimentada' },
        movementType: {
          type: Type.STRING,
          description: "Tipo de movimentação: 'ENTRY' ou 'EXIT'",
        },
      },
      required: ['productName', 'quantity'],
    },
  },
];
