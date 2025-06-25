import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RcFile } from 'antd/es/upload';
import { NestErrorResponse } from './types';

export function extractTextFromHTML(html: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const scripts = tempDiv.getElementsByTagName('script');
  const styles = tempDiv.getElementsByTagName('style');

  while (scripts.length > 0) {
    scripts[0].parentNode?.removeChild(scripts[0]);
  }
  while (styles.length > 0) {
    styles[0].parentNode?.removeChild(styles[0]);
  }
  return tempDiv.textContent || tempDiv.innerText || '';
}

export function getBase64(file: RcFile): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function getDay(input: string): string {
  const date = new Date(input);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}.${month}.${year}`;
}

export function getTime(input: string): string {
  const date = new Date(input);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function fileNameExtractor(link: string | undefined): string {
  if (!link || link.trim().length === 0) return '';
  const parsed = link.split('/');
  const name = parsed[parsed.length - 1];
  const arr = name.split('.');
  const filename = arr[0];
  const extension = name.split('.')[arr.length - 1];
  return `${filename}.${extension}`;
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
}

export function getNestErrorMessage(error: unknown): string {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as NestErrorResponse;

    if (!data?.message) return 'Unknown server error';

    return Array.isArray(data.message) ? data.message.join(', ') : data.message;
  }

  return 'An error occurred while retrieving the request.';
}
