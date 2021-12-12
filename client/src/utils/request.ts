import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { notification } from 'antd';

export interface RequestOptions extends AxiosRequestConfig {
  url: string;
  onSuccess?: (data: any) => void;
  onFailed?: (reason: any) => void;
  onFinally?: () => void;
}

export const request = (options: RequestOptions) => {
  const { onSuccess, onFailed, onFinally, ...axiosOptions } = options;

  return axios(axiosOptions)
    .then((res) => {
      onSuccess?.(res.data);
    })
    .catch((err) => {
      const response = err?.response || {};
      const title = response.data?.statusCode || response.status || 'Error';
      const message =
        response.data?.message || response.statusText || err?.message || 'Unknown Error';
      if (!onFailed) {
        notification.error({ message: title, description: message });
      } else {
        onFailed(err);
      }
    })
    .finally(() => {
      onFinally?.();
    });
};

export interface UseRequestOptions<T> extends RequestOptions {
  initialData: T;
  beforeRequest?: (options: RequestOptions) => void | boolean; // 若返回true则停止发起请求
  transformData?: (data: any) => T;
  disableLoading?: boolean;
}
export const useRequest = <T>({
  initialData,
  beforeRequest,
  transformData,
  disableLoading,
  ...requestOptions
}: UseRequestOptions<T>) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  const currentRequest = (partialOptions?: Partial<RequestOptions>) => {
    const currOptions = { ...requestOptions, ...partialOptions };
    currOptions.onSuccess = (data) => {
      const nextData = transformData ? transformData(data) : data;
      setData(nextData);
    };
    currOptions.onFinally = () => {
      if (!disableLoading) {
        setLoading(false);
      }
    };

    if (beforeRequest?.(currOptions)) {
      return;
    }

    if (!disableLoading) {
      setLoading(true);
    }

    return request(currOptions);
  };

  useEffect(() => {
    currentRequest();
  }, []);

  return {
    data,
    setData,
    loading: !disableLoading ? loading : undefined,
    currentRequest,
  };
};
