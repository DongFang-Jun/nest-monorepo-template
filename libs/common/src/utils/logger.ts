import { LoggerService } from '@nestjs/common';
import lodash from 'lodash';

/**
 * 接口请求打印日志
 * @param logger
 * @param request
 * @param options
 */
export const printLogger = (
  logger: LoggerService,
  request?: any,
  options?: any,
) => {
  const { method, url, body, params, query, requestId, requestStartTime } =
    request;

  let logJson: any = {
    url,
    method,
    requestId,
    requestStartTime,
    requestEndTime: Date.now(),
  };

  if (!lodash.isEmpty(options)) {
    logJson = { ...logJson, data: options || {} };
  }

  if (!lodash.isEmpty(params)) {
    logJson.params = params;
  }
  if (!lodash.isEmpty(query)) {
    logJson.query = query;
  }
  if (!lodash.isEmpty(body)) {
    logJson.body = body;
  }
  logger.log(JSON.stringify(logJson), '接口请求日志');
};

/**
 * 接口报错打印日志
 * @param logger
 * @param request
 * @param error
 */
export const printErrorLogger = (
  logger: LoggerService,
  request?: any,
  error?: any,
) => {
  const { method, url, body, params, query, requestId, requestStartTime } =
    request;

  let logJson: any = {
    url,
    method,
    requestId,
    requestStartTime,
    requestEndTime: Date.now(),
  };

  if (error.stack) {
    logJson.message = error.message;
    logJson.stack = error.stack;
  } else {
    logJson = { ...logJson, data: error };
  }

  if (!lodash.isEmpty(params)) {
    logJson.params = params;
  }
  if (!lodash.isEmpty(query)) {
    logJson.query = query;
  }
  if (!lodash.isEmpty(body)) {
    logJson.body = body;
  }
  logger.error(JSON.stringify(logJson), '报错日志');
};
