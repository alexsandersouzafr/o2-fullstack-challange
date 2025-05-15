import { Type } from '@google/genai';

export interface ParameterProperty {
  type: Type;
  description: string;
  items?: { type: Type };
}

export interface FunctionParameters {
  type: Type;
  properties: Record<string, ParameterProperty>;
  required: string[];
}

export interface Tool {
  name: string;
  description: string;
  parameters: FunctionParameters;
}

export interface FunctionCall {
  name: string;
  args: Record<string, any>;
}

export interface GenerateContentResponse {
  functionCalls?: FunctionCall[];
  text?: string;
}
