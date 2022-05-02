import { Request } from 'express';
import { Parser } from 'json2csv';
import xmlbuilder from 'xmlbuilder';

export const dataResponseFormat = async (req: Request, data: any[]) => {
  if (req.accepts('xml')) {
    return await xmlbuilder.create('root').ele(data).end({ pretty: true });
  }
  if (req.accepts('csv')) {
    const parser = new Parser();
    return await parser.parse(data);
  }

  return data;
};
